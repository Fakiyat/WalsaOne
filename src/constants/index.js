import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  roadmap5,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../../src/assets";

export const navigation = [
  {
    id: "1",
    title: "Features",
    url: "#features",
  },
  {
    id: "2",
    title: "Services",
    url: "#services",
  },
  {
    id: "3",
    title: "Why Us?",
    url: "#why-us",
  },
  {
    id: "4",
    title: "How?",
    url: "#how",
  },
  {
    id: "5",
    title: "Pricing",
    url: "#pricing",
  },
  // {
  //   id: "6",
  //   title: "New account",
  //   url: "#signup",
  //   onlyMobile: true,
  // },
  // {
  //   id: "7",
  //   title: "Sign in",
  //   url: "#login",
  //   onlyMobile: true,
  // },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Scalability",
  "Security",
  "Great Maintenance",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Ideation & Requirement Mapping",
    text: "We break down your idea into core features, define the value proposition, and create a crystal-clear execution roadmap tailored for rapid delivery.",
    date: "Day 1",
    status: "done",
    imageUrl: roadmap1, // Replace with your new premium image
    colorful: true,
  },
  {
    id: "1",
    title: "UX Wireframes & Flow Design",
    text: "We design intuitive user flows, wireframes, and the core app journey — ensuring your MVP feels clean, modern, and ready for real users.",
    date: "Day 2–3",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "MVP Engineering",
    text: "We build your core features using modern tech, rapid components, reusable systems, API integrations, and optional AI-powered capabilities.",
    date: "Day 3–7",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Testing, QA & Optimization",
    text: "Your MVP goes through performance checks, bug fixes, UI polishing, responsiveness adjustments, and real-device testing.",
    date: "Day 7–8",
    status: "progress",
    imageUrl: roadmap4,
  },
  {
    id: "4",
    title: "Deployment & Launch",
    text: "We deploy your MVP to production with clean hosting, database setup, monitoring tools, and a launch-ready environment with zero friction.",
    date: "Day 9",
    status: "progress",
    imageUrl: roadmap5, // optional, add a 5th image if needed
    colorful: true,
  },
];

export const collabText =
  "Our team of experienced professionals has a proven track record in delivering successful digital solutions.";

export const collabContent = [
  {
    id: "1",
    title: "Premium UI/UX & Modern Engineering",
    text: "We design and develop your MVP using the latest frameworks, scalable architecture, world-class interfaces, and clean, maintainable code.",
  },
  {
    id: "2",
    title: "All-in-One Product Development",
    text: "We handle UI/UX, product strategy, architecture, frontend, backend, database, deployment, hosting, integrations, and optimization — so you don’t need separate teams.",
  },
  {
    id: "3",
    title: "Built for Founders & Startups",
    text: "Perfect for founders who want to validate fast, reduce cost, and launch with professional quality without hiring full-time developers or designers.",
  },
  {
    id: "4",
    title: "Ongoing Support & Iterations",
    text: "After your MVP goes live, we help improve, refine, and scale your product with continuous improvements and new feature development.",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "starter",
    title: "MVP Starter",
    description:
      "Perfect for founders validating a new idea with rapid development.",
    price: "399",
    features: [
      "Fully functional MVP in 5–7 days",
      "Premium UI with modern layouts",
      "Core user flows + authentication",
      "Up to 3 main pages",
      "Basic database + API setup",
      "Deployment on Vercel / Netlify",
    ],
  },

  {
    id: "pro",
    title: "MVP Pro",
    description:
      "Everything you need to launch a scalable production-ready MVP.",
    price: "899",
    features: [
      "Complete MVP in 10–15 days",
      "Custom dashboard + UI/UX enhancements",
      "Advanced API integrations",
      "Role-based auth + sessions",
      "AI-powered features (optional)",
      "Full deployment + monitoring setup",
    ],
  },

  {
    id: "enterprise",
    title: "MVP Enterprise",
    description:
      "For serious founders who want speed, scale, and dedicated engineering.",
    price: null,
    features: [
      "Full custom product development",
      "Dedicated engineering team",
      "Weekly iterations & roadmap planning",
      "Microservices / scalable backend",
      "End-to-end DevOps setup",
      "Lifetime support & SLA uptime guarantees",
    ],
  },
];

export const benefits = [
  {
    id: "1",
    title: "Idea → MVP in Days",
    text: "Transform your startup idea into a functional MVP with wireframes, roadmap, and clear project structure.",
    backgroundUrl: "assets/background.webp",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Premium UI/UX Design",
    text: "Get modern, conversion-focused UI/UX with smooth interactions and pixel-perfect layouts.",
    backgroundUrl: "assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "3",
    title: "Full-Stack Development",
    text: "MVP engineered with React, Node, Firebase, Next.js or your preferred stack — scalable and clean.",
    backgroundUrl: "assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
    // light: true,
  },
  {
    id: "4",
    title: "AI & Automation Integration",
    text: "Boost your MVP with AI tools, chatbots, analytics, smart workflows, and automated processes.",
    backgroundUrl: "assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "5",
    title: "Deployment & DevOps",
    text: "Launch on AWS, Vercel, or DigitalOcean with global CDN, monitoring, and seamless scaling.",
    backgroundUrl: "assets/background.webp",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "6",
    title: "Support & Feature Upgrades",
    text: "Long-term maintenance, new features, bug fixes, and continuous improvements as your MVP grows.",
    backgroundUrl: "assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
