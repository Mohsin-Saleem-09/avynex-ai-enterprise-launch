import { whyFeatures, whyBullets } from "@/data/siteData";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const WhySection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">Why Avynex AI</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          A premium AI partner for <span className="text-primary">serious businesses</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          This is not a basic chatbot agency or freelance service. Avynex AI builds
          real production-level systems designed for business operations — reliable,
          scalable, and built to deliver measurable results.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {whyBullets.map((b) => (
            <div key={b} className="flex items-start gap-3">
              <div className="mt-1 p-1 rounded-full bg-primary/10">
                <Check size={14} className="text-primary" />
              </div>
              <span className="text-foreground">{b}</span>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {whyFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow"
            >
              <f.icon size={22} className="text-primary mb-3" />
              <h4 className="font-semibold text-sm mb-1">{f.title}</h4>
              <p className="text-xs text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhySection;
