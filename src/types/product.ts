export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  labels: Label[];
  category: string;
  isBio?: boolean;
  isLabelRouge?: boolean;
}

export interface Label {
  id: string;
  name: string;
  type: LabelType;
}

export enum LabelType {
  BIO = 'bio',
  LABEL_ROUGE = 'label_rouge',
  AOC = 'aoc',
  PRODUIT_CERTIFIE = 'produit_certifie',
  STG = 'stg',
  IGP = 'igp',
  VBF = 'viande_bovine_francaise',
  PECHE_DURABLE = 'peche_durable',
  COLLEGE_CULINAIRE = 'college_culinaire',
  SEASONAL = 'seasonal',
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface FilterState {
  priceRange?: { min: number; max: number };
  selectedLabels: string[];
  selectedCategories: string[];
}

export interface SortOption {
  id: string;
  label: string;
  value: 'relevance' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
}
