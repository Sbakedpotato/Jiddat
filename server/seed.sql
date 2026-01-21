USE jiddat;

-- Categories (Apparel-focused)
INSERT INTO categories (id, name, image_url) VALUES
  ('tops', 'Tops', 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400'),
  ('dresses', 'Dresses', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'),
  ('bottoms', 'Bottoms', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400'),
  ('outerwear', 'Outerwear', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400'),
  ('accessories', 'Accessories', 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400');

-- Products (Handcrafted Apparel)
INSERT INTO products (id, title, description, price, old_price, rating, review_count, category_id, image_url, images, inventory_status, discount, sizes, colors, material, care_instructions, fit, sku, maker_story) VALUES
  ('jd-top-001', 'Embroidered Linen Blouse', 'A beautifully hand-embroidered linen blouse featuring traditional motifs reimagined for modern style. Each stitch tells a story of craftsmanship and dedication.', 4500, 5500, 4.8, 24, 'tops', 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600', '["https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600", "https://images.unsplash.com/photo-1564246544814-3a6a79abed3e?w=600"]', 'In Stock', 18, '["XS", "S", "M", "L", "XL"]', '[{"name": "Ivory", "hex": "#FFFFF0"}, {"name": "Sage", "hex": "#9DC183"}]', '100% Linen', 'Hand wash cold. Lay flat to dry. Iron on low heat.', 'Relaxed', 'JD-TOP-001', 'This piece was crafted by Fatima, who joined KVTC two years ago. Through dedicated training, she has become one of our most skilled embroidery artisans.'),

  ('jd-top-002', 'Block Print Cotton Kurta', 'Hand block-printed cotton kurta featuring geometric patterns inspired by Pakistani heritage. Comfortable and elegant for everyday wear.', 3800, NULL, 4.6, 18, 'tops', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600', '["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600"]', 'In Stock', NULL, '["S", "M", "L", "XL"]', '[{"name": "Indigo", "hex": "#4B0082"}, {"name": "Terracotta", "hex": "#E2725B"}]', '100% Cotton', 'Machine wash cold. Tumble dry low.', 'Regular', 'JD-TOP-002', 'Ahmed spent six months mastering the art of block printing. Each kurta takes him a full day to complete, ensuring every print is perfect.'),

  ('jd-dress-001', 'Handwoven Cotton Maxi Dress', 'Flowing maxi dress crafted from handwoven cotton fabric. Features delicate hand-stitched detailing at the neckline and sleeves.', 7500, 8500, 4.9, 31, 'dresses', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600', '["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600", "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600"]', 'In Stock', 12, '["XS", "S", "M", "L"]', '[{"name": "Natural", "hex": "#F5F5DC"}, {"name": "Dusty Rose", "hex": "#DCAE96"}]', 'Handwoven Cotton', 'Hand wash cold. Do not bleach. Hang to dry.', 'Flowy', 'JD-DRS-001', 'Woven by our team of artisans in Karachi, this fabric takes three days to complete on traditional looms operated by specially trained craftspeople.'),

  ('jd-dress-002', 'Appliqué Work A-Line Dress', 'Elegant A-line dress with intricate appliqué work. Perfect for special occasions while supporting artisan livelihoods.', 6200, NULL, 4.7, 15, 'dresses', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', '["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600"]', 'In Stock', NULL, '["S", "M", "L", "XL"]', '[{"name": "Midnight Blue", "hex": "#191970"}, {"name": "Emerald", "hex": "#50C878"}]', 'Cotton Blend', 'Dry clean recommended.', 'A-Line', 'JD-DRS-002', 'Zara has been with KVTC for three years, specializing in appliqué work. Her attention to detail makes each dress unique.'),

  ('jd-bottom-001', 'Wide Leg Palazzo Pants', 'Comfortable wide-leg palazzo pants with hand-embroidered hem. Pairs beautifully with any top from our collection.', 3200, 3800, 4.5, 22, 'bottoms', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600', '["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600"]', 'In Stock', 16, '["XS", "S", "M", "L", "XL"]', '[{"name": "Black", "hex": "#000000"}, {"name": "Cream", "hex": "#FFFDD0"}]', 'Viscose', 'Machine wash cold. Iron on medium heat.', 'Wide Leg', 'JD-BTM-001', 'Created by Hassan, who discovered his talent for stitching through the KVTC program. He now trains new artisans joining the program.'),

  ('jd-bottom-002', 'Handloom Cotton Trousers', 'Classic straight-cut trousers made from handloom cotton. Comfortable enough for daily wear, elegant enough for the office.', 2800, NULL, 4.4, 12, 'bottoms', 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600', '["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600"]', 'In Stock', NULL, '["S", "M", "L", "XL", "XXL"]', '[{"name": "Navy", "hex": "#000080"}, {"name": "Khaki", "hex": "#C3B091"}]', 'Handloom Cotton', 'Machine wash cold. Hang to dry.', 'Straight', 'JD-BTM-002', 'This piece supports our core mission: providing dignified employment to differently-abled individuals through skill development.'),

  ('jd-outer-001', 'Hand-Knit Cardigan', 'Cozy hand-knit cardigan perfect for layering. Each piece takes over 40 hours to complete by our skilled artisans.', 5800, 6800, 4.8, 28, 'outerwear', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', '["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600"]', 'In Stock', 15, '["S", "M", "L", "XL"]', '[{"name": "Oatmeal", "hex": "#D9C8B4"}, {"name": "Charcoal", "hex": "#36454F"}]', 'Wool Blend', 'Hand wash cold. Lay flat to dry. Do not hang.', 'Oversized', 'JD-OUT-001', 'Hand-knitted by Mariam, who has been part of KVTC for four years. Knitting has given her financial independence and creative expression.'),

  ('jd-outer-002', 'Quilted Cotton Jacket', 'Lightweight quilted jacket with traditional pattern stitching. Perfect for transitional weather.', 4800, NULL, 4.6, 19, 'outerwear', 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600', '["https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600"]', 'Low Stock', NULL, '["S", "M", "L"]', '[{"name": "Forest Green", "hex": "#228B22"}, {"name": "Burgundy", "hex": "#800020"}]', 'Quilted Cotton', 'Machine wash cold. Tumble dry low.', 'Regular', 'JD-OUT-002', 'Each jacket is quilted by hand, a skill our artisans learn over months of dedicated training at KVTC.'),

  ('jd-acc-001', 'Hand-Embroidered Tote Bag', 'Spacious tote bag with stunning hand-embroidered floral design. Functional art you can carry every day.', 2500, 3000, 4.9, 45, 'accessories', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600', '["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600"]', 'In Stock', 17, '["One Size"]', '[{"name": "Natural Canvas", "hex": "#E8DCC4"}, {"name": "Ocean Blue", "hex": "#4F97A3"}]', 'Cotton Canvas', 'Spot clean only.', 'One Size', 'JD-ACC-001', 'Our accessories line was started by a group of artisans who wanted to create everyday items that showcase their embroidery skills.'),

  ('jd-acc-002', 'Woven Scarf', 'Lightweight handwoven scarf with subtle geometric patterns. Adds elegance to any outfit.', 1800, NULL, 4.7, 33, 'accessories', 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600', '["https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600"]', 'In Stock', NULL, '["One Size"]', '[{"name": "Blush", "hex": "#DE5D83"}, {"name": "Olive", "hex": "#808000"}, {"name": "Mustard", "hex": "#FFDB58"}]', 'Cotton-Silk Blend', 'Hand wash cold. Iron on low heat.', 'One Size', 'JD-ACC-002', 'Woven on traditional looms by artisans who have transformed their lives through the skills learned at KVTC.'),

  ('jd-acc-003', 'Beaded Statement Necklace', 'Bold beaded necklace handcrafted using traditional beading techniques. A unique statement piece.', 1500, 1800, 4.5, 27, 'accessories', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', '["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600"]', 'In Stock', 17, '["One Size"]', '[{"name": "Coral", "hex": "#FF7F50"}, {"name": "Turquoise", "hex": "#40E0D0"}]', 'Glass Beads, Cotton Thread', 'Store flat. Avoid water.', 'One Size', 'JD-ACC-003', 'Beading requires incredible patience and precision. Our artisans spend weeks perfecting this skill before creating pieces for sale.'),

  ('jd-top-003', 'Crochet Detail Blouse', 'Elegant blouse featuring hand-crocheted lace collar. A perfect blend of tradition and contemporary style.', 4200, NULL, 4.6, 16, 'tops', 'https://images.unsplash.com/photo-1564246544814-3a6a79abed3e?w=600', '["https://images.unsplash.com/photo-1564246544814-3a6a79abed3e?w=600"]', 'In Stock', NULL, '["XS", "S", "M", "L"]', '[{"name": "White", "hex": "#FFFFFF"}, {"name": "Pearl", "hex": "#EAE0C8"}]', 'Cotton with Crochet Detail', 'Hand wash recommended. Lay flat to dry.', 'Fitted', 'JD-TOP-003', 'Ayesha learned crocheting at KVTC and now creates intricate lace patterns that adorn our premium pieces.');

-- Recommendation sections
INSERT INTO recommendation_sections (id, title) VALUES
  ('featured', 'Featured Collection'),
  ('new-arrivals', 'New Arrivals'),
  ('bestsellers', 'Community Favorites');

-- Recommendation items
INSERT INTO recommendation_items (section_id, product_id, position) VALUES
  ('featured', 'jd-dress-001', 1),
  ('featured', 'jd-top-001', 2),
  ('featured', 'jd-acc-001', 3),
  ('featured', 'jd-outer-001', 4),
  ('new-arrivals', 'jd-top-003', 1),
  ('new-arrivals', 'jd-dress-002', 2),
  ('new-arrivals', 'jd-bottom-002', 3),
  ('new-arrivals', 'jd-acc-003', 4),
  ('bestsellers', 'jd-acc-001', 1),
  ('bestsellers', 'jd-top-002', 2),
  ('bestsellers', 'jd-outer-001', 3),
  ('bestsellers', 'jd-dress-001', 4);

-- Hero banner
INSERT INTO hero_banners (id, title, subtitle, cta, link, image_url, background) VALUES
  ('main-hero', 'Fashion with Purpose', 'Every purchase empowers differently-abled artisans', 'Shop Collection', '/shop', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200', '#f5f0eb');

-- Site content
INSERT INTO site_content (content_key, content_value) VALUES
  ('notification_bar', 'Free shipping on orders over Rs. 5,000 | Every purchase supports artisan livelihoods'),
  ('impact_artisans', '150+'),
  ('impact_products', '5,000+'),
  ('impact_wages', '₨ 2M+');
