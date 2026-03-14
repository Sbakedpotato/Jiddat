-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2026 at 10:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jiddat`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `label` varchar(50) NOT NULL,
  `recipient` varchar(120) NOT NULL,
  `line1` varchar(255) NOT NULL,
  `city` varchar(120) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `label`, `recipient`, `line1`, `city`, `phone`, `created_at`, `updated_at`) VALUES
(1, 1, 'Home', 'Reyyan Ahmed', 'Sector V1, B16, Gulshan e Maymar', 'Karachi', '03152627139', '2026-01-21 10:48:19', '2026-01-21 10:48:19');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` varchar(64) NOT NULL,
  `name` varchar(120) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image_url`, `created_at`, `updated_at`) VALUES
('accessories', 'Accessories', 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('bottoms', 'Bottoms', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('dresses', 'Dresses', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('outerwear', 'Outerwear', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('tops', 'Tops', 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400', '2026-01-21 10:32:53', '2026-01-21 10:32:53');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(10) UNSIGNED NOT NULL,
  `donor_name` varchar(120) DEFAULT NULL,
  `donor_email` varchar(255) DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL,
  `message` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `payment_reference` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hero_banners`
--

CREATE TABLE `hero_banners` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `cta` varchar(120) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `background` varchar(120) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hero_banners`
--

INSERT INTO `hero_banners` (`id`, `title`, `subtitle`, `cta`, `link`, `image_url`, `background`, `created_at`, `updated_at`) VALUES
('main-hero', 'Fashion with Purpose', 'Every purchase empowers differently-abled artisans', 'Shop Collection', '/shop', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200', '#f5f0eb', '2026-01-21 10:32:53', '2026-01-21 10:32:53');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Processing',
  `total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `shipping_address_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `status`, `total`, `shipping_address_id`, `created_at`, `updated_at`) VALUES
(1, 1, 'Shipped', 3800.00, 1, '2026-01-21 10:48:19', '2026-01-21 11:03:10');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `product_id` varchar(64) NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `size` varchar(20) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `size`, `color`, `created_at`, `updated_at`) VALUES
(1, 1, 'jd-top-002', 1, 3800.00, NULL, NULL, '2026-01-21 10:48:19', '2026-01-21 10:48:19');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(12,2) NOT NULL,
  `old_price` decimal(12,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `review_count` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `category_id` varchar(64) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `inventory_status` varchar(80) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `sizes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`sizes`)),
  `colors` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`colors`)),
  `material` varchar(255) DEFAULT NULL,
  `care_instructions` text DEFAULT NULL,
  `fit` varchar(100) DEFAULT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `maker_story` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `old_price`, `rating`, `review_count`, `category_id`, `image_url`, `images`, `inventory_status`, `discount`, `sizes`, `colors`, `material`, `care_instructions`, `fit`, `sku`, `maker_story`, `created_at`, `updated_at`) VALUES
