import { projects } from "@/data/siteData";
import { motion } from "framer-motion";

const ProjectsSection = () => (
  <section id="projects" className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">Use Cases</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Real systems, <span className="text-primary">real results</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how businesses use Avynex AI to automate operations,
          improve customer experience, and scale without adding headcount.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-8 group hover:shadow-md transition-shadow"
          >
            <span className="text-xs text-primary font-medium uppercase tracking-wide">{p.category}</span>
            <h3 className="text-xl font-semibold mt-2 mb-3">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
