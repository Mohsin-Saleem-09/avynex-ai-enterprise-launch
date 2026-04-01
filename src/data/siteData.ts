import {
  Phone,
  MessageSquare,
  HeartPulse,
  Cog,
  Globe,
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
      "Production-ready voice assistants that handle inbound and outbound calls, qualify leads, book appointments, and deliver human-like conversations at scale.",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI Systems",
    description:
      "Intelligent chatbots and messaging agents trained on your business data — deployed across web, WhatsApp, and internal workflows.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare AI",
    description:
      "HIPAA-conscious AI systems for patient intake, symptom triage, appointment scheduling, and clinical decision support.",
  },
  {
    icon: Cog,
    title: "Automation & Integrations",
    description:
      "End-to-end workflow automation connecting your CRM, calendar, EHR, and business tools into one intelligent operating layer.",
  },
];

export const integrationNodes = [
  { label: "Website", x: 10, y: 20 },
  { label: "WhatsApp", x: 80, y: 15 },
  { label: "CRM", x: 85, y: 70 },
  { label: "Calendar", x: 12, y: 75 },
  { label: "Workflows", x: 50, y: 90 },
];

export const whyFeatures = [
  { icon: Clock, title: "Real-time Performance", description: "Sub-second response times across all channels" },
  { icon: Languages, title: "Multilingual Support", description: "12+ languages with native-quality output" },
  { icon: Server, title: "Production Engineering", description: "FastAPI backends, cloud-ready infrastructure" },
  { icon: CheckCircle, title: "Reliable Delivery", description: "Tested, documented, deployed on schedule" },
];

export const whyBullets = [
  "Voice, chat, WhatsApp, and web assistants",
  "Domain-specific RAG systems",
  "Multilingual AI systems",
  "FastAPI / Flask production backends",
  "Booking and scheduling flows",
  "Scalable cloud-ready deployment",
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description:
      "We map your workflows, identify automation opportunities, and define the AI architecture that fits your business goals.",
  },
  {
    step: "02",
    title: "Build & Integrate",
    description:
      "Our team develops, trains, and integrates your AI systems with your existing tools — CRM, calendar, EHR, and more.",
  },
  {
    step: "03",
    title: "Launch & Scale",
    description:
      "We deploy to production, monitor performance, and continuously optimize as your usage and business grow.",
  },
];

export const projects = [
  {
    category: "Voice AI",
    title: "Real-Time AI Calling Agent",
    description:
      "Automated outbound calling system handling lead qualification, appointment booking, and follow-ups with natural conversation flow.",
    tags: ["Twilio", "OpenAI", "FastAPI", "WebSocket"],
  },
  {
    category: "Healthcare AI",
    title: "Healthcare Conversational Avatar",
    description:
      "Interactive AI avatar for patient engagement — handles symptom intake, FAQ resolution, and provider routing in real time.",
    tags: ["LangChain", "React", "FHIR", "GPT-4"],
  },
  {
    category: "Voice AI",
    title: "Multilingual Voice Bot",
    description:
      "Voice-first AI assistant supporting 8+ languages for a global hospitality chain — handles reservations, inquiries, and upselling.",
    tags: ["Deepgram", "ElevenLabs", "Python", "Redis"],
  },
  {
    category: "Computer Vision",
    title: "Medical Image Diagnosis System",
    description:
      "AI-powered diagnostic tool analyzing medical imagery for early detection, integrated into clinical workflows with DICOM support.",
    tags: ["PyTorch", "DICOM", "Flask", "AWS"],
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "$399",
    period: "/month",
    description: "For businesses getting started with AI automation.",
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
    description: "For scaling teams that need deeper integrations.",
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
    description: "For organizations with complex, multi-team needs.",
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
      "Avynex AI transformed our patient intake process. Call volumes dropped 40% while satisfaction scores went up. The system handles Urdu and English seamlessly.",
  },
  {
    name: "Rahul Kapoor",
    role: "Operations Director, TasteHub Restaurants",
    initials: "RK",
    quote:
      "Our reservation system runs on autopilot now. The voice agent handles 200+ calls daily, and the WhatsApp bot manages orders without a single missed message.",
  },
  {
    name: "Fatima Zaidi",
    role: "CEO, ScalePoint Solutions",
    initials: "FZ",
    quote:
      "Working with Avynex felt like having an in-house AI team. They delivered a production-grade system on time, with documentation and support that enterprise clients expect.",
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
