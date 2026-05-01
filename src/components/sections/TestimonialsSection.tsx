import { motion } from "framer-motion";
import { FileText, Headphones, MapPinned } from "lucide-react";

const commitments = [
  {
    icon: MapPinned,
    title: "Defined scope",
    body: "We agree on channels, languages, integrations, and hand-offs before development so expectations stay clear.",
  },
  {
    icon: FileText,
    title: "Documented delivery",
    body: "You receive what was built, how it runs, and how your team can operate it—not just a login link.",
  },
  {
    icon: Headphones,
    title: "Ongoing support",
    body: "After launch we stay available for fixes, tuning, and small changes as your volume and offers evolve.",
  },
];

const TestimonialsSection = () => (
  <section className="section-padding bg-muted/40" aria-labelledby="commitment-heading">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">How we work</p>
        <h2 id="commitment-heading" className="text-3xl sm:text-4xl font-bold mb-4 text-heading">
          What you can expect from a project with us
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          We do not publish anonymous success stories. Instead, here is how we structure client work
          so deployments stay maintainable.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {commitments.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <item.icon size={24} className="text-primary mb-4" aria-hidden />
            <h3 className="text-lg font-semibold text-heading mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
