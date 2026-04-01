import {
  Phone,
  MessageSquare,
  HeartPulse,
  Cog,
  Zap,
  Shield,
  Clock,
  Languages,
  Server,
  CheckCircle,
} from "lucide-react";

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export const trustStats = [
  { value: "99.9%", label: "Uptime SLA", icon: Zap },
  { value: "12+", label: "Languages Supported", icon: Languages },
  { value: "50+", label: "Systems Deployed", icon: Server },
  { value: "6+", label: "Industries Served", icon: Shield },
];

export const services = [
  {
    icon: Phone,
    title: "AI Voice Agents",
    description:
      "Never miss a call. Automatically answer, book appointments, and handle customer inquiries 24/7 — without hiring extra staff.",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    description:
      "Respond instantly on website and WhatsApp, improving response time and customer experience while reducing manual workload.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare AI",
    description:
      "Automate patient interactions, appointment booking, and follow-ups for clinics and hospitals — reducing wait times and no-shows.",
  },
  {
    icon: Cog,
    title: "Automation Systems",
    description:
      "Connect your workflows, CRM, scheduling, and operations into one intelligent system that runs without constant oversight.",
  },
];

export const whyFeatures = [
  { icon: Clock, title: "Real-time Performance", description: "Sub-second response times across all channels" },
  { icon: Languages, title: "Multilingual Support", description: "12+ languages with native-quality output" },
  { icon: Server, title: "Production-grade Systems", description: "Enterprise-ready infrastructure, not experiments" },
  { icon: CheckCircle, title: "Reliable Delivery", description: "Tested, documented, deployed on schedule" },
];

export const whyBullets = [
  "Voice, chat, and WhatsApp AI systems",
  "Multilingual automation for global reach",
  "Business-focused solutions, not experimental tools",
  "Reliable, scalable architecture built to last",
  "Smart booking and scheduling flows",
  "Production-ready cloud deployment",
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description:
      "We understand your business, map your workflows, and define the AI use cases that will deliver the highest impact.",
  },
  {
    step: "02",
    title: "Build & Integrate",
    description:
      "Our team develops and connects AI into your existing workflows — CRM, calendar, phone systems, and more.",
  },
  {
    step: "03",
    title: "Launch & Scale",
    description:
      "We deploy to production, monitor performance, and continuously improve as your business grows.",
  },
];

export const projects = [
  {
    category: "Voice AI",
    title: "AI Calling Agent",
    description:
      "Handles customer calls and bookings automatically — qualifying leads, scheduling appointments, and following up without human intervention.",
    tags: ["Twilio", "OpenAI", "FastAPI", "WebSocket"],
  },
  {
    category: "Healthcare AI",
    title: "Healthcare AI Assistant",
    description:
      "Patient interaction and appointment system that handles intake, answers FAQs, and routes patients to the right provider in real time.",
    tags: ["LangChain", "React", "FHIR", "GPT-4"],
  },
  {
    category: "Voice AI",
    title: "Multilingual Voice Bot",
    description:
      "Handles multiple languages seamlessly for a global hospitality chain — managing reservations, inquiries, and upselling across regions.",
    tags: ["Deepgram", "ElevenLabs", "Python", "Redis"],
  },
  {
    category: "Automation",
    title: "Business Automation System",
    description:
      "End-to-end workflow automation connecting CRM, scheduling, and operations into one intelligent system that runs on autopilot.",
    tags: ["n8n", "PostgreSQL", "Flask", "AWS"],
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "$399",
    period: "/month",
    description: "Best for small businesses starting with automation.",
    features: [
      "Voice & WhatsApp AI assistant",
      "Website knowledge training",
      "Basic dashboard and logs",
      "Up to 1,000 conversations",
      "Core analytics",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$599",
    period: "/month",
    description: "Best for growing companies needing integrations and scaling.",
    features: [
      "Multi-source trained AI",
      "Up to 4,000 conversations",
      "Custom integrations",
      "Advanced reporting",
      "Priority onboarding",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large businesses with advanced needs.",
    features: [
      "Custom AI architecture",
      "Deep workflow automation",
      "Dedicated support",
      "Multi-team / multi-location setup",
      "Advanced security and scale",
    ],
    highlighted: false,
  },
];

export const testimonials = [
  {
    name: "Dr. Sarah Ahmed",
    role: "Chief Medical Officer, MedVista Clinics",
    initials: "SA",
    quote:
      "Since implementing Avynex AI, our front desk handles 40% fewer calls while patient satisfaction has actually gone up. The system manages Urdu and English seamlessly — it's been a game changer for our operations.",
  },
  {
    name: "Rahul Kapoor",
    role: "Operations Director, TasteHub Restaurants",
    initials: "RK",
    quote:
      "Our reservation system runs on autopilot now. The voice agent handles 200+ calls daily and the WhatsApp bot manages orders without a single missed message. We saved two full-time hires.",
  },
  {
    name: "Fatima Zaidi",
    role: "CEO, ScalePoint Solutions",
    initials: "FZ",
    quote:
      "Avynex delivered a production-grade system on time, with proper documentation and support. It felt like working with an in-house AI team, not an outside vendor. Our clients have noticed the difference.",
  },
];

export const footerServices = [
  "AI Voice Agents",
  "Conversational AI",
  "Healthcare AI",
  "Automation",
];

export const footerCompany = [
  { label: "About", href: "#" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];
