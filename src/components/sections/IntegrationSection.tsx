import { motion } from "framer-motion";
import { Globe, MessageCircle, BookOpen, CalendarDays, Workflow, Brain } from "lucide-react";

const nodes = [
  { label: "Website", icon: Globe, angle: 0 },
  { label: "WhatsApp", icon: MessageCircle, angle: 72 },
  { label: "CRM", icon: BookOpen, angle: 144 },
  { label: "Calendar", icon: CalendarDays, angle: 216 },
  { label: "Workflows", icon: Workflow, angle: 288 },
];

const IntegrationSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">Ecosystem</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          One AI brain, <span className="text-gradient">connected everywhere</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Avynex AI plugs into your existing stack — website, WhatsApp, CRM,
          calendar, and internal tools — as a single intelligent layer.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Network visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square max-w-md mx-auto w-full"
        >
          {/* Center node */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary">
              <Brain size={32} className="text-primary" />
            </div>
          </div>

          {/* Orbiting nodes */}
          {nodes.map((node, i) => {
            const radius = 42; // % from center
            const rad = (node.angle * Math.PI) / 180;
            const x = 50 + radius * Math.cos(rad);
            const y = 50 + radius * Math.sin(rad);
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="absolute glass rounded-xl p-3 flex flex-col items-center gap-1 w-20"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
              >
                <node.icon size={20} className="text-primary" />
                <span className="text-[10px] text-muted-foreground font-medium">{node.label}</span>
              </motion.div>
            );
          })}

          {/* Connection lines via SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
            {nodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = 50 + 42 * Math.cos(rad);
              const y = 50 + 42 * Math.sin(rad);
              return (
                <line
                  key={node.label}
                  x1="50" y1="50" x2={x} y2={y}
                  stroke="hsl(217 91% 60% / 0.15)"
                  strokeWidth="0.3"
                  strokeDasharray="1,1"
                />
              );
            })}
          </svg>
        </motion.div>

        {/* Scheduling preview card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-1">Unified Workflow Preview</h3>
          <p className="text-sm text-muted-foreground mb-6">
            See how a single AI interaction flows across your entire business.
          </p>
          <div className="space-y-4">
            {[
              { time: "9:00 AM", event: "Incoming call → AI qualifies lead", status: "Completed" },
              { time: "9:01 AM", event: "WhatsApp confirmation sent", status: "Completed" },
              { time: "9:02 AM", event: "CRM record created + calendar booked", status: "Completed" },
              { time: "9:15 AM", event: "Follow-up campaign triggered", status: "Pending" },
            ].map((item) => (
              <div key={item.time} className="flex items-center gap-4 bg-muted/30 rounded-lg p-3">
                <span className="text-xs text-muted-foreground w-16 shrink-0">{item.time}</span>
                <span className="text-sm text-foreground flex-1">{item.event}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    item.status === "Completed"
                      ? "bg-accent/20 text-accent"
                      : "bg-secondary/20 text-secondary"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default IntegrationSection;
