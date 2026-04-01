import { processSteps } from "@/data/siteData";
import { motion } from "framer-motion";

const ProcessSection = () => (
  <section id="process" className="section-padding bg-muted/40">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">Our Process</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Effortless integration in <span className="text-primary">3 simple steps</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {processSteps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card border border-border rounded-2xl p-8 relative group hover:shadow-md transition-shadow"
          >
            <span className="text-5xl font-bold text-primary/10 absolute top-6 right-6 group-hover:text-primary/20 transition-colors">
              {s.step}
            </span>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
