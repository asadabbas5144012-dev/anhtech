/**
 * Service catalogue — single source of truth for navigation, the home page,
 * the services index, every service detail page, contact-form options and
 * structured data. Edit copy here; pages update automatically.
 */

export type ServiceSlug =
  | "website-development"
  | "web-application-development"
  | "android-app-development"
  | "ios-app-development"
  | "custom-software-development"
  | "graphic-design"
  | "meta-ads"
  | "seo";

export type GlyphKind =
  | "website"
  | "webapp"
  | "android"
  | "ios"
  | "software"
  | "design"
  | "ads"
  | "seo";

export interface Service {
  slug: ServiceSlug;
  number: string;
  title: string;
  /** Short label for menus and form options. */
  shortTitle: string;
  category: "Engineering" | "Creative" | "Growth";
  glyph: GlyphKind;
  /** One-line summary used on cards. */
  summary: string;
  /** Very short phrase for the mega-menu. */
  menuBlurb: string;
  hero: { eyebrow: string; title: string; lead: string };
  valueProp: string;
  overview: string[];
  problems: { title: string; text: string }[];
  offerings: { title: string; text: string }[];
  approach: { title: string; text: string }[];
  tools?: { group: string; items: string[] }[];
  /** Important clarification shown prominently (pricing, guarantees). */
  notice?: { title: string; text: string };
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string };
}

