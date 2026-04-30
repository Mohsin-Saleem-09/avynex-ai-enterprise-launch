import { motion } from "framer-motion";
import { Building2, Target, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Building2,
    title: "Based in Islamabad, Pakistan",
    description:
      "A registered technology company operating from NSTP NUST, Islamabad, with a clear business address and contact.",
  },
  {
    icon: Target,
    title: "Practical Business Focus",
    description:
      "We build automation systems that solve real operational problems for clinics, restaurants, agencies, and service companies.",
  },
  {
    icon: ShieldCheck,
    title: "Production-Ready Systems",
    description:
      "Our solutions are built for daily business use with proper documentation, monitoring, and ongoing customer support.",
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
          A technology company based in{" "}
          <span className="text-primary">Islamabad, Pakistan</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Avynex AI is a technology company based in Islamabad, Pakistan. We build
          AI-powered automation systems for businesses to improve customer
          communication and operational efficiency.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          We work with companies across healthcare, hospitality, and professional
          services to deliver practical, reliable solutions that fit into their
          existing workflows.
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
