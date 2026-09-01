# The WebMCP voice assistant

srini.codes has a voice assistant that answers questions about Srinivasan
using nothing but what the website itself says. This document explains the
two halves that make that work: WebMCP, the browser API through which the
site describes itself to agents, and the Gemini pipeline that turns speech
into an answer and back into speech.

## 1. WebMCP in depth

WebMCP (Web Model Context Protocol) is a W3C Web Machine Learning Community
Group draft, written by engineers from Google and Microsoft and announced in
February 2026. It lets a web page expose JavaScript functions as **tools**
with natural-language descriptions and JSON Schema inputs, so an AI agent
can call the page's functionality directly instead of screenshotting the DOM
and guessing where to click. The name is deliberate: the tool shape is the
Model Context Protocol's, so the same agent code that talks to an MCP server
can talk to a web page.

### 1.1 The API

```webidl
partial interface Document {
  [SecureContext, SameObject] readonly attribute ModelContext modelContext;
};

[Exposed=Window, SecureContext]
interface ModelContext : EventTarget {
  Promise<undefined> registerTool(ModelContextTool tool,
      optional ModelContextRegisterToolOptions options = {});
  Promise<sequence<RegisteredTool>> getTools(
      optional ModelContextGetToolOptions options = {});
  Promise<DOMString> executeTool(RegisteredTool tool,
      optional object inputObject = {},
      optional ModelContextExecuteToolOptions options = {});
  attribute EventHandler ontoolchange;
};

dictionary ModelContextTool {
  required DOMString name;          // 1-128 chars: letters, digits, _ - .
  USVString title;
  required DOMString description;
  object inputSchema;               // JSON Schema for the arguments
  required ToolExecuteCallback execute;
  ToolAnnotations annotations;      // readOnlyHint, untrustedContentHint
};

callback ToolExecuteCallback = Promise<any> (object inputObject,
                                             ToolExecuteCallbackOptions options);

dictionary ModelContextRegisterToolOptions {
  sequence<USVString> exposedTo;    // other secure origins allowed to call it
  AbortSignal signal;               // abort() unregisters the tool
};
```

Things worth knowing that are easy to miss:

- **Registration is lifecycle-bound.** There is no `unregisterTool()`.
  You pass an `AbortSignal` and abort it when the tool should go away. That
  maps naturally onto component unmount in React.
- **Schemas are snapshotted.** `inputSchema` is serialised to JSON at
  registration time, so mutating the object afterwards changes nothing.
- **`executeTool` returns a string.** The spec resolves the promise with
  the stringified result. By convention (and in every published sample)
  tools return an MCP `CallToolResult`, `{ content: [{ type: 'text', text }] }`,
  with `isError: true` for failures.
- **`getTools()` lists everything the caller may see**, across the frame
  tree, filtered by origin. A tool is visible same-origin by default; other
  origins have to be named in `exposedTo`, and the caller has to ask for them
  with `fromOrigins`.
- **`toolchange` fires** on the ModelContext whenever a tool is registered,
  unregistered or changed, so an agent can keep its tool list in sync with a
  single-page app that registers different tools on different routes.
- **Permissions Policy** gates the whole API behind the `tools` feature
  (default allowlist `'self'`). A cross-origin iframe needs
  `<iframe allow="tools">` before it can register anything.
- **A declarative form** exists too: `<form toolname tooldescription>` with
  `toolparamdescription` on inputs turns a form into a tool, and
  `SubmitEvent.agentInvoked` / `respondWith()` let the page answer the agent
  without navigating.

### 1.2 Where it runs

| Environment | Status |
| --- | --- |
| Chrome 149 | Origin trial; getter at `navigator.modelContext` |
| Chrome 150+, Edge 150 | Origin trial; getter moved to `document.modelContext` (May 2026 draft) |
| Local testing | `chrome://flags/#enable-webmcp-testing` plus the DevTools flag adds a **WebMCP** panel that lists registered tools, shows their schemas and invokes them |
| Agents | Gemini in Chrome, the Model Context Tool Inspector extension, Brave Leo (experimental), ChatGPT desktop |
| Firefox, Safari | Standards positions under review |

