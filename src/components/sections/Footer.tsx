import { footerServices, footerCompany } from "@/data/siteData";

const Footer = () => (
  <footer className="border-t border-border py-16 px-4">
    <div className="container mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <span className="text-xl font-heading font-bold text-heading">
          Avynex <span className="text-primary">AI</span>
        </span>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          Production-ready AI systems that automate operations, improve customer
          communication, and scale your business.
        </p>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4 text-heading">Services</h4>
        <ul className="space-y-2">
          {footerServices.map((s) => (
            <li key={s}>
              <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {s}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4 text-heading">Company</h4>
        <ul className="space-y-2">
          {footerCompany.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4 text-heading">Contact</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>info@avynexai.com</li>
          <li>+92 304 9992471</li>
          <li>NSTP NUST, Islamabad, Pakistan</li>
        </ul>
      </div>
    </div>

    <div className="container mx-auto mt-12 pt-6 border-t border-border">
      <p className="text-xs text-muted-foreground text-center">
        © {new Date().getFullYear()} Avynex AI. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
