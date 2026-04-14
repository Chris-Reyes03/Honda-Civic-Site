import { CartSidebar } from "../components/CartSidebar";
import { Header } from "../components/Header"
import { PageWrapper } from "../components/PageWrapper"
import { ProductCatalog } from "../components/ProductCatalog";
import { Screen } from "../components/Screen"
import { SidebarSection } from "../components/SidebarSection";
import { UtilityBar } from "../components/UtilityBar";
import { products } from "../Data/products";


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

export const ProductPage = () => {
  return (
    <PageWrapper>
      <Screen>
        <Header />
        <Main />
      
        <CartSidebar />
      </Screen>
    </PageWrapper>
  )
}