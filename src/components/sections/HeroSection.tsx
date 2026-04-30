import { ArrowRight, Play, PhoneCall, MessageSquare, Users, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const metrics = [
  { label: "AI Calls Handled", value: "14,209", change: "+28.5%", icon: PhoneCall },
  { label: "Reservations Booked", value: "2,847", change: "+12.3%", icon: CalendarCheck },
  { label: "Messages Processed", value: "8,432", change: "+19.1%", icon: MessageSquare },
  { label: "Customers Managed", value: "1,205", change: "+8.7%", icon: Users },
];

const quickActions = ["New Campaign", "Train Agent", "View Logs"];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center section-padding pt-28 overflow-hidden">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
          AI-Powered Business Systems
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          AI automation systems for{" "}
          <span className="text-primary">real businesses.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
          Avynex AI builds voice agents, chatbots, and workflow automation that
          help businesses manage customer communication and daily operations more efficiently.
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

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative"
      >
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
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

          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-muted/60 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <m.icon size={18} className="text-primary" />
                  <span className="text-xs font-medium text-green-600">{m.change}</span>
                </div>
                <p className="text-2xl font-bold text-heading">{m.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-muted/40 rounded-xl p-4 flex items-end gap-1 h-24">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-primary/30"
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