('jd-acc-001', 'Hand-Embroidered Tote Bag', 'Spacious tote bag with stunning hand-embroidered floral design. Functional art you can carry every day.', 2500.00, 3000.00, 4.90, 45, 'accessories', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600', '[\"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600\"]', 'In Stock', 17, '[\"One Size\"]', '[{\"name\": \"Natural Canvas\", \"hex\": \"#E8DCC4\"}, {\"name\": \"Ocean Blue\", \"hex\": \"#4F97A3\"}]', 'Cotton Canvas', 'Spot clean only.', 'One Size', 'JD-ACC-001', 'Our accessories line was started by a group of artisans who wanted to create everyday items that showcase their embroidery skills.', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('jd-acc-002', 'Woven Scarf', 'Lightweight handwoven scarf with subtle geometric patterns. Adds elegance to any outfit.', 1800.00, NULL, 4.70, 33, 'accessories', 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600', '[\"https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600\"]', 'In Stock', NULL, '[\"One Size\"]', '[{\"name\": \"Blush\", \"hex\": \"#DE5D83\"}, {\"name\": \"Olive\", \"hex\": \"#808000\"}, {\"name\": \"Mustard\", \"hex\": \"#FFDB58\"}]', 'Cotton-Silk Blend', 'Hand wash cold. Iron on low heat.', 'One Size', 'JD-ACC-002', 'Woven on traditional looms by artisans who have transformed their lives through the skills learned at KVTC.', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('jd-acc-003', 'Beaded Statement Necklace', 'Bold beaded necklace handcrafted using traditional beading techniques. A unique statement piece.', 1500.00, 1800.00, 4.50, 27, 'accessories', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', '[\"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600\"]', 'In Stock', 17, '[\"One Size\"]', '[{\"name\": \"Coral\", \"hex\": \"#FF7F50\"}, {\"name\": \"Turquoise\", \"hex\": \"#40E0D0\"}]', 'Glass Beads, Cotton Thread', 'Store flat. Avoid water.', 'One Size', 'JD-ACC-003', 'Beading requires incredible patience and precision. Our artisans spend weeks perfecting this skill before creating pieces for sale.', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('jd-bottom-001', 'Wide Leg Palazzo Pants', 'Comfortable wide-leg palazzo pants with hand-embroidered hem. Pairs beautifully with any top from our collection.', 3200.00, 3800.00, 4.50, 22, 'bottoms', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600', '[\"https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600\"]', 'In Stock', 16, '[\"XS\", \"S\", \"M\", \"L\", \"XL\"]', '[{\"name\": \"Black\", \"hex\": \"#000000\"}, {\"name\": \"Cream\", \"hex\": \"#FFFDD0\"}]', 'Viscose', 'Machine wash cold. Iron on medium heat.', 'Wide Leg', 'JD-BTM-001', 'Created by Hassan, who discovered his talent for stitching through the KVTC program. He now trains new artisans joining the program.', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('jd-bottom-002', 'Handloom Cotton Trousers', 'Classic straight-cut trousers made from handloom cotton. Comfortable enough for daily wear, elegant enough for the office.', 2800.00, NULL, 4.40, 12, 'bottoms', 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600', '[\"https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600\"]', 'In Stock', NULL, '[\"S\", \"M\", \"L\", \"XL\", \"XXL\"]', '[{\"name\": \"Navy\", \"hex\": \"#000080\"}, {\"name\": \"Khaki\", \"hex\": \"#C3B091\"}]', 'Handloom Cotton', 'Machine wash cold. Hang to dry.', 'Straight', 'JD-BTM-002', 'This piece supports our core mission: providing dignified employment to differently-abled individuals through skill development.', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('jd-dress-001', 'Handwoven Cotton Maxi Dress', 'Flowing maxi dress crafted from handwoven cotton fabric. Features delicate hand-stitched detailing at the neckline and sleeves.', 7500.00, 8500.00, 4.90, 31, 'dresses', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600', '[\"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600\", \"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600\"]', 'In Stock', 12, '[\"XS\", \"S\", \"M\", \"L\"]', '[{\"name\": \"Natural\", \"hex\": \"#F5F5DC\"}, {\"name\": \"Dusty Rose\", \"hex\": \"#DCAE96\"}]', 'Handwoven Cotton', 'Hand wash cold. Do not bleach. Hang to dry.', 'Flowy', 'JD-DRS-001', 'Woven by our team of artisans in Karachi, this fabric takes three days to complete on traditional looms operated by specially trained craftspeople.', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('jd-dress-002', 'Appliqué Work A-Line Dress', 'Elegant A-line dress with intricate appliqué work. Perfect for special occasions while supporting artisan livelihoods.', 6200.00, NULL, 4.70, 15, 'dresses', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', '[\"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600\"]', 'In Stock', NULL, '[\"S\", \"M\", \"L\", \"XL\"]', '[{\"name\": \"Midnight Blue\", \"hex\": \"#191970\"}, {\"name\": \"Emerald\", \"hex\": \"#50C878\"}]', 'Cotton Blend', 'Dry clean recommended.', 'A-Line', 'JD-DRS-002', 'Zara has been with KVTC for three years, specializing in appliqué work. Her attention to detail makes each dress unique.', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('jd-outer-001', 'Hand-Knit Cardigan', 'Cozy hand-knit cardigan perfect for layering. Each piece takes over 40 hours to complete by our skilled artisans.', 5800.00, 6800.00, 4.80, 28, 'outerwear', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', '[\"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600\"]', 'In Stock', 15, '[\"S\", \"M\", \"L\", \"XL\"]', '[{\"name\": \"Oatmeal\", \"hex\": \"#D9C8B4\"}, {\"name\": \"Charcoal\", \"hex\": \"#36454F\"}]', 'Wool Blend', 'Hand wash cold. Lay flat to dry. Do not hang.', 'Oversized', 'JD-OUT-001', 'Hand-knitted by Mariam, who has been part of KVTC for four years. Knitting has given her financial independence and creative expression.', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('jd-outer-002', 'Quilted Cotton Jacket', 'Lightweight quilted jacket with traditional pattern stitching. Perfect for transitional weather.', 4800.00, NULL, 4.60, 19, 'outerwear', 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600', '[\"https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600\"]', 'Low Stock', NULL, '[\"S\", \"M\", \"L\"]', '[{\"name\": \"Forest Green\", \"hex\": \"#228B22\"}, {\"name\": \"Burgundy\", \"hex\": \"#800020\"}]', 'Quilted Cotton', 'Machine wash cold. Tumble dry low.', 'Regular', 'JD-OUT-002', 'Each jacket is quilted by hand, a skill our artisans learn over months of dedicated training at KVTC.', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('jd-top-001', 'Embroidered Linen Blouse', 'A beautifully hand-embroidered linen blouse featuring traditional motifs reimagined for modern style. Each stitch tells a story of craftsmanship and dedication.', 4500.00, 5500.00, 4.80, 24, 'tops', 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600', '[\"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600\", \"https://images.unsplash.com/photo-1564246544814-3a6a79abed3e?w=600\"]', 'In Stock', 18, '[\"XS\", \"S\", \"M\", \"L\", \"XL\"]', '[{\"name\": \"Ivory\", \"hex\": \"#FFFFF0\"}, {\"name\": \"Sage\", \"hex\": \"#9DC183\"}]', '100% Linen', 'Hand wash cold. Lay flat to dry. Iron on low heat.', 'Relaxed', 'JD-TOP-001', 'This piece was crafted by Fatima, who joined KVTC two years ago. Through dedicated training, she has become one of our most skilled embroidery artisans.', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('jd-top-002', 'Block Print Cotton Kurta', 'Hand block-printed cotton kurta featuring geometric patterns inspired by Pakistani heritage. Comfortable and elegant for everyday wear.', 3800.00, NULL, 4.60, 18, 'tops', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600', '[\"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600\"]', 'In Stock', NULL, '[\"S\", \"M\", \"L\", \"XL\"]', '[{\"name\": \"Indigo\", \"hex\": \"#4B0082\"}, {\"name\": \"Terracotta\", \"hex\": \"#E2725B\"}]', '100% Cotton', 'Machine wash cold. Tumble dry low.', 'Regular', 'JD-TOP-002', 'Ahmed spent six months mastering the art of block printing. Each kurta takes him a full day to complete, ensuring every print is perfect.', '2026-01-21 10:32:53', '2026-01-21 10:32:53'),
('jd-top-003', 'Crochet Detail Blouse', 'Elegant blouse featuring hand-crocheted lace collar. A perfect blend of tradition and contemporary style.', 4200.00, NULL, 4.60, 16, 'tops', 'https://images.unsplash.com/photo-1564246544814-3a6a79abed3e?w=600', '[\"https://images.unsplash.com/photo-1564246544814-3a6a79abed3e?w=600\"]', 'In Stock', NULL, '[\"XS\", \"S\", \"M\", \"L\"]', '[{\"name\": \"White\", \"hex\": \"#FFFFFF\"}, {\"name\": \"Pearl\", \"hex\": \"#EAE0C8\"}]', 'Cotton with Crochet Detail', 'Hand wash recommended. Lay flat to dry.', 'Fitted', 'JD-TOP-003', 'Ayesha learned crocheting at KVTC and now creates intricate lace patterns that adorn our premium pieces.', '2026-01-21 10:32:53', '2026-01-21 10:32:53');

-- --------------------------------------------------------

--
-- Table structure for table `recommendation_items`
--

CREATE TABLE `recommendation_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `section_id` varchar(64) NOT NULL,
  `product_id` varchar(64) NOT NULL,
  `position` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `recommendation_items`
--

INSERT INTO `recommendation_items` (`id`, `section_id`, `product_id`, `position`) VALUES
(1, 'featured', 'jd-dress-001', 1),
(2, 'featured', 'jd-top-001', 2),
(3, 'featured', 'jd-acc-001', 3),
(4, 'featured', 'jd-outer-001', 4),
(5, 'new-arrivals', 'jd-top-003', 1),
(6, 'new-arrivals', 'jd-dress-002', 2),
(7, 'new-arrivals', 'jd-bottom-002', 3),
(8, 'new-arrivals', 'jd-acc-003', 4),
(9, 'bestsellers', 'jd-acc-001', 1),
(10, 'bestsellers', 'jd-top-002', 2),
(11, 'bestsellers', 'jd-outer-001', 3),
(12, 'bestsellers', 'jd-dress-001', 4);

-- --------------------------------------------------------

--
-- Table structure for table `recommendation_sections`
--

CREATE TABLE `recommendation_sections` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `recommendation_sections`
--

INSERT INTO `recommendation_sections` (`id`, `title`) VALUES
('bestsellers', 'Community Favorites'),
('featured', 'Featured Collection'),
('new-arrivals', 'New Arrivals');

-- --------------------------------------------------------

--
-- Table structure for table `site_content`
--

CREATE TABLE `site_content` (
  `content_key` varchar(64) NOT NULL,
  `content_value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_content`
--

INSERT INTO `site_content` (`content_key`, `content_value`) VALUES
('impact_artisans', '150+'),
('impact_products', '5,000+'),
('impact_wages', '₨ 2M+'),
('notification_bar', 'Free shipping on orders over Rs. 5,000 | Every purchase supports artisan livelihoods');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Reyyan Ahmed', 'reyyanahmed972@gmail.com', '$2a$12$P2vq8fPszQVJtveK2jqge.EE1TxQ.Prv1SKTJEsP1joxhB38pMkE.', 'user', '2026-01-21 10:45:51', '2026-01-21 10:45:51'),
(17, 'Admin', 'admin@jiddat.pk', '$2a$12$gqksok7JnRNTXzRetfeiPOvsL5IW7j2fTyI1fiC18lZ59chfp6pNe', 'admin', '2026-01-21 10:58:18', '2026-01-21 10:59:43');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `product_id` varchar(64) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`user_id`, `product_id`, `created_at`) VALUES
(1, 'jd-acc-001', '2026-01-21 10:55:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hero_banners`
--
ALTER TABLE `hero_banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `shipping_address_id` (`shipping_address_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `recommendation_items`
--
ALTER TABLE `recommendation_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_id` (`section_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `recommendation_sections`
--
ALTER TABLE `recommendation_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_content`
--
ALTER TABLE `site_content`
  ADD PRIMARY KEY (`content_key`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `recommendation_items`
--
ALTER TABLE `recommendation_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`shipping_address_id`) REFERENCES `addresses` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `recommendation_items`
--
ALTER TABLE `recommendation_items`
  ADD CONSTRAINT `recommendation_items_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `recommendation_sections` (`id`),
  ADD CONSTRAINT `recommendation_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `wishlists_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
