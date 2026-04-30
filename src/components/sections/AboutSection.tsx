import { motion } from "framer-motion";
import { Building2, Target, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Building2,
    title: "Built for Real Businesses",
    description:
      "We work with clinics, restaurants, agencies, and service companies to solve operational challenges with AI.",
  },
  {
    icon: Target,
    title: "Practical, Not Experimental",
    description:
      "Every system we deploy targets a measurable outcome — reduced workload, faster response, more bookings.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable & Production-Ready",
    description:
      "Our systems are designed to run in production with monitoring, documentation, and ongoing support.",
  },
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-muted/30">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center mb-14"
      >
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">
          About Avynex AI
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          A technology company building{" "}
          <span className="text-primary">practical AI systems</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Avynex AI is a technology company that builds AI-powered automation
          systems for businesses. We help companies improve customer
          communication, automate workflows, and reduce operational workload
          using practical and reliable AI solutions.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          We focus on real-world business problems, not experimental tools.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
              <p.icon size={22} />
            </div>
            <h3 className="font-semibold text-heading mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {p.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
