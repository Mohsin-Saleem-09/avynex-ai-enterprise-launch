import { motion } from "framer-motion";
import { Building2, Target, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Building2,
    title: "Based in Islamabad, Pakistan",
    description:
      "We operate from NSTP NUST, Islamabad, with a clear business address and direct contact channels.",
  },
  {
    icon: Target,
    title: "Practical business focus",
    description:
      "We design automation around real tasks: customer questions, bookings, reminders, and hand-offs to your team.",
  },
  {
    icon: ShieldCheck,
    title: "Built for daily use",
    description:
      "Documentation, monitoring, and support are part of how we deliver—not an afterthought.",
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
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">About Avynex AI</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-heading">Who we are</h2>
        <p className="text-muted-foreground leading-relaxed text-base">
          Avynex AI is a technology company focused on building practical AI solutions for businesses.
          Our systems are designed to handle real-world business tasks such as customer support,
          appointment booking, and workflow automation.
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
            <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
