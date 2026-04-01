import { ArrowRight, Play, PhoneCall, MessageSquare, Users, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const metrics = [
  { label: "Total Reservations", value: "2,847", change: "+12.3%", icon: CalendarCheck },
  { label: "AI Calls Handled", value: "14,209", change: "+28.5%", icon: PhoneCall },
  { label: "WhatsApp Messages", value: "8,432", change: "+19.1%", icon: MessageSquare },
  { label: "Total Customers", value: "1,205", change: "+8.7%", icon: Users },
];

const quickActions = ["New Campaign", "Train Agent", "View Logs"];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center section-padding pt-28 overflow-hidden">
    {/* Background glow */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />

    <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
          AI-Powered Business Systems
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          AI agents that talk, think, and{" "}
          <span className="text-gradient">grow your business.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
          Avynex AI builds production-ready voice agents, conversational systems,
          healthcare AI, and automation workflows that transform how businesses
          operate and scale.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="gap-2">
            Start Your Project <ArrowRight size={16} />
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Play size={16} /> Explore Services
          </Button>
        </div>
      </motion.div>

      {/* Right — Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative"
      >
        <div className="glass rounded-2xl p-6 glow-sm">
          {/* Dashboard header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-heading">AI Operations Dashboard</h3>
              <p className="text-xs text-muted-foreground">Real-time performance overview</p>
            </div>
            <div className="flex gap-2">
              {quickActions.map((action) => (
                <span
                  key={action}
                  className="text-xs px-3 py-1.5 rounded-md bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {action}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-muted/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <m.icon size={18} className="text-primary" />
                  <span className="text-xs text-accent font-medium">{m.change}</span>
                </div>
                <p className="text-2xl font-bold text-heading">{m.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Mini chart placeholder */}
          <div className="mt-4 bg-muted/30 rounded-xl p-4 flex items-end gap-1 h-24">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-primary/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
