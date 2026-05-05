import {
  Phone,
  MessageSquare,
  HeartPulse,
  Cog,
  Shield,
  Clock,
  Languages,
  Server,
  CheckCircle,
  MapPin,
  Users,
} from "lucide-react";

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export const trustStats = [
  {
    value: "Based in Islamabad, Pakistan",
    label: "Registered presence at NSTP NUST with in-person contact options.",
    icon: MapPin,
  },
  {
    value: "Serving real businesses",
    label: "Clinics, hospitality, agencies, and service companies—not demos for social feeds.",
    icon: Users,
  },
  {
    value: "Reliable AI systems",
    label: "Design for uptime, clear fallbacks, and human escalation when automation should stop.",
    icon: Shield,
  },
  {
    value: "Production-ready solutions",
    label: "Deployed workflows you can run daily, with monitoring and documented change paths.",
    icon: Server,
  },
];

export const services = [
  {
    icon: Phone,
    title: "AI Voice Agents",
    description:
      "Answer calls, book appointments, and handle common questions—so your front desk is not the bottleneck.",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI & WhatsApp",
    description:
      "Respond on your website and WhatsApp Business with trained, on-brand answers and structured hand-offs.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare AI",
    description:
      "Patient-facing flows for intake, scheduling, and reminders, aligned with how your clinic operates.",
  },
  {
    icon: Cog,
    title: "Automation Systems",
    description:
      "Connect CRM, calendars, spreadsheets, and notifications so repeat work runs on a clear schedule.",
  },
];

export const whyFeatures = [
  { icon: Clock, title: "Responsive systems", description: "Built for the response times your customers expect on chat and voice" },
  { icon: Languages, title: "Multilingual support", description: "Urdu, English, and additional languages where your audience needs them" },
  { icon: Server, title: "Production-focused delivery", description: "Hosting, logging, and access control treated as part of the product" },
  { icon: CheckCircle, title: "Clear acceptance criteria", description: "Test cases and sign-off before we call a milestone done" },
];

export const whyBullets = [
  "Voice, chat, and WhatsApp automation in one engagement model",
  "Workflows mapped to how your team already works",
  "Documentation and training for staff who operate the system",
  "Human escalation paths where automation should not guess",
  "Incremental rollout options for higher-risk use cases",
  "Support retainers available after go-live",
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery & strategy",
    description:
      "We map your channels, volumes, and compliance constraints, then agree on scope, languages, and integrations.",
  },
  {
    step: "02",
    title: "Build & integrate",
    description:
      "We implement assistants and automations against that scope, with staging environments and test transcripts.",
  },
  {
    step: "03",
    title: "Launch & operate",
    description:
      "We deploy to production, train your team, and stay on retainer for tuning as traffic and offers change.",
  },
];

export const projects = [
  {
    category: "Voice",
    title: "Inbound call handling",
    description:
      "Example engagement: qualify intent, capture details, and create calendar holds or tickets in your stack.",
    tags: ["Telephony", "Speech", "CRM hooks"],
  },
  {
    category: "Healthcare",
    title: "Clinic scheduling assistant",
    description:
      "Example engagement: collect reason for visit, propose slots, send confirmations, and remind patients before appointments.",
    tags: ["WhatsApp", "SMS", "Calendar"],
  },
  {
    category: "Messaging",
    title: "WhatsApp Business routing",
    description:
      "Example engagement: structured menus, agent takeover, and after-hours messaging with audit-friendly logs.",
    tags: ["WhatsApp Cloud API", "Queues"],
  },
  {
    category: "Automation",
    title: "Operations connectors",
    description:
      "Example engagement: sync leads, notify staff channels, and nightly reporting without manual copy-paste.",
    tags: ["Webhooks", "Sheets", "Email"],
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

export const footerServices = [
  "AI Voice Agents",
  "Conversational AI",
  "Healthcare AI",
  "Automation",
];

export const footerQuickLinks = [
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
  { label: "Privacy Policy", href: "/privacy" },
];
