import { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    document.title = "Login Successful | Avynex AI";
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <section className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-heading mb-3">Login Successful</h1>
        <p className="text-muted-foreground">
          Authentication complete. You can close this window.
        </p>
      </section>
    </main>
  );
};

export default Callback;