Feature-detect rather than sniff versions:

```js
const modelContext = document.modelContext ?? navigator.modelContext
if (modelContext && 'registerTool' in modelContext) { /* native */ }
```

### 1.3 How this site uses it

`src/webmcp/` contains three pieces.

- `types.ts` types the API exactly as the draft describes it (plus the
  `executeTool` extension Chromium ships).
- `modelContext.ts` finds the native object or installs a small spec-shaped
  polyfill on `document.modelContext`. The polyfill is same-origin only; it
  serves agents running inside the page. When a native implementation is
  present, the polyfill is never installed and the tools go straight to the
  browser, where Chrome's own agent or the DevTools panel can call them.
- `siteTools.ts` defines the tools. They read the same data modules the
  pages render (`src/portfolio/*`, the speaker map data, the blog service),
  so an agent learns exactly what the site says and nothing else.

| Tool | What it returns | Notes |
| --- | --- | --- |
| `get_profile` | Role, employer, bio, highlights, topics, social links | read-only |
| `list_books` | Both Apress books with ISBNs, blurbs and links | read-only |
| `list_projects` | Open source projects, optional keyword filter | read-only |
| `search_talks` | Talks by keyword / year / format, with city and country, plus speaking stats | read-only |
| `list_blog_posts` | Hashnode and external articles, optional filter | read-only, fetches live |
| `list_presentations` | Published slide decks | read-only |
| `get_press_and_podcast` | Press citations and the podcast episode | read-only |
| `get_contact_info` | Email, website, social profiles | read-only; phone deliberately omitted |
| `get_site_map` | The site's pages | read-only |
| `navigate_to_page` | Opens a page via the SPA router | an action, `readOnlyHint: false` |

`SiteTools.tsx` registers them once inside the Router with an
`AbortController`, so React StrictMode's double mount still leaves one copy
of each tool.

Try it in the console on any page:

```js
const tools = await document.modelContext.getTools()
const talks = tools.find((t) => t.name === 'search_talks')
JSON.parse(await document.modelContext.executeTool(talks, { query: 'spain' }))
```

## 2. The voice pipeline

```
 mic ──▶ 16 kHz WAV ──▶ /api/voice/transcribe ──▶ Gemini 3.5 Transcribe
                                                        │ text
                        ┌───────────────────────────────▼──────────────┐
                        │ /api/voice/respond   Gemini 3.7 Flash         │
                        │   system prompt + function declarations       │
                        │   derived from document.modelContext.getTools │
                        └───────┬──────────────────────────▲───────────┘
                    functionCall│                          │functionResponse
                                ▼                          │
                   document.modelContext.executeTool(tool, args)   (in the page)
                                │
                          final answer text
                                ▼
                       /api/voice/speak ──▶ Gemini 3.1 Flash TTS ──▶ PCM ──▶ speakers
```

The loop lives in the browser (`src/voice/assistant.ts`), not on the server.
That is what makes "purely through WebMCP" true: the server functions under
`api/voice/` hold the API key and the system prompt and nothing else. The
model only ever sees the function declarations the page discovered with
`getTools()`, and every call it makes is executed with `executeTool()`.
Swap the browser's native WebMCP in for the polyfill and nothing in the
loop changes.

### 2.1 Stages and models

| Stage | Model | Why |
| --- | --- | --- |
| Speech to text | `gemini-3.5-transcribe` | Dedicated transcription model: about 1.5 s for a question, automatic language detection, and `customVocabulary` biasing. The site's proper nouns (Appium, AppiumTestDistribution, conference names) are passed in from `siteVocabulary()`. `SMART` mode removes filler words. The transcript comes back in an `audioTranscription` part, not a text part. |
| Reasoning and tool use | `gemini-3.7-flash` | Current Flash workhorse with function calling and thinking levels. Runs with `thinkingLevel: LOW` for latency. |
| Text to speech | `gemini-3.1-flash-tts-preview` | Current TTS model; returns 24 kHz 16-bit mono PCM as `audio/l16`. Voice defaults to Charon (30 prebuilt voices, override with `GEMINI_TTS_VOICE`). |

