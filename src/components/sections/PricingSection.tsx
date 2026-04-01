import { pricingPlans } from "@/data/siteData";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => (
  <section id="pricing" className="section-padding bg-muted/40">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">Pricing</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Plans that <span className="text-primary">scale with you</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transparent pricing, no hidden fees. Start small and scale as your AI systems grow.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pricingPlans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-8 flex flex-col ${
              plan.highlighted
                ? "bg-primary text-primary-foreground border-2 border-primary shadow-lg"
                : "bg-card border border-border"
            }`}
          >
            {plan.highlighted && (
              <span className="text-xs font-semibold uppercase tracking-wide mb-2 text-primary-foreground/80">
                Most Popular
              </span>
            )}
            <h3 className={`text-xl font-semibold mb-1 ${plan.highlighted ? "text-primary-foreground" : ""}`}>{plan.name}</h3>
            <p className={`text-sm mb-5 ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.description}</p>
            <div className="mb-6">
              <span className={`text-4xl font-bold ${plan.highlighted ? "text-primary-foreground" : "text-heading"}`}>{plan.price}</span>
              <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check size={16} className={`mt-0.5 shrink-0 ${plan.highlighted ? "text-primary-foreground/80" : "text-primary"}`} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              variant={plan.highlighted ? "secondary" : "outline"}
              className="w-full"
            >
              {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