export const services: Service[] = [
  {
    slug: "website-development",
    number: "01",
    title: "Website Development",
    shortTitle: "Website Development",
    category: "Engineering",
    glyph: "website",
    summary:
      "Professional, responsive websites designed to represent your brand and convert visitors into customers.",
    menuBlurb: "Business sites, landing pages & e-commerce",
    hero: {
      eyebrow: "Website Design & Development",
      title: "Websites that earn trust in the first five seconds.",
      lead: "Fast, responsive and search-ready websites, designed around your brand and built to turn visitors into conversations.",
    },
    valueProp:
      "Your website is often the first serious impression a client has of your business. We design and develop websites that look credible, load quickly, read clearly on every device and guide visitors toward the action that matters to you.",
    overview: [
      "Every website starts with understanding who it is for and what it needs to achieve: enquiries, sales, bookings, credibility or all of them. From there we shape the structure, write the interface, and build on a modern, maintainable foundation.",
      "You get a site that is responsive by design, optimised for Core Web Vitals, structured for search engines and easy for your team to update.",
    ],
    problems: [
      { title: "An outdated first impression", text: "A dated or inconsistent site quietly undermines trust before a prospect ever contacts you." },
      { title: "Visitors who never convert", text: "Traffic arrives but leaves without enquiring because the message or path to contact is unclear." },
      { title: "Slow, fragile pages", text: "Heavy themes and plugins hurt load times, mobile experience and search visibility." },
      { title: "Hard to update", text: "Simple content changes require a developer, so the site falls behind the business." },
    ],
    offerings: [
      { title: "Business & Corporate Websites", text: "Multi-page sites that present your services, expertise and story with clarity and authority." },
      { title: "Landing Pages", text: "Focused, conversion-led pages for campaigns, launches and lead generation." },
      { title: "E-commerce Stores", text: "Online stores with clean product presentation, secure checkout and manageable catalogues." },
      { title: "Portfolio Websites", text: "Showcase sites for creatives, consultants and professionals who sell on the quality of their work." },
      { title: "Custom Websites", text: "Bespoke builds with custom functionality, integrations and content structures." },
      { title: "Redesigns & Rebuilds", text: "Modernising an existing site while preserving what already works, including search equity." },
    ],
    approach: [
      { title: "Goals & content", text: "Define audience, objectives, pages and the key actions the site must drive." },
      { title: "Structure & design", text: "Sitemap, wireframes and visual design aligned with your brand." },
      { title: "Build & optimise", text: "Responsive development, on-page SEO foundations and performance tuning." },
      { title: "Launch & handover", text: "Testing, deployment, analytics setup and guidance for managing content." },
    ],
    tools: [
      { group: "Build", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Platforms", items: ["WordPress", "Shopify", "Headless CMS"] },
      { group: "Quality", items: ["Lighthouse", "Core Web Vitals", "Schema.org"] },
    ],
    faqs: [
      { q: "How long does a website take to build?", a: "It depends on scope. A focused landing page can take a few days to a couple of weeks, while a multi-page business or e-commerce site typically takes several weeks. You'll receive a clear timeline after we discuss requirements." },
      { q: "Will I be able to update the website myself?", a: "Yes, if that's what you need. We can set up a content management system so you can edit text, images and pages without touching code." },
      { q: "Do you also handle hosting and domains?", a: "We can advise on and set up hosting, domains and deployment, or work with the provider you already use." },
      { q: "Is the website optimised for search engines?", a: "Every site is built with technical SEO foundations: semantic structure, metadata, performance and mobile-friendliness. Ongoing SEO is available as a separate service." },
    ],
    seo: {
      title: "Website Design & Development Services",
      description:
        "Professional website design and development for businesses worldwide — responsive business websites, landing pages, e-commerce and custom sites built for speed, SEO and conversion.",
    },
  },
  {
    slug: "web-application-development",
    number: "02",
    title: "Web Application Development",
    shortTitle: "Web Application",
    category: "Engineering",
    glyph: "webapp",
    summary:
      "Custom web platforms, SaaS products, dashboards, and business applications built around your requirements.",
    menuBlurb: "SaaS, dashboards, CRM & business platforms",
    hero: {
      eyebrow: "Web Application Development",
      title: "Web applications built around the way you actually work.",
      lead: "From SaaS products to internal dashboards, we engineer secure, scalable web platforms that turn complex processes into simple interfaces.",
    },
    valueProp:
      "Off-the-shelf tools force your business to adapt to them. A custom web application adapts to you: your workflows, your data and your customers, with room to grow as the business evolves.",
    overview: [
      "We design and build full-stack web applications: thoughtful interfaces on the front end, reliable APIs and data models behind them, and integrations with the tools you already rely on.",
      "Projects are delivered in clear milestones so you see working software early, give feedback often and stay in control of priorities.",
    ],
    problems: [
      { title: "Spreadsheets doing a database's job", text: "Critical operations depend on shared files that break, duplicate and don't scale." },
      { title: "Disconnected tools", text: "Data lives in several systems with manual copying in between." },
      { title: "A product idea without a technical partner", text: "You know the problem you want to solve but need someone to architect and build it." },
      { title: "Software that doesn't fit", text: "Generic platforms cover 70% of your needs and make the rest painful." },
    ],
    offerings: [
      { title: "SaaS Platforms", text: "Multi-tenant products with authentication, subscriptions, roles and dashboards." },
      { title: "Admin Dashboards", text: "Clear operational views of data, users, orders and performance." },
      { title: "CRM & ERP Systems", text: "Custom customer, sales and resource management tailored to your processes." },
      { title: "Booking & Scheduling", text: "Reservation, appointment and availability systems with notifications." },
      { title: "Business Management Systems", text: "Inventory, invoicing, staff and workflow tools in one place." },
      { title: "API Integrations & Automation", text: "Connect payment gateways, third-party services and internal tools; automate repetitive work." },
    ],
    approach: [
      { title: "Discovery & scope", text: "Map users, workflows, data and the smallest version that delivers value." },
      { title: "Architecture & UX", text: "Choose the right stack, design the data model and prototype key screens." },
      { title: "Iterative build", text: "Develop in milestones with regular demos, testing and feedback." },
      { title: "Deploy & evolve", text: "Production deployment, monitoring and an agreed plan for improvements." },
    ],
    tools: [
      { group: "Front end", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      { group: "Back end", items: ["Node.js", "Express", "Python", "PHP", "Laravel"] },
      { group: "Data & cloud", items: ["PostgreSQL", "MongoDB", "Firebase", "AWS", "Docker"] },
    ],
    faqs: [
      { q: "Can you build an MVP for my startup?", a: "Yes. We help define the minimum feature set that proves your idea, build it properly, and leave a foundation you can extend rather than rewrite." },
      { q: "Who owns the source code?", a: "Ownership terms are agreed in writing before the project starts. Typically, on full payment, the custom code developed for your project is transferred to you." },
      { q: "Can you work with our existing system?", a: "Yes. We can extend, integrate with or gradually modernise existing applications and databases after reviewing them." },
      { q: "How do you handle security?", a: "We follow established practices: secure authentication, input validation, least-privilege access, encrypted connections and careful handling of secrets and personal data." },
    ],
    seo: {
      title: "Web Application & SaaS Development",
      description:
        "Custom web application development — SaaS platforms, admin dashboards, CRM, ERP, booking systems, API integrations and business automation built around your requirements.",
    },
  },
  {
    slug: "android-app-development",
    number: "03",
    title: "Android App Development",
    shortTitle: "Android Application",
    category: "Engineering",
    glyph: "android",
    summary:
      "Modern Android applications designed for performance, usability, and real-world business needs.",
    menuBlurb: "Native & cross-platform Android apps",
    hero: {
      eyebrow: "Android Application Development",
      title: "Android apps that feel fast, clear and dependable.",
      lead: "We design and develop Android applications that serve real business needs, from customer-facing apps to field and operations tools.",
    },
    valueProp:
      "Android powers the majority of smartphones worldwide. A well-built Android app puts your service directly in your customers' hands, with smooth performance across the wide range of devices they actually use.",
    overview: [
      "We build Android applications natively with Kotlin or cross-platform with Flutter or React Native, choosing the approach that best fits your goals, budget and timeline.",
      "Every app is designed around usability, tested across screen sizes and prepared for Google Play submission.",
    ],
    problems: [
      { title: "Customers expect an app", text: "Your audience is mobile-first and a website alone isn't enough to keep them engaged." },
      { title: "Field teams on paper", text: "Staff in the field rely on calls, paper forms or messaging apps to report work." },
      { title: "An app that performs poorly", text: "An existing app is slow, crashes or receives poor reviews." },
      { title: "Device fragmentation", text: "Your app needs to work reliably across many Android devices and versions." },
    ],
    offerings: [
      { title: "Custom Android Applications", text: "Native or cross-platform apps built to your exact requirements." },
      { title: "Business & Productivity Apps", text: "Internal tools for teams, field operations, reporting and approvals." },
      { title: "Mobile Commerce", text: "Shopping, ordering and payment experiences optimised for mobile." },
      { title: "Integrations", text: "Connect apps with your APIs, payment gateways, maps, notifications and analytics." },
      { title: "UI/UX for Mobile", text: "Material-aligned interfaces that feel natural to Android users." },
      { title: "Play Store Release", text: "Preparation of listings, builds and submission to Google Play." },
    ],
    approach: [
      { title: "Define the app", text: "Users, core journeys, features and platform strategy." },
      { title: "Design the experience", text: "Wireframes and interface design for key screens and states." },
      { title: "Build & test", text: "Development with testing on real devices and screen sizes." },
      { title: "Release & support", text: "Store submission, launch support and agreed maintenance." },
    ],
    tools: [
      { group: "Native", items: ["Kotlin", "Jetpack Compose"] },
      { group: "Cross-platform", items: ["Flutter", "React Native"] },
      { group: "Services", items: ["Firebase", "Node.js", "REST APIs"] },
    ],
    faqs: [
      { q: "Native or cross-platform — which should I choose?", a: "Cross-platform (Flutter or React Native) is often efficient when you need Android and iOS together. Native Kotlin can suit apps with demanding performance or deep device integration. We recommend an approach after understanding your needs." },
      { q: "Can you publish the app on Google Play for me?", a: "Yes. We prepare the release build and listing and guide the submission. The Google Play developer account is registered in your name so you retain ownership." },
      { q: "Do you build the backend as well?", a: "Yes. We can build the APIs, database and admin panel the app needs, or integrate with your existing backend." },
    ],
    seo: {
      title: "Android App Development Services",
      description:
        "Android application development for businesses — custom native and cross-platform Android apps, business apps, mobile commerce and integrations built for performance and usability.",
    },
  },
  {
    slug: "ios-app-development",
    number: "04",
    title: "iOS App Development",
    shortTitle: "iOS Application",
    category: "Engineering",
    glyph: "ios",
    summary:
      "Elegant iPhone and iPad applications that deliver seamless mobile experiences.",
    menuBlurb: "iPhone & iPad applications",
    hero: {
      eyebrow: "iOS Application Development",
      title: "iPhone and iPad apps with the polish users expect.",
      lead: "We craft iOS applications that respect Apple's design standards, perform smoothly and give your customers a reason to come back.",
    },
    valueProp:
      "iOS users expect refined, intuitive experiences. We build iPhone and iPad applications with careful attention to interface detail, performance and the guidelines that help apps pass App Store review.",
    overview: [
      "We develop iOS apps natively with Swift and SwiftUI, or cross-platform with Flutter or React Native when you need both iOS and Android from a shared codebase.",
      "From first prototype to App Store submission, you work directly with the engineer building your app.",
    ],
    problems: [
      { title: "Reaching premium audiences", text: "Your customers are iPhone users who expect a polished native experience." },
      { title: "A clunky mobile experience", text: "Your service is hard to use on mobile web and engagement suffers." },
      { title: "App Store uncertainty", text: "You're unsure how to prepare an app that meets Apple's review guidelines." },
      { title: "One idea, two platforms", text: "You need to launch on iOS and Android without doubling cost unnecessarily." },
    ],
    offerings: [
      { title: "iPhone Applications", text: "Custom apps designed for iPhone with native interactions and performance." },
      { title: "iPad Experiences", text: "Layouts that make full use of larger screens for productivity and content." },
      { title: "Custom App Development", text: "Business, service, booking and content apps built to your specification." },
      { title: "Cross-platform Delivery", text: "Shared codebases with Flutter or React Native for iOS and Android." },
      { title: "Backend & Integrations", text: "APIs, authentication, payments, notifications and cloud services." },
      { title: "App Store Release", text: "Builds, metadata and submission guidance for the App Store." },
    ],
    approach: [
      { title: "Plan", text: "Clarify users, features and platform approach." },
      { title: "Design", text: "Interface design aligned with Apple's Human Interface Guidelines." },
      { title: "Develop", text: "Build, test on devices and refine through feedback." },
      { title: "Release", text: "TestFlight testing, App Store submission and launch support." },
    ],
    tools: [
      { group: "Native", items: ["Swift", "SwiftUI"] },
      { group: "Cross-platform", items: ["Flutter", "React Native"] },
      { group: "Services", items: ["Firebase", "Node.js", "REST APIs"] },
    ],
    faqs: [
      { q: "Do I need a Mac or Apple developer account?", a: "You don't need a Mac. You will need an Apple Developer Program membership in your or your company's name so the app is published under your ownership. We'll guide you through it." },
      { q: "Can you guarantee App Store approval?", a: "No one can guarantee approval, as Apple makes the final decision. We build with the App Store Review Guidelines in mind and help address any feedback during review." },
      { q: "Can the same app run on Android?", a: "Yes, if built cross-platform. We'll discuss whether a shared codebase or separate native apps best fits your goals." },
    ],
    seo: {
      title: "iOS App Development — iPhone & iPad Apps",
      description:
        "iOS application development — custom iPhone and iPad apps built with Swift, SwiftUI or cross-platform frameworks, designed for seamless mobile experiences.",
    },
  },
  {
    slug: "custom-software-development",
    number: "05",
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    category: "Engineering",
    glyph: "software",
    summary:
      "Purpose-built software and automation solutions that simplify workflows and solve complex business problems.",
    menuBlurb: "Automation, desktop & operational systems",
    hero: {
      eyebrow: "Custom Software Development",
      title: "Software shaped precisely around your operations.",
      lead: "Purpose-built systems and automation that remove repetitive work, connect your data and give you clear control over how your business runs.",
    },
    valueProp:
      "When generic software can't keep up with how your business really operates, custom software closes the gap: automating the repetitive, connecting the disconnected and making complex processes manageable.",
    overview: [
      "We build custom business software across web, desktop and cloud: from small automation scripts that save hours each week to complete operational systems.",
      "We start by understanding your current process in detail, then design software that simplifies it rather than simply digitising the complexity.",
    ],
    problems: [
      { title: "Hours lost to manual work", text: "Data entry, reconciliation and reporting consume time that should go to the business." },
      { title: "Processes nobody can see", text: "Without a system of record, status and accountability are hard to track." },
      { title: "Legacy software holding you back", text: "Old tools are slow, unsupported or impossible to extend." },
      { title: "Unique requirements", text: "Your industry or model has needs no off-the-shelf product addresses." },
    ],
    offerings: [
      { title: "Business Automation", text: "Automate repetitive tasks, reports, data transfers and notifications." },
      { title: "Desktop Software", text: "Desktop applications for offline, hardware-connected or specialised workflows." },
      { title: "Enterprise Applications", text: "Larger systems with roles, permissions, audit trails and integrations." },
      { title: "Operational Systems", text: "Inventory, production, logistics and service management tailored to you." },
      { title: "Data & Reporting Tools", text: "Consolidate data sources into clear reports and dashboards." },
      { title: "Legacy Modernisation", text: "Migrate or rebuild ageing software on a maintainable modern stack." },
    ],
    approach: [
      { title: "Process analysis", text: "Understand current workflows, bottlenecks and data." },
      { title: "Solution design", text: "Define the system, architecture and phased delivery plan." },
      { title: "Build & validate", text: "Develop in stages and validate with the people who will use it." },
      { title: "Rollout & support", text: "Deployment, data migration, training and agreed support." },
    ],
    tools: [
      { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "PHP"] },
      { group: "Frameworks", items: ["Node.js", "Express", "Laravel", "Electron"] },
      { group: "Data & infra", items: ["PostgreSQL", "MongoDB", "AWS", "Docker"] },
    ],
    faqs: [
      { q: "Is custom software worth it for a small business?", a: "Often, yes, when a specific process costs significant time or money. We'll help you assess whether a custom solution, an existing product or a simple integration is the most sensible investment." },
      { q: "Can you automate tasks between tools we already use?", a: "Usually. If the tools provide APIs or export options, we can connect them and automate data flows and routine actions." },
      { q: "What happens after the software is delivered?", a: "We agree support terms up front, covering bug fixes, maintenance and future enhancements, so you're never left without help." },
    ],
    seo: {
      title: "Custom Software Development & Business Automation",
      description:
        "Custom software development and business automation solutions — desktop software, enterprise applications and operational systems that simplify workflows and solve complex problems.",
    },
  },
  {
    slug: "graphic-design",
    number: "06",
    title: "Graphic Design & Branding",
    shortTitle: "Graphic Design",
    category: "Creative",
    glyph: "design",
    summary:
      "Distinctive visual identities and creative assets that help your brand stand out.",
    menuBlurb: "Identity, logos, social & collateral",
    hero: {
      eyebrow: "Graphic Design & Branding",
      title: "A visual identity people remember and trust.",
      lead: "Brand identities, logos and creative assets that express who you are with clarity and consistency across every touchpoint.",
    },
    valueProp:
      "Strong design makes a business look established, consistent and worth choosing. We create visual identities and marketing assets that look professional on day one and stay coherent as you grow.",
    overview: [
      "Design work begins with your positioning: who you serve, what makes you different and how you want to be perceived. That foundation guides every visual decision.",
      "Because we also build websites and run campaigns, your brand is designed to work in the real digital contexts it will live in.",
    ],
    problems: [
      { title: "An inconsistent look", text: "Every flyer, post and document looks different, which weakens recognition." },
      { title: "Looking smaller than you are", text: "Amateur visuals make it harder to win larger clients." },
      { title: "No brand guidelines", text: "Without rules, anyone producing content guesses at colours, fonts and tone." },
      { title: "Content that doesn't stop the scroll", text: "Social media visuals blend in rather than stand out." },
    ],
    offerings: [
      { title: "Brand Identity", text: "Logo system, colour palette, typography and visual language." },
      { title: "Logo Design", text: "Distinctive, versatile marks that work from favicon to signage." },
      { title: "Brand Guidelines", text: "Clear documentation so your brand is applied consistently." },
      { title: "Marketing Creatives", text: "Ad creatives, banners, posters and campaign visuals." },
      { title: "Social Media Design", text: "Post templates, carousels, highlights and profile assets." },
      { title: "Business Collateral", text: "Business cards, letterheads, presentations, brochures and proposals." },
    ],
    approach: [
      { title: "Brief & research", text: "Understand your business, audience, competitors and preferences." },
      { title: "Concepts", text: "Explore distinct creative directions with rationale." },
      { title: "Refinement", text: "Develop the chosen direction through structured feedback." },
      { title: "Delivery", text: "Final files in all required formats with usage guidance." },
    ],
    tools: [
      { group: "Design", items: ["Figma", "Adobe Illustrator", "Adobe Photoshop"] },
      { group: "Delivery", items: ["SVG", "PDF", "PNG", "Brand guidelines"] },
    ],
    faqs: [
      { q: "How many logo concepts will I receive?", a: "The number of initial concepts and revision rounds is defined in your proposal, so expectations are clear before work begins." },
      { q: "Which files will I receive?", a: "You'll receive production-ready files for print and digital use, typically vector (SVG, PDF, AI/EPS where applicable) and raster (PNG, JPG) in colour variations." },
      { q: "Do I own the final design?", a: "Yes. Once the project is completed and paid for, the rights to the final approved design are transferred to you as set out in the agreement." },
    ],
    seo: {
      title: "Graphic Design & Brand Identity Services",
      description:
        "Graphic design and branding services — brand identity, logo design, marketing creatives, social media design and business collateral that help your brand stand out.",
    },
  },
  {
    slug: "meta-ads",
    number: "07",
    title: "Meta Ads Management",
    shortTitle: "Meta Ads",
    category: "Growth",
    glyph: "ads",
    summary:
      "Strategic Facebook and Instagram campaigns designed to reach relevant audiences and generate meaningful leads.",
    menuBlurb: "Facebook & Instagram campaigns",
    hero: {
      eyebrow: "Meta Ads Management",
      title: "Facebook and Instagram campaigns with a clear purpose.",
      lead: "Strategic Meta advertising that reaches the right people, communicates the right message and is measured against the outcomes you care about.",
    },
    valueProp:
      "Boosting posts is not a strategy. We plan, build and manage Facebook and Instagram campaigns with defined objectives, considered audiences and creative designed to perform, then optimise based on real data.",
    overview: [
      "Effective paid social combines three things: the right audience, compelling creative and accurate measurement. We manage all three, with transparent reporting on what's working and what we're changing.",
      "Campaigns are connected to your website or landing pages with proper tracking, so decisions are based on leads and sales rather than likes.",
    ],
    problems: [
      { title: "Spend without results", text: "Money goes into boosted posts with no clear return." },
      { title: "The wrong audience", text: "Ads reach people unlikely to ever become customers." },
      { title: "No reliable tracking", text: "You can't tell which campaigns produce enquiries or sales." },
      { title: "Creative fatigue", text: "The same ads run for months and performance quietly declines." },
    ],
    offerings: [
      { title: "Campaign Planning", text: "Objectives, funnel structure, budget allocation and timeline." },
      { title: "Audience Research", text: "Interest, lookalike and retargeting audiences built around your customers." },
      { title: "Creative Strategy", text: "Ad concepts, copy and visuals designed for each placement and stage." },
      { title: "Facebook Ads", text: "Campaign setup and management across Facebook placements." },
      { title: "Instagram Ads", text: "Feed, Stories and Reels advertising tailored to the format." },
      { title: "Optimisation & Reporting", text: "Ongoing testing, refinement and clear performance reports." },
    ],
    approach: [
      { title: "Audit & goals", text: "Review current activity and define measurable objectives." },
      { title: "Setup & tracking", text: "Pixel / Conversions API, events and campaign structure." },
      { title: "Launch & test", text: "Launch with structured creative and audience testing." },
      { title: "Optimise & report", text: "Refine based on data and report results transparently." },
    ],
    tools: [
      { group: "Platforms", items: ["Meta Ads Manager", "Meta Business Suite"] },
      { group: "Measurement", items: ["Meta Pixel", "Conversions API", "Google Analytics"] },
    ],
    notice: {
      title: "Advertising budget is separate",
      text: "Your advertising spend is paid directly to Meta and is separate from our management fee, unless a specific package explicitly states otherwise. Results depend on many factors, including budget, offer, market and competition, so we don't promise specific numbers of leads or sales.",
    },
    faqs: [
      { q: "How much should I spend on ads?", a: "It depends on your goals, market and offer. We'll recommend a starting budget during planning, and you remain in full control of how much you spend." },
      { q: "Is the ad budget included in your fee?", a: "No. Ad spend is paid directly to Meta from your own ad account. Our fee covers strategy, setup, creative direction, management and reporting, unless a package states otherwise." },
      { q: "Do you guarantee results?", a: "No responsible marketer can guarantee specific results. We commit to sound strategy, careful management and honest reporting, and we optimise continuously toward your objectives." },
      { q: "Who owns the ad account?", a: "You do. Campaigns run in your business's ad account, and we're given access as partners." },
    ],
    seo: {
      title: "Meta Ads Management — Facebook & Instagram Advertising",
      description:
        "Facebook and Instagram ads management — campaign planning, audience research, creative strategy, tracking and optimisation designed to generate meaningful leads.",
    },
  },
  {
    slug: "seo",
    number: "08",
    title: "SEO Services",
    shortTitle: "SEO",
    category: "Growth",
    glyph: "seo",
    summary:
      "Technical, on-page, and complete SEO strategies that improve search visibility and organic growth.",
    menuBlurb: "Technical, on-page & local SEO",
    hero: {
      eyebrow: "Search Engine Optimisation",
      title: "Search visibility built on solid technical ground.",
      lead: "Technical, on-page and content-led SEO that helps the right people find your business, and keeps improving over time.",
    },
    valueProp:
      "Sustainable search visibility comes from a technically sound website, content that genuinely answers what people search for, and authority earned over time. As engineers, we're especially strong at the technical foundations many SEO efforts overlook.",
    overview: [
      "We start with an audit of how search engines crawl, index and understand your site, then prioritise the changes with the greatest likely impact.",
      "From there, we improve on-page relevance, content and authority, and report progress using data from tools like Google Search Console and Google Analytics.",
    ],
    problems: [
      { title: "Invisible in search", text: "Potential customers search for your services but find competitors instead." },
      { title: "Technical issues blocking growth", text: "Indexing errors, slow pages or poor structure limit visibility." },
      { title: "Content without direction", text: "Pages and posts aren't aligned with what your audience actually searches for." },
      { title: "Weak local presence", text: "Your business doesn't appear for local searches in the areas you serve." },
    ],
    offerings: [
      { title: "Technical SEO", text: "Crawlability, indexation, site architecture, structured data and Core Web Vitals." },
      { title: "On-page SEO", text: "Titles, headings, metadata, internal linking and page relevance." },
      { title: "Off-page SEO", text: "Ethical authority building through relevant mentions and quality links." },
      { title: "Keyword Research", text: "Search demand analysis to guide content and site structure." },
      { title: "Content Optimisation", text: "Improve existing pages and plan content around real search intent." },
      { title: "Local SEO", text: "Google Business Profile optimisation and local relevance signals." },
      { title: "SEO Audits", text: "Detailed, prioritised reviews of technical, content and authority factors." },
      { title: "Website Performance", text: "Speed and experience improvements that help users and rankings." },
      { title: "Search Visibility Strategy", text: "A long-term roadmap aligned with your business priorities." },
    ],
    approach: [
      { title: "Audit", text: "Technical, content and competitor analysis to establish a baseline." },
      { title: "Prioritise", text: "A clear roadmap ordered by likely impact and effort." },
      { title: "Implement", text: "Technical fixes, on-page improvements and content work." },
      { title: "Measure & refine", text: "Monitor progress and adjust the strategy with data." },
    ],
    tools: [
      { group: "Analysis", items: ["Google Search Console", "Google Analytics", "PageSpeed Insights"] },
      { group: "Technical", items: ["Schema.org", "XML sitemaps", "Core Web Vitals"] },
    ],
    notice: {
      title: "No guaranteed rankings",
      text: "Search engines control their own rankings, and no one can legitimately guarantee positions or traffic. We focus on proven, guideline-compliant practices and transparent reporting on progress.",
    },
    faqs: [
      { q: "How long does SEO take to show results?", a: "SEO is a long-term investment. Technical fixes can have an effect relatively quickly, but meaningful organic growth usually builds over several months, depending on competition and your site's starting point." },
      { q: "Can you guarantee first-page rankings?", a: "No. Anyone who guarantees rankings is overpromising. We commit to best-practice work, clear priorities and honest reporting." },
      { q: "Do you offer one-off SEO audits?", a: "Yes. A standalone audit gives you a prioritised list of improvements you can implement yourself or with us." },
      { q: "Do you work on international SEO?", a: "Yes. We can advise on targeting multiple countries or languages properly, without duplicate content or misleading local pages." },
    ],
    seo: {
      title: "SEO Services — Technical, On-page & Local SEO",
      description:
        "SEO services including technical SEO, on-page optimisation, keyword research, content optimisation, local SEO and audits to improve search visibility and organic growth.",
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Contact-form service options (includes non-service choices). */
export const serviceOptions = [
  ...services.map((s) => s.shortTitle),
  "Multiple Services",
  "Other",
] as const;

/** Natural in-sentence phrasing for each service (keeps proper nouns capitalised). */
export const servicePhrase: Record<ServiceSlug, string> = {
  "website-development": "website development",
  "web-application-development": "web application development",
  "android-app-development": "Android app development",
  "ios-app-development": "iOS app development",
  "custom-software-development": "custom software development",
  "graphic-design": "graphic design and branding",
  "meta-ads": "Meta ads management",
  seo: "SEO",
};
