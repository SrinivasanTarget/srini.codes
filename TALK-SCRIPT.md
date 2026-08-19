# Testing the Agents That Look You in the Eye

**Speaker script** · TestMu Conf '26 · 19 Aug 2026, 06:15 PT · 45 minute slot

Srinivasan Sekar and Sai Krishna · 17 slides · about 33 minutes of speaking, so there is room for the demo to run long and for questions.

Slides: `public/presentations/testing-video-agents.html`
Press **S** in the deck to see each of these on the slide it belongs to.

---

## Running order

| # | Slide | Who | Time |
|---|---|---|---|
| 1 | Title | SRINI | 0:45 |
| 2 | Speakers | SAI | 0:30 |
| 3 | Already in production | SAI | 2:00 |
| 4 | The arithmetic | SAI | 1:30 |
| 5 | Automate the human | SRINI | 1:00 |
| 6 | Three layers | SRINI | 1:30 |
| 7 | Nothing to change | SRINI | 1:00 |
| 8 | Demo | BOTH  (Sai drives, Srini narrates) | 8:00 |
| 9 | The honest part | SRINI | 0:30 |
| 10 | Ears | SRINI | 3:00 |
| 11 | Turn taking | SAI | 3:00 |
| 12 | What we measure | SRINI | 2:30 |
| 13 | Criteria | SAI | 2:30 |
| 14 | Fan out | SRINI | 1:30 |
| 15 | What is next | SRINI | 2:00 |
| 16 | Six things to take back | BOTH | 1:30 |
| 17 | Close | SRINI | 0:45 |

**Three moments that carry the talk.** Slide 1, ask the question and let the silence sit. Slide 8, when the result comes up, land the failure. Slide 16, go quiet for fifteen seconds.

---

## 1 · Title
**SRINI · 0:45**

Good morning. Before we tell you who we are, I want you to look at something.

> *[play 8 seconds of the interviewer clip, then stop]*

That is an AI interviewer. It has a face, it has a voice, and it is screening real people for real jobs right now.

So here is my question for you. How would you test that? Hold that thought.

---

## 2 · Speakers
**SAI · 0:30**

Quick introduction. I am Sai Krishna, this is Srinivasan Sekar. We are both Directors of Engineering at TestMu AI, and we both maintain Appium.

So we have spent years testing things you can click. For the last year we have been testing things you cannot click. That is what today is about.

---

## 3 · Already in production
**SAI · 2:00**

Show of hands. Who here has been interviewed by an AI? And who has shipped one? That gap right there is the talk.

These agents are already live. They interview people. They take medical symptoms. They verify identity for banks. Every one of them makes a decision about a person.

Now look at how testing has changed. A website you can test. There is a page, there are elements, the same input gives you the same output.

A chatbot is harder, but it is still text. You can read it, save it, compare it.

A video agent gives you none of that. There is no page. There is no output to compare against. The product IS the conversation. And a conversation only exists while it is happening.

---

## 4 · The arithmetic
**SAI · 1:30**

So how do teams test these today? Someone joins the call and acts. That is the whole method.

One run is about fifteen minutes. You want maybe ten different personalities: the calm one, the nervous one, the one who will not answer properly. And these systems are not predictable, so you run each one about three times.

That is seven and a half hours. For one release. For one agent.

Nobody does that at two in the morning. Nobody does it for a hotfix. So it quietly turns into: someone tried it once and it seemed fine.

And here is the part nobody says out loud. The tenth time you play a nervous candidate, you are not a nervous candidate any more. You are a bored engineer reading a prompt.

---

## 5 · Automate the human
**SRINI · 1:00**

So here is the idea. [pause]

Stop trying to automate the clicks. There are no clicks. Automate the human instead.

If the only way to test a conversation is to have one, then the thing you need to build is not a test script. It is a candidate. With a face, a voice, and an opinion.

On the left, your agent. On the right, ours. Ours joins the call, has the conversation, and leaves. Your agent has no idea it is a test. It is just a call.

---

## 6 · Three layers
**SRINI · 1:30**

Three parts to it.

The face is a rendered avatar. You can swap the vendor out. That part is basically solved.

The runner is just a browser with a fake camera and a fake microphone. Boring on purpose.

The brain is ours. It listens, it decides when to speak, and it makes up its answers in the moment. All of the difficulty lives there.

And look at the strip along the bottom. Ears, and turn taking. Those two orange boxes are the entire second half of this talk.

---

## 7 · Nothing to change
**SRINI · 1:00**

