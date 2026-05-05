import { useEffect } from "react";

const Deauthorize = () => {
  useEffect(() => {
    document.title = "App Disconnected | Avynex AI";
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <section className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-heading mb-3">App Disconnected</h1>
        <p className="text-muted-foreground">
          Your account has been successfully deauthorized.
        </p>
      </section>
    </main>
  );
};

export default Deauthorize;
