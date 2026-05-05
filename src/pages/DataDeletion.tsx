import { useEffect } from "react";

const DataDeletion = () => {
  useEffect(() => {
    document.title = "Data Deletion Request | Avynex AI";
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <section className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-heading mb-3">Data Deletion Request</h1>
        <p className="text-muted-foreground">
          Your data deletion request has been received.
        </p>
        <p className="text-sm text-foreground mt-4">
          Email:{" "}
          <a className="text-primary hover:underline" href="mailto:info@avynexai.com">
            info@avynexai.com
          </a>{" "}
          for full data removal.
        </p>
      </section>
    </main>
  );
};

export default DataDeletion;
