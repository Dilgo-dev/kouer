export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          slug: string;
          name: string;
          display_name: string | null;
          created_at: string | null;
        };
      };
      labels: {
        Row: {
          slug: string;
          name: string;
          display_name: string | null;
          type: string;
          created_at: string | null;
        };
      };
      product_labels: {
        Row: {
          product_id: string;
          label_slug: string;
          created_at: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          image_url: string;
          price: number;
          category_slug: string;
          is_bio: boolean | null;
          is_label_rouge: boolean | null;
          rating: number | null;
          created_at: string | null;
        };
      };
    };
  };
}
