import { Link } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const PrivacyPolicy = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <section className="section-padding pt-32">
      <div className="container mx-auto max-w-3xl">
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">
          Legal
        </p>
        <h1 className="text-4xl font-bold text-heading mb-4">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose prose-slate max-w-none space-y-8 text-foreground">
          <section>
            <p className="text-muted-foreground leading-relaxed">
              Avynex AI ("we", "us", "our") respects your privacy and is committed to protecting
              the personal information you share with us. This Privacy Policy explains what
              information we collect, how we use it, and the choices you have regarding your data
              when you visit our website or interact with our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-heading mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When you contact us through our website, request a demo, or communicate with us via
              WhatsApp, email, or phone, we may collect the following information:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name (if provided)</li>
              <li>Message content and project details you choose to share</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-heading mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use the information you provide solely for legitimate business purposes:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>To respond to your inquiries and provide requested information</li>
              <li>To schedule demos, consultations, and follow-up communication</li>
              <li>To deliver and support the AI services you have engaged us for</li>
              <li>To improve our services and customer experience</li>
              <li>To comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-heading mb-3">3. We Do Not Sell Your Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              Avynex AI does not sell, rent, or trade your personal information to third parties.
              Your data is used only by our team to communicate with you and deliver our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-heading mb-3">4. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may share your information only with trusted service providers (such as hosting,
              email, or communication platforms like WhatsApp Business) that help us operate our
              business. These providers are required to protect your information and use it only
              for the purpose of supporting our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-heading mb-3">5. Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction. While no method of transmission over the internet is fully secure, we
              continuously work to safeguard the data we hold.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-heading mb-3">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain personal information only for as long as necessary to fulfill the purposes
              outlined in this policy, comply with legal obligations, resolve disputes, and
              enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-heading mb-3">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-heading mb-3">8. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may use minimal cookies and similar technologies to ensure the site
              functions properly and to understand how visitors use the site. You can control
              cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-heading mb-3">9. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for
              the privacy practices of those sites and encourage you to review their privacy
              policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-heading mb-3">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-heading mb-3">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy concerns, data requests, or any questions about this policy, please
              contact us at:
            </p>
            <ul className="mt-3 space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Email:</strong> info@avynexai.com</li>
              <li><strong className="text-foreground">Phone:</strong> +92 304 9992471</li>
              <li><strong className="text-foreground">Address:</strong> NSTP NUST, Islamabad, Pakistan</li>
            </ul>
          </section>

          <div className="pt-6">
            <Link to="/" className="text-sm text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default PrivacyPolicy;
