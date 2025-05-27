const conferences = [
  // === Kept & Updated from existing conferences.ts ===
  { // AppiumConf 2021 (Existing Item 13)
    title: 'AppiumConf 2021',
    description: 'Build your own Appium plugin', // Kept existing description
    imageURL:
      'https://res.cloudinary.com/dnnqsdghx/image/upload/w_600,f_auto,q_auto:best/v1547088258/ConfLogos/szrzudmzoqf4yld9z7zo.png',
    url: 'https://confengine.com/conferences/appium-conf-2021/proposal/15821/build-your-own-appium-plugin',
    reverse: false,
    tags: ['Appium', 'Mobile', 'Testing', 'Plugins'], // Kept existing richer tags
  },
  { // Future of Testing: Mobile (Existing Item 16)
    title: 'Future of Testing: Mobile', // Kept existing title
    description: 'Appium 2.0: What’s Next', // Kept existing description
    imageURL: '', // Kept existing
    url: 'https://applitools.com/future-of-testing-mobile-apac-2021/', // Kept existing
    reverse: true, // Kept existing
    tags: ['Mobile Testing', 'Appium', 'Future Tech'], // Updated tags
  },
  { // TestProject Webinar (Existing Item 17)
    title: 'TestProject Webinar',
    description: 'Consumer Driver Contract', // Updated description from website text
    imageURL: '', // Kept existing
    url: '', // Kept existing
    reverse: true, // Kept existing
    tags: ['Webinar', 'TestProject', 'Contract Testing'], // Updated tags
  },
  { // Perfecto Webinar (Existing Item 18)
    title: "Perfecto Webinar", // Kept existing title (with apostrophe)
    description: "What's next in Appium?", // Kept existing description (with apostrophe)
    imageURL: '', // Kept existing
    url: '', // Kept existing
    reverse: false, // Kept existing
    tags: ['Webinar', 'Perfecto', 'Appium'], // Updated tags
  },
  { // AppiumConf 2019 (Life Cycle) (Existing Item 20)
    title: 'AppiumConf 2019',
    description: 'Life Cycle of an Appium command', // Kept existing
    imageURL:
      'https://res.cloudinary.com/dnnqsdghx/image/upload/w_600,f_auto,q_auto:best/v1547088258/ConfLogos/szrzudmzoqf4yld9z7zo.png',
    url: 'https://confengine.com/conferences/appium-conf-2019/proposal/8935/life-cycle-of-an-appium-command',
    reverse: false,
    tags: ['Mobile', 'Testing', 'Appium'], // Kept existing richer tags
  },
  { // AppiumConf 2019 (Native Mobile) (Existing Item 21)
    title: 'AppiumConf 2019',
    description: 'Native mobile commands in Appium', // Kept existing
    imageURL:
      'https://res.cloudinary.com/dnnqsdghx/image/upload/w_600,f_auto,q_auto:best/v1547088258/ConfLogos/szrzudmzoqf4yld9z7zo.png',
    url: 'https://confengine.com/conferences/appium-conf-2019/proposal/8946/native-mobile-commands-in-appium',
    reverse: true,
    tags: ['Appium', 'Conference', 'Mobile Testing', 'Native Commands'], // Updated tags
  },
  { // SeleniumConf 2018 (Existing Item 22)
    title: 'SeleniumConf 2018',
    description: 'Code Once Test Anywhere: On Demand Private Appium Device Cloud using ATD', // Kept existing
    imageURL: 'https://seleniumconf.in/img/logo.svg',
    url: 'https://confengine.com/conferences/selenium-conf-2018/proposal/6171/code-once-test-anywhere-on-demand-private-appium-device-cloud-using-atd',
    reverse: false,
    tags: ['Selenium', 'Conference', 'Test Automation', 'ATD', 'Appium'], // Updated tags
  },

  // === New Entries from Website Text ===
  {
    title: "Global Testing Summit 2022",
    description: "Appium 2.0",
    imageURL: "https://via.placeholder.com/300x200.png?text=Global+Testing+Summit",
    url: "https://www.saikrishna.tech/#conferences",
    reverse: false,
    tags: ["Testing", "Appium", "Summit"],
  },
  {
    title: "TestAutomationDays Utrecht",
    description: "Parallel Mobile Test",
    imageURL: "https://via.placeholder.com/300x200.png?text=TestAutomationDays",
    url: "https://www.saikrishna.tech/#conferences",
    reverse: false,
    tags: ["Test Automation", "Mobile Testing", "Parallel Testing"],
  },
  { // This replaces the previous SeleniumConf London 2018 entry
    title: "SeleniumConf London 2018",
    description: "Advance Appium Workshop",
    imageURL: "https://via.placeholder.com/300x200.png?text=SeleniumConf+London+Workshop",
    url: "https://www.saikrishna.tech/#conferences",
    reverse: false,
    tags: ["Selenium", "Conference", "Appium", "Workshop"],
  },
];

export { conferences };