Each stage tries a list of models in order (`api/_lib/gemini.ts`), so a
renamed preview degrades to the next best model instead of breaking the
assistant. All ids can be overridden with environment variables.

### 2.2 Gemini 3 function-calling details that matter

- **Thought signatures.** Gemini 3 attaches a `thoughtSignature` to the
  function-call part and validates it on the next request. The browser
  appends the model's `content` to the history verbatim, so signatures are
  echoed back exactly.
- **Call ids.** When a call carries an `id`, the `functionResponse` carries
  the same id and name.
- **Function names.** Gemini names must start with a letter or underscore;
  WebMCP names may not. `src/voice/bridge.ts` maps between the two.
- **Result shape.** WebMCP tools return MCP `content` arrays whose text is
  JSON. The bridge unwraps that into `{ output: <parsed JSON> }` so the model
  sees structured data instead of escaped strings.
- **History trimming** only ever cuts at a plain user message, never between
  a function call and its response.

### 2.3 Grounding rules

The system prompt in `api/voice/respond.ts` tells the model it knows nothing
about Srinivasan on its own and must call tools before answering, must say so
when the tools do not cover something, and must decline anything unrelated to
Srinivasan or the site. Answers are written for speech: one to three short
sentences, no markdown or URLs.

Observed behaviour against the live API:

| Question | Tools called | Answer |
| --- | --- | --- |
| Which books has Srinivasan written about MCP? | `list_books` | Both Apress titles, correctly described |
| And where did he speak in 2025? | `search_talks({year: "2025"})` | Uses the previous turn's context |
| What is the capital of France? | none | "I can only answer questions about Srinivasan and what is on this website." |
| What's his favourite food? | `get_profile` | "The website does not mention what Srini's favourite food is." |

### 2.4 Audio handling in the browser

`src/voice/audio.ts` records with `MediaRecorder` (Opus/WebM on Chromium and
Firefox, AAC/MP4 on Safari), decodes the clip with Web Audio, downmixes and
resamples it to 16 kHz mono through an `OfflineAudioContext`, and encodes a
WAV. WAV is accepted by every Gemini audio model and a 30-second question is
under 1 MB. Playback converts the returned PCM into an `AudioBuffer`. The
`AudioContext` is created from the click that starts a turn so playback is
allowed after the async round trips.

## 3. Running it

```bash
cp .env.example .env      # add GEMINI_API_KEY
npm run dev               # Vite also serves /api/voice/* locally
```

The `localApi` plugin in `vite.config.ts` loads `api/<route>.ts` through
Vite's SSR pipeline and calls the exported `POST(request: Request)` handler,
the same Web-standard signature Vercel's Node runtime uses in production, so
there is no separate dev server.

On Vercel, set `GEMINI_API_KEY` in the project's environment variables. The
functions run with a 60-second `maxDuration` (see `vercel.json`).

Abuse limits (`api/_lib/http.ts`): the functions require a browser `Origin`
from srini.codes, localhost or a Vercel preview, cap body sizes, and rate
limit per IP inside each function instance.

## 4. Testing with a real agent

1. Open the site in Chrome 149+ with `chrome://flags/#enable-webmcp-testing`
   enabled (or with an origin-trial token in the page).
2. Open DevTools, then the **WebMCP** panel: the ten tools above appear with
   their schemas, and each can be invoked from the panel.
3. Ask Gemini in Chrome, or an agent extension, a question about the page.
   The tool calls it makes are the same ones the voice assistant makes.

The assistant panel shows which implementation it is talking to
(`WebMCP · native` or `WebMCP · polyfill`) and lists every tool it called
under each answer.
