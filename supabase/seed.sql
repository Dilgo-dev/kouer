-- Seed dataset for the Supabase catalogue.
insert into public.categories (slug, name, display_name)
values
  ('fruits-legumes', 'Fruits & Légumes', 'Fruits & Légumes'),
  ('viandes-charcuteries', 'Viandes & Charcuteries', 'Viandes & Charcuteries'),
  ('poissons-fruits-mer', 'Poissons & Fruits de mer', 'Poissons & Fruits de mer'),
  ('produits-laitiers', 'Produits laitiers', 'Produits laitiers'),
  ('epicerie-salee', 'Épicerie salée', 'Épicerie salée'),
  ('epicerie-sucree', 'Épicerie sucrée', 'Épicerie sucrée'),
  ('produits-verts', 'Produits verts', 'Produits verts'),
  ('boissons', 'Boissons', 'Boissons')
on conflict (slug) do nothing;

insert into public.labels (slug, name, display_name, type)
values
  ('bio', 'BIO', 'BIO', 'bio'),
  ('label-rouge', 'Label Rouge', 'Label Rouge', 'label_rouge'),
  ('igp', 'IGP', 'IGP', 'igp'),
  ('aoc', 'AOP', 'Appellation d''origine protégée', 'aoc'),
  ('stg', 'STG', 'Spécialité traditionnelle garantie', 'stg'),
  ('seasonal', 'Produit de saison', 'Produit de saison', 'seasonal')
on conflict (slug) do nothing;

-- Products
insert into public.products (id, name, image_url, price, category_slug, is_bio, is_label_rouge, rating)
values
  ('5ed2f22b-252d-4cfa-9975-006fbdb8e462', 'Bourriche d''huîtres "l''Authentique" de Paimpol - 50n°3', '/images/huitre.png', 45.99, 'poissons-fruits-mer', false, true, 4.6),
  ('5fdf08dc-930a-423b-82aa-f4b2cbefea37', 'Confit de vin rouge Bio', '/images/confit-de-vin-rouge.png', 12.50, 'epicerie-salee', true, false, 4.2),
  ('d2ab14fb-0a6d-41bc-b179-0fb9254d85bb', 'Sorbet Pomme Verte 0.5L', '/images/sorbet-pomme-verte.png', 8.90, 'epicerie-sucree', false, false, 4.0),
  ('c987e614-f18e-43cb-b2f7-1c28a30a68bd', 'Confit de vin rouge Bio', '/images/confit-de-vin-rouge-2.png', 15.20, 'produits-laitiers', true, false, 4.4),
  ('a7041396-9d48-4803-b9e8-3389f2408fe7', 'Confit de vin rouge Bio', '/images/confit-de-vin-rouge-3.png', 18.75, 'viandes-charcuteries', true, true, 4.7),
  ('89011abf-83ae-4ce0-b546-bc9522ff8b8d', 'Miel de lavande IGP', 'https://images.unsplash.com/photo-1587049352846-4a222e784e38?w=400&h=400&fit=crop', 14.30, 'epicerie-sucree', false, false, 4.3),
  ('1835390f-64a7-4977-ab71-329b4bdba06a', 'Tomates anciennes Bio', 'https://images.unsplash.com/photo-1546470427-d20e2f5d57e7?w=400&h=400&fit=crop', 6.50, 'fruits-legumes', true, false, 4.8),
  ('9ac22c04-238e-43b7-9216-1351a1638224', 'Terrine de canard Label Rouge', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=400&fit=crop', 22.40, 'viandes-charcuteries', false, true, 4.5),
  ('407d662f-72e5-431b-8239-1dbc7d568058', 'Huile d''olive extra vierge AOP', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop', 28.90, 'epicerie-salee', false, false, 4.6),
  ('863ae758-e96d-4f03-92c5-8e1588e4d598', 'Pommes Golden Bio', 'https://images.unsplash.com/photo-1579613832111-ac7dfcc7723f?w=400&h=400&fit=crop', 4.20, 'fruits-legumes', true, false, 4.1)
on conflict (id) do nothing;

-- Product labels
insert into public.product_labels (product_id, label_slug)
values
  ('5ed2f22b-252d-4cfa-9975-006fbdb8e462', 'igp'),
  ('5ed2f22b-252d-4cfa-9975-006fbdb8e462', 'label-rouge'),
  ('5fdf08dc-930a-423b-82aa-f4b2cbefea37', 'bio'),
  ('5fdf08dc-930a-423b-82aa-f4b2cbefea37', 'stg'),
  ('c987e614-f18e-43cb-b2f7-1c28a30a68bd', 'seasonal'),
  ('a7041396-9d48-4803-b9e8-3389f2408fe7', 'bio'),
  ('a7041396-9d48-4803-b9e8-3389f2408fe7', 'seasonal'),
  ('89011abf-83ae-4ce0-b546-bc9522ff8b8d', 'igp'),
  ('1835390f-64a7-4977-ab71-329b4bdba06a', 'bio'),
  ('9ac22c04-238e-43b7-9216-1351a1638224', 'label-rouge'),
  ('407d662f-72e5-431b-8239-1dbc7d568058', 'aoc'),
  ('863ae758-e96d-4f03-92c5-8e1588e4d598', 'bio')
on conflict (product_id, label_slug) do nothing;
