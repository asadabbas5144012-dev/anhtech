/**
 * Shared editorial content: navigation, technologies, industries,
 * differentiators, process, values and commitments.
 */

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasMenu: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Technology stack. Remove anything the company does not actively support —
 * this list is displayed publicly.
 */
export const technologies: { group: string; items: { name: string; mark: string }[] }[] = [
  {
    group: "Frontend",
    items: [
      { name: "React", mark: "Re" },
      { name: "Next.js", mark: "Nx" },
      { name: "TypeScript", mark: "TS" },
      { name: "JavaScript", mark: "JS" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", mark: "No" },
      { name: "Express", mark: "Ex" },
      { name: "Python", mark: "Py" },
      { name: "PHP", mark: "Ph" },
      { name: "Laravel", mark: "La" },
    ],
  },
  {
    group: "Mobile",
    items: [
      { name: "Flutter", mark: "Fl" },
      { name: "React Native", mark: "RN" },
      { name: "Kotlin", mark: "Kt" },
      { name: "Swift", mark: "Sw" },
    ],
  },
  {
    group: "Data & Cloud",
    items: [
      { name: "PostgreSQL", mark: "Pg" },
      { name: "MongoDB", mark: "Mg" },
      { name: "Firebase", mark: "Fb" },
      { name: "AWS", mark: "Aw" },
      { name: "Docker", mark: "Dk" },
    ],
  },
];

export const industries = [
  { name: "Startups", note: "MVPs, product launches and scalable foundations" },
  { name: "E-commerce", note: "Online stores, catalogues and conversion" },
  { name: "Education", note: "Learning platforms, course sites and enrolment" },
  { name: "Healthcare", note: "Booking, information and patient-facing tools" },
  { name: "Real Estate", note: "Listings, lead capture and agent tools" },
  { name: "Finance", note: "Dashboards, reporting and internal systems" },
  { name: "Professional Services", note: "Credible websites and client workflows" },
  { name: "Retail", note: "Inventory, POS integrations and promotion" },
  { name: "Logistics", note: "Dispatch, tracking and operations software" },
  { name: "Technology Companies", note: "Product engineering and design support" },
];

export const differentiators = [
  { title: "Direct Technical Collaboration", text: "Work directly with the engineer responsible for understanding and building your solution." },
  { title: "Solutions Built Around You", text: "Every project is approached according to the client's requirements and business objectives." },
  { title: "Engineering Meets Creativity", text: "We combine reliable development practices with thoughtful visual design." },
  { title: "Complete Digital Expertise", text: "Development, branding, marketing, and SEO from one technology partner." },
  { title: "Quality Over Shortcuts", text: "Focus on maintainable code, performance, usability, and detail." },
  { title: "Growth-Oriented Thinking", text: "Build digital foundations that can evolve with your business." },
];

export const processSteps = [
  { title: "Discover", text: "We understand your vision, objectives, audience, and requirements." },
  { title: "Plan & Design", text: "We establish the project roadmap, technical direction, and user experience." },
  { title: "Develop", text: "We design, build, test, and refine your digital solution." },
  { title: "Launch & Support", text: "We help launch your project and provide agreed post-launch support." },
];

export const commitments = [
  { title: "Clear communication", text: "Regular updates in plain language, direct access to the person building your project, and honest answers when something changes." },
  { title: "Transparent scope & pricing", text: "Written proposals that spell out deliverables, timelines and costs before work begins, with no hidden extras." },
  { title: "Quality you can build on", text: "Clean, documented, maintainable work that performs well today and can grow with your business tomorrow." },
  { title: "Respect for your goals", text: "Recommendations based on what serves your business, even when that means a smaller or simpler solution." },
];

export const values = [
  { title: "Integrity", text: "Honest advice, realistic promises and work we stand behind." },
  { title: "Quality", text: "Attention to detail in code, design and communication." },
  { title: "Innovation", text: "Modern tools and fresh thinking applied where they add real value." },
  { title: "Transparency", text: "Clear scope, clear pricing, clear progress." },
  { title: "Creativity", text: "Solutions that are useful and distinctive, not generic." },
  { title: "Continuous improvement", text: "Always learning, refining and raising the standard." },
];

/**
 * Testimonials — add only genuine, permission-granted testimonials.
 * While this list is empty, the home page shows "Our Commitment" instead.
 */
export const testimonials: { quote: string; name: string; role: string; company?: string }[] = [];