The question we always get first is: what do we have to change in our agent?

Nothing. No SDK, no test hooks, no special build.

One requirement. Your agent has to live at a web address that a person could join with a camera and a microphone. If you can send that link to a colleague and they can join it in a browser, we can test it.

And to be straight with you about the limit: if your agent only exists inside Zoom, Meet or Teams, we cannot do it yet. That is a different door and it is on our list.

---

## 8 · Demo
**BOTH  (Sai drives, Srini narrates) · 8:00**

Enough slides. Let us run one.

Three things to watch for. Does it answer the question that was actually asked. Does it wait its turn. And does it sound like a person.

> *[start the run, then SAY NOTHING for about 40 seconds. The silence is the demo.]*

That is their AI interviewer. That is our candidate. Nobody is typing. Nobody is driving this. It is a job interview happening on its own.

Listen to the pauses, and the ums. That is not us being sloppy. That is the proof it is reacting in the moment instead of reading a script.

When the result comes up, land this: two minutes twenty, ten exchanges, about one cent. And read the verdict out. If it failed a criterion, say why that matters: this agent sounds excellent, and it would still screen a backend engineer and a sales rep with the same three questions. Nothing crashed. That is the kind of bug you only find by running it fifty times instead of twice.

> *[If the live run stalls, switch to the recorded run straight away. Do not debug on stage.]*

---

## 9 · The honest part
**SRINI · 0:30**

Now the honest part.

That demo takes two minutes to watch. Getting there took two problems that each looked easy on a whiteboard, and each one cost us about a week.

---

## 10 · Ears
**SRINI · 3:00**

Problem one. Our candidate could not hear anything.

And here is the strange bit. We had joined the call. We were receiving audio. Thousands of chunks of it, arriving perfectly on time. Nothing errored.

And every single chunk was empty.

That number, RMS, is just a measure of how much sound is in a clip. Zero means silence. Normal speech is a few thousand. We were getting nought point two. That is not quiet. That is nothing at all.

The reason is a browser rule. A browser will not bother decoding audio that nobody is listening to. We were reading from the audio track, but nothing was playing it, so the browser handed us perfectly formed, perfectly timed, completely empty audio. Forever. And it never once told us anything was wrong.

The fix is to force the browser to play it at zero volume, so it has to decode it.

But the lesson is bigger than audio. No error is not proof that anything worked. We had to write a test for our own test tool, because a broken tool and a quiet agent looked exactly the same.

---

## 11 · Turn taking
**SAI · 3:00**

Problem two. Knowing when to stop talking.

Everyone here has been on a bad video call where two people start speaking at the same time. We had to teach that skill to a machine.

Look at the three bars. If our candidate is too eager, it talks over the interviewer. If it is too patient you get dead air, and the interviewer starts saying take your time, whenever you are ready. Which is one machine politely telling you the other machine is broken.

The human version is a small beat, and then a reply.

The hard part is that silence does not mean somebody finished. Silence is a comma.

And there is a second trap. When someone says mhm or right while you are talking, they are not interrupting you. They are telling you to keep going. Our first version treated that as an interruption and chopped our candidate off mid word.

So now we wait a quarter of a second and check whether they are still talking before we hand over the floor. Short noises get absorbed. Real interruptions still work.

---

## 12 · What we measure
**SRINI · 2:30**

So what do you actually get back, every single time.

Four scores, each out of ten. Conversation flow is about turn taking and pacing, whether it talked over the candidate. Question handling is whether it got its job done. Response quality is whether the answers were relevant. And avatar presentation is the lip sync, the expression, the audio and video quality.

Then the run level facts. How many of your criteria passed, with a quote and a timestamp for each one. How many turns. How long it took. What it cost.

One important separation. Those four scores explain a result. They do not decide it. Your criteria decide it. So you can pass and still have a low flow score, and that tells you something real: it did what you asked, and the conversation was still awkward.

And every score is about your agent only. Our candidate is test equipment. Its face, its voice, and anything that breaks on our side is excluded.

---

## 13 · Criteria
**SAI · 2:30**

So now the real question for us as testers. How do you assert on a conversation?

You have a two minute video of two machines talking. There is no expected output. And somebody still has to say pass or fail, and defend it.

The answer is that you write down what good looks like before you run it. And how you write it decides whether any of this is useful or just decorative.

On the left is what people write first. Agent is friendly. Conducts a good interview. Handles difficult candidates. None of those are testable. Friendly is not a thing you can point at.

On the right is the same intent made observable. Greets the candidate within fifteen seconds. Asks three questions about the role. Explains next steps before ending.

