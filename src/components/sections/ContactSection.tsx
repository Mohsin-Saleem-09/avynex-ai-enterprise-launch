import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  { icon: Mail, label: "Email", value: "info@avynexai.com" },
  { icon: Phone, label: "Phone / WhatsApp", value: "+92 300 0000000" },
  { icon: MapPin, label: "Location", value: "Islamabad, Pakistan" },
];

const ContactSection = () => (
  <section id="contact" className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">Get in Touch</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Let's build something <span className="text-primary">intelligent</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-muted-foreground leading-relaxed">
            Ready to automate your business with production-grade AI?
            Reach out and let's discuss your project.
          </p>
          {contactInfo.map((c) => (
            <div key={c.label} className="flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <c.icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className="text-sm font-medium text-foreground">{c.value}</p>
              </div>
            </div>
          ))}
          <p className="text-sm text-muted-foreground pt-2">
            We typically respond within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 space-y-5 shadow-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input placeholder="Full Name" />
          <Input type="email" placeholder="Email" />
          <Input placeholder="Phone" />
          <Textarea placeholder="Tell us about your project..." rows={5} className="resize-none" />
          <Button className="w-full">Send Message</Button>
        </motion.form>
      </div>
    </div>
  </section>
);

export default ContactSection;
