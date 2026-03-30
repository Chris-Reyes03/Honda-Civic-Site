import { PageWrapper } from "./components/PageWrapper";
import { Screen } from "./components/Screen";
import { Header } from "./components/Header";
import { SidebarSection } from "./components/SidebarSection";
import { UtilityBar } from "./components/UtilityBar";
import { ProductCatalog } from "./components/ProductCatalog";

import { products } from "./Data/products"; // Adjust path as needed

export function App() {
  return (
    <PageWrapper>
      <Screen>
        <Header />
        <Main />
      </Screen>
    </PageWrapper>
  );
}

function Main() {
  return (
    <main className="mx-auto grid max-w-325 grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[250px_1fr] lg:px-8">
      <SidebarSection />

      <section>
        <UtilityBar />
        <ProductCatalog products={products} />
      </section>
    </main>
  );
}
