INSERT INTO `addresses` (`id`, `user_id`, `label`, `recipient`, `line1`, `city`, `phone`, `created_at`, `updated_at`) VALUES
INSERT INTO `categories` (`id`, `name`, `image_url`, `created_at`, `updated_at`) VALUES
INSERT INTO `hero_banners` (`id`, `title`, `subtitle`, `cta`, `link`, `image_url`, `background`, `created_at`, `updated_at`) VALUES
INSERT INTO `orders` (`id`, `user_id`, `status`, `total`, `shipping_address_id`, `created_at`, `updated_at`) VALUES
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `size`, `color`, `created_at`, `updated_at`) VALUES
INSERT INTO `products` (`id`, `title`, `description`, `price`, `old_price`, `rating`, `review_count`, `category_id`, `image_url`, `images`, `inventory_status`, `discount`, `sizes`, `colors`, `material`, `care_instructions`, `fit`, `sku`, `maker_story`, `created_at`, `updated_at`) VALUES
INSERT INTO `recommendation_items` (`id`, `section_id`, `product_id`, `position`) VALUES
INSERT INTO `recommendation_sections` (`id`, `title`) VALUES
INSERT INTO `site_content` (`content_key`, `content_value`) VALUES
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `created_at`, `updated_at`) VALUES
INSERT INTO `wishlists` (`user_id`, `product_id`, `created_at`) VALUES