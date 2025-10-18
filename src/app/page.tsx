import { ProductsPageClient } from "./ProductsPageClient";
import { fetchCatalogData } from "@/lib/catalog/catalogRepository";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const catalog = await fetchCatalogData();

  return (
    <ProductsPageClient
      initialProducts={catalog.products}
      categories={catalog.categories}
      labels={catalog.labels}
    />
  );
}
