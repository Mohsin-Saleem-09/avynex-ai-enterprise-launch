import { trustStats } from "@/data/siteData";
import { motion } from "framer-motion";

const TrustSection = () => (
  <section className="section-padding bg-muted/40">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          A real business you can <span className="text-primary">verify and contact</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Avynex AI operates as a registered technology company with a physical address,
          direct contact channels, and real customer support — not an anonymous landing page.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-md transition-shadow"
          >
            <stat.icon size={28} className="mx-auto mb-3 text-primary" />
            <p className="text-3xl font-bold text-heading mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
