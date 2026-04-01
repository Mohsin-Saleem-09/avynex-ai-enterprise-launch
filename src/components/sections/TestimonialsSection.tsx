import { testimonials } from "@/data/siteData";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TestimonialsSection = () => (
  <section className="section-padding bg-muted/40">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">Testimonials</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          What our <span className="text-primary">clients say</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <Quote size={24} className="text-primary/20 mb-4" />
            <p className="text-sm text-foreground leading-relaxed mb-6">{t.quote}</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-heading">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
