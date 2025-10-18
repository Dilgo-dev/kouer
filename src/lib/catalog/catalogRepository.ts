import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import type { Database } from "@/lib/supabase/types";
import { FILTER_LABEL_OPTIONS } from "@/data/filterLabels";
import { generateProducts, MOCK_CATEGORIES } from "@/data/mockProducts";
import type {
  Category,
  FilterLabelOption,
  Label,
  Product,
} from "@/types/product";
import { LabelType } from "@/types/product";

type ProductRow = Database["public"]["Tables"]["products"]["Row"] & {
  category: Database["public"]["Tables"]["categories"]["Row"] | null;
  product_labels: Array<{
    label: Database["public"]["Tables"]["labels"]["Row"] | null;
  }> | null;
};

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
type LabelRow = Database["public"]["Tables"]["labels"]["Row"];

export interface CatalogData {
  products: Product[];
  categories: Category[];
  labels: FilterLabelOption[];
  isFallback: boolean;
}

const LABEL_TYPE_VALUES = new Set<string>(Object.values(LabelType));
const FALLBACK_PRODUCTS_COUNT = 150;

export async function fetchCatalogData(): Promise<CatalogData> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return buildFallbackData();
  }

  const [productsResult, categoriesResult, labelsResult] = await Promise.all([
    supabase
      .from("products")
      .select(
        `
        id,
        name,
        image_url,
        price,
        category_slug,
        is_bio,
        is_label_rouge,
        rating,
        created_at,
        category:categories!products_category_slug_fkey(
          slug,
          name,
          display_name
        ),
        product_labels(
          label:labels!product_labels_label_slug_fkey(
            slug,
            name,
            display_name,
            type
          )
        )
      `
      )
      .returns<ProductRow[]>(),
    supabase.from("categories").select("id, slug, name, display_name"),
    supabase.from("labels").select("id, slug, name, display_name, type"),
  ]);

  if (
    productsResult.error ||
    categoriesResult.error ||
    labelsResult.error ||
    !productsResult.data
  ) {
    return buildFallbackData();
  }

  const products = productsResult.data
    .map(mapProductRow)
    .filter((product): product is Product => Boolean(product));

  const categories = buildCategories(categoriesResult.data ?? [], products);
  const labels = buildLabelOptions(labelsResult.data ?? [], products);

  return {
    products,
    categories,
    labels,
    isFallback: false,
  };
}

function buildFallbackData(): CatalogData {
  return {
    products: generateProducts(FALLBACK_PRODUCTS_COUNT),
    categories: MOCK_CATEGORIES,
    labels: FILTER_LABEL_OPTIONS,
    isFallback: true,
  };
}

function mapProductRow(row: ProductRow): Product | null {
  if (!row || !row.id) {
    return null;
  }

  const categorySlug = row.category?.slug ?? row.category_slug ?? null;
  if (!categorySlug) {
    return null;
  }

  const labels = (row.product_labels ?? [])
    .map((relation) => relation.label)
    .filter((label): label is LabelRow => Boolean(label))
    .map(mapLabelRowToProductLabel)
    .filter((label): label is Label => Boolean(label));

  return {
    id: row.id,
    name: row.name,
    imageUrl: row.image_url,
    price: row.price,
    labels,
    category: categorySlug,
    isBio: row.is_bio ?? undefined,
    isLabelRouge: row.is_label_rouge ?? undefined,
    rating: row.rating ?? undefined,
    createdAt: row.created_at ?? undefined,
  };
}

function mapLabelRowToProductLabel(row: LabelRow): Label | null {
  if (!row.slug) {
    return null;
  }

  const labelType = parseLabelType(row.type);
  if (!labelType) {
    return null;
  }

  return {
    id: row.slug,
    name: row.display_name ?? row.name,
    type: labelType,
  };
}

function parseLabelType(value: string | null): LabelType | null {
  if (!value) {
    return null;
  }

  return LABEL_TYPE_VALUES.has(value) ? (value as LabelType) : null;
}

function buildCategories(
  categoryRows: CategoryRow[],
  products: Product[]
): Category[] {
  const counts = new Map<string, number>();
  for (const product of products) {
    if (!product.category) {
      continue;
    }

    counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
  }

  const categories = categoryRows.map((row) => ({
    id: row.slug,
    name: row.display_name ?? row.name,
    count: counts.get(row.slug) ?? 0,
  }));

  for (const [slug, count] of counts.entries()) {
    if (!categories.some((category) => category.id === slug)) {
      categories.push({
        id: slug,
        name: slug,
        count,
      });
    }
  }

  return categories.sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

function buildLabelOptions(
  labelRows: LabelRow[],
  products: Product[]
): FilterLabelOption[] {
  const counts = new Map<string, number>();

  for (const product of products) {
    for (const label of product.labels) {
      counts.set(label.id, (counts.get(label.id) ?? 0) + 1);
    }
    if (product.isBio) {
      counts.set("bio", (counts.get("bio") ?? 0) + 1);
    }
    if (product.isLabelRouge) {
      counts.set("label-rouge", (counts.get("label-rouge") ?? 0) + 1);
    }
  }

  const labelOptions = labelRows
    .map((row) => ({
      id: row.slug,
      name: row.display_name ?? row.name,
      count: counts.get(row.slug) ?? 0,
    }))
    .filter((option) => Boolean(option.id && option.name));

  appendFlagLabelOption(labelOptions, counts, "bio", "BIO");
  appendFlagLabelOption(labelOptions, counts, "label-rouge", "Label Rouge");

  labelOptions.sort((a, b) => a.name.localeCompare(b.name, "fr"));

  return labelOptions;
}

function appendFlagLabelOption(
  options: FilterLabelOption[],
  counts: Map<string, number>,
  id: string,
  name: string
) {
  if (options.some((option) => option.id === id)) {
    return;
  }

  options.push({
    id,
    name,
    count: counts.get(id) ?? 0,
  });
}