Simple rule. If you could not confirm it yourself by watching the recording, then nothing else can either. And if your criterion has the word and in it, it is probably two criteria.

---

## 14 · Fan out
**SRINI · 1:30**

One conversation only proves it worked once.

So you spread it out. A couple of scenarios, a few personalities, run each of them a couple of times. That is twelve real conversations from one setup.

And this is the bit worth taking home. These systems are not repeatable, and that is not a flaw in your test. It is a property of the thing you are testing. So you stop fighting the randomness and start sampling it on purpose.

Run it three times. Twice is a bug. Once is a maybe.

---

## 15 · What is next
**SRINI · 2:00**

Where this goes next, and we will be honest about both halves.

On the left, harder conditions. Right now our candidate sits against a plain background in a quiet room, which is not where anybody actually takes a call. So we are adding real backgrounds. A kitchen, an open plan office, a coffee shop.

Then the interesting one. Today an interruption means the interviewer speaking over the candidate. Real life is messier. Two colleagues talking behind you. Somebody walking through the shot. A doorbell, a dog, a child. Your agent has to keep track of who it is actually talking to, and that is a very different test.

And two measurements. We want to time your agent, not just ours, so you know how long it makes people wait. And whether it actually looks at the camera.

On the right, more places to meet you. Today we join any web link. Next is Zoom, Teams, Meet and Webex, because that is where a lot of these agents actually live.

And that right hand list is written by customers, not by us. So if your agent lives somewhere that is not on it, come and tell us afterwards.

---

## 16 · Six things to take back
**BOTH · 1:30**

One line each, alternating.

SRINI: Test it like a person would. Join the call. Do not go hunting for a button to click, there is not one.

SAI: Write down what good looks like before you run it. Not after, when you already know the answer.

SRINI: Always ask to see the moment. A quote and a timestamp, or it did not happen.

SAI: Run it more than once. The same test can give you a different answer, and that is normal here.

SRINI: Test the bad days too. Nervous people, rude people, people who will not answer the question.

SAI: And keep it small. Five conversations you actually run every release beat fifty you never get to.

> *[Then stay quiet for about fifteen seconds. People photograph this one.]*

---

## 17 · Close
**SRINI · 0:45**

Where we started. Ten personalities used to be a lost day. Now it is a coffee.

That is the whole pitch. Everything in the middle of this talk was the price of it.

We are Srinivasan and Sai. Questions, and yes, please try to break it.

> *[Likely questions: cost at scale, one cent a conversation. How do we stop the grader making things up, criteria plus evidence plus unverifiable does not pass. Can it test our Zoom bot, not yet. Does it work with our avatar vendor, yes, we join the link like a person.]*

---

## Q&A prep

**How much does it cost at scale?**
About a cent a conversation. Video is the expensive kind of test, because a three minute conversation takes three minutes and there is no fast forward. That is why we say five scenarios every release, not fifty once a quarter.

**How do you stop the grader making things up?**
Three things. It grades against criteria you wrote, not its own opinion. Every verdict carries a quote and a timestamp you can go and check. And anything it cannot confirm from the recording counts as not met, never as a pass.

**Can it test our agent inside Zoom, Meet or Teams?**
Not yet, and it is the top thing on our list. Today we join a web link the way a person would.

**What about background noise and other people in the room?**
Today our candidate sits in a quiet room against a plain background. Real backgrounds, crowded rooms and off camera interruptions are what we are building next.

**Does it work with our avatar vendor?**
Yes. We do not integrate with your vendor at all, we join the link like a participant.

**Do we have to change our agent?**
No. No SDK, no test hooks, no special build. If you can send the link to a colleague and they can join in a browser, we can test it.

**Is our agent scored on your candidate's video quality?**
No. Our candidate is test equipment. Its face, its voice and any glitch on our side are excluded from your score, or the run is marked inconclusive.

---

## Numbers to have straight

| Claim | Value |
|---|---|
| Demo run | 141.8s, 10 turns, $0.0095 |
| Manual testing cost | 15 min x 10 personas x 3 repeats = 7.5 hours |
| Silent capture | RMS 0.2 across 1,572 frames |
| Working capture | RMS about 3,400 |
| Turn taking | 250ms confirm before yielding, end of turn 1.1s |
| Scores | four pillars, each 0 to 10 |
| Fan out example | 2 scenarios x 3 personas x 2 repeats = 12 sessions |
| Suite wall clock | 24 sessions is about half an hour |
