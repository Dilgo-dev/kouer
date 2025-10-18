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

do $$
declare
  base_products jsonb := '[
    {"name": "Bourriche d''huîtres \"l''Authentique\" de Paimpol - 50n°3", "image_url": "/images/huitre.png", "price": 45.99, "category_slug": "poissons-fruits-mer", "is_bio": false, "is_label_rouge": true, "rating": 4.6, "labels": ["igp", "label-rouge"]},
    {"name": "Confit de vin rouge Bio", "image_url": "/images/confit-de-vin-rouge.png", "price": 12.50, "category_slug": "epicerie-salee", "is_bio": true, "is_label_rouge": false, "rating": 4.2, "labels": ["bio", "stg"]},
    {"name": "Sorbet Pomme Verte 0.5L", "image_url": "/images/sorbet-pomme-verte.png", "price": 8.90, "category_slug": "epicerie-sucree", "is_bio": false, "is_label_rouge": false, "rating": 4.0, "labels": []},
    {"name": "Confit de vin rouge Bio", "image_url": "/images/confit-de-vin-rouge-2.png", "price": 15.20, "category_slug": "produits-laitiers", "is_bio": true, "is_label_rouge": false, "rating": 4.4, "labels": ["seasonal"]},
    {"name": "Confit de vin rouge Bio", "image_url": "/images/confit-de-vin-rouge-3.png", "price": 18.75, "category_slug": "viandes-charcuteries", "is_bio": true, "is_label_rouge": true, "rating": 4.7, "labels": ["bio", "seasonal"]}
  ]'::jsonb;
  product jsonb;
  i integer;
  new_id uuid;
  current_label text;
begin
  for i in 1..20 loop
    for product in select * from jsonb_array_elements(base_products) loop
      new_id := gen_random_uuid();

      insert into public.products (id, name, image_url, price, category_slug, is_bio, is_label_rouge, rating)
      values (
        new_id,
        (product->>'name') || ' #' || i,
        product->>'image_url',
        (product->>'price')::numeric,
        product->>'category_slug',
        (product->>'is_bio')::boolean,
        (product->>'is_label_rouge')::boolean,
        (product->>'rating')::numeric
      )
      on conflict (id) do nothing;

      for current_label in select jsonb_array_elements_text(product->'labels') loop
        insert into public.product_labels (product_id, label_slug)
        values (new_id, current_label)
        on conflict (product_id, label_slug) do nothing;
      end loop;
    end loop;
  end loop;
end $$;

