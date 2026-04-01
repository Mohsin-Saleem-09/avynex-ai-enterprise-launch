import { services } from "@/data/siteData";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ServicesSection = () => (
  <section id="services" className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">What We Build</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Intelligent systems for every channel
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          From voice calls to WhatsApp, from patient intake to lead qualification —
          we build AI that works where your business lives.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-8 group hover:glow-sm transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <s.icon size={24} />
              </div>
              <ArrowUpRight size={18} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
