import { Footer } from "./Footer";

export function PageWrapper({ children }) {
  return (
    <div className="bg-zinc-950 text-zinc-100">
      {children}
      <Footer />
    </div>
  );
}
