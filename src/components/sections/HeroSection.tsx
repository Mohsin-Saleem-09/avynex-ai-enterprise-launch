import { ArrowRight, Play, Bot, Phone, MessageCircle, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const capabilities = [
  {
    title: "AI chatbots",
    description: "Website and messaging assistants trained on your business.",
    icon: Bot,
  },
  {
    title: "Voice agents",
    description: "Call handling, bookings, and FAQs without extra headcount.",
    icon: Phone,
  },
  {
    title: "WhatsApp automation",
    description: "Business WhatsApp flows for leads and customer support.",
    icon: MessageCircle,
  },
  {
    title: "Workflow automation",
    description: "Connect scheduling, CRM, and day-to-day operations.",
    icon: Workflow,
  },
];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center section-padding pt-28 overflow-hidden">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-base font-medium text-foreground leading-relaxed">
          Avynex AI is an AI automation company based in Islamabad, Pakistan.
        </p>
        <p className="text-base text-muted-foreground max-w-xl mt-4 leading-relaxed">
          We build AI-powered systems that help businesses automate customer communication, manage
          operations, and improve efficiency.
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mt-8 mb-6 text-heading">
          AI Automation Solutions for Businesses
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
          AI chatbots, voice agents, WhatsApp automation, and custom automation—scoped, built, and
          supported by our team in Islamabad.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="gap-2" asChild>
            <a href="/#contact">
              Start Your Project <ArrowRight size={16} />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href="/#services">
              <Play size={16} /> Explore Services
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative"
      >
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-heading mb-1">What we build</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Practical systems for customer-facing teams and back-office work.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-muted/60 rounded-xl p-4">
                <c.icon size={20} className="text-primary mb-2" />
                <h3 className="text-sm font-semibold text-heading">{c.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
