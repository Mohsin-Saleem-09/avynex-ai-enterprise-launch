import { trustStats } from "@/data/siteData";
import { motion } from "framer-motion";

const TrustSection = () => (
  <section className="section-padding bg-muted/40" aria-labelledby="trust-heading">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 id="trust-heading" className="text-3xl sm:text-4xl font-bold mb-4 text-heading">
          A local team, clear services, direct contact
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Avynex AI is registered and based in Islamabad. You can reach us by email, phone, or
          WhatsApp, and we document what we build so your team can rely on it day to day.
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
            <p className="text-base sm:text-lg font-semibold text-heading mb-1 leading-snug">{stat.value}</p>
            <p className="text-sm text-muted-foreground leading-snug">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
