import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "info@avynexai.com",
    href: "mailto:info@avynexai.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 304 9992471",
    href: "tel:+923049992471",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "NSTP NUST, Islamabad, Pakistan",
    href: "https://maps.google.com/?q=NSTP+NUST+Islamabad+Pakistan",
  },
];

const ContactSection = () => (
  <section id="contact" className="section-padding bg-muted/20 border-y border-border">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">Contact</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-heading">Get in touch with Avynex AI</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Use the details below to reach our team. Whether you need a chatbot, voice automation, or a
          wider workflow project, we reply to serious inquiries personally.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-card p-8 space-y-6"
        >
          <h3 className="text-lg font-semibold text-heading">Contact details</h3>
          <ul className="space-y-6">
            {contactItems.map((c) => (
              <li key={c.label} className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                  <c.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {c.label}
                  </p>
                  <a
                    href={c.href}
                    className="text-base font-medium text-foreground hover:text-primary transition-colors mt-1 inline-block break-all"
                    target={c.label === "Location" ? "_blank" : undefined}
                    rel={c.label === "Location" ? "noopener noreferrer" : undefined}
                  >
                    {c.value}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm text-foreground font-medium pt-2 border-t border-border">
            We typically respond within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 space-y-5 shadow-sm"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Contact form"
        >
          <h3 className="text-lg font-semibold text-heading">Send a message</h3>
          <p className="text-sm text-muted-foreground -mt-2">
            This form is a starting point; we will follow up by email or phone.
          </p>
          <Input name="name" type="text" placeholder="Full name" autoComplete="name" />
          <Input name="email" type="email" placeholder="Email" autoComplete="email" />
          <Input name="phone" type="tel" placeholder="Phone" autoComplete="tel" />
          <Textarea name="message" placeholder="Tell us about your project..." rows={5} className="resize-none" />
          <Button type="submit" className="w-full">
            Send message
          </Button>
        </motion.form>
      </div>
    </div>
  </section>
);

export default ContactSection;
