-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.7.4-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for watch_shop_db
DROP DATABASE IF EXISTS `watch_shop_db`;
CREATE DATABASE IF NOT EXISTS `watch_shop_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `watch_shop_db`;

-- Dumping structure for table watch_shop_db.administrator
DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.administrator: ~0 rows (approximately)

-- Dumping structure for table watch_shop_db.band_type
DROP TABLE IF EXISTS `band_type`;
CREATE TABLE IF NOT EXISTS `band_type` (
  `band_type_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`band_type_id`),
  UNIQUE KEY `uq_band_type_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.band_type: ~3 rows (approximately)
INSERT INTO `band_type` (`band_type_id`, `name`) VALUES
	(2, 'Gumena'),
	(1, 'Kožna'),
	(3, 'Metalna');

-- Dumping structure for table watch_shop_db.cart
DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cart_id`) USING BTREE,
  KEY `fk_cart_user_id` (`user_id`),
  CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.cart: ~0 rows (approximately)

-- Dumping structure for table watch_shop_db.cart_content
DROP TABLE IF EXISTS `cart_content`;
CREATE TABLE IF NOT EXISTS `cart_content` (
  `cart_content_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int(10) unsigned NOT NULL,
  `item_id` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cart_content_id`),
  KEY `fk_cart_content_cart_id` (`cart_id`),
  KEY `fk_cart_content_item_id` (`item_id`),
  CONSTRAINT `fk_cart_content_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_content_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.cart_content: ~0 rows (approximately)

-- Dumping structure for table watch_shop_db.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.category: ~4 rows (approximately)
INSERT INTO `category` (`category_id`, `name`) VALUES
	(1, 'Muški'),
	(5, 'Ronilački'),
	(3, 'Sportski'),
	(2, 'Ženski');

-- Dumping structure for table watch_shop_db.category_item
DROP TABLE IF EXISTS `category_item`;
CREATE TABLE IF NOT EXISTS `category_item` (
  `category_item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned NOT NULL,
  `item_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`category_item_id`),
  KEY `fk_category_item_category_id` (`category_id`),
  KEY `fk_category_item_item_id` (`item_id`),
  CONSTRAINT `fk_category_item_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_category_item_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.category_item: ~0 rows (approximately)

-- Dumping structure for table watch_shop_db.item
DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_path` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_type` enum('analog','digital') COLLATE utf8mb4_unicode_ci NOT NULL,
  `has_stopwatch` tinyint(1) unsigned DEFAULT 0,
  `has_subdial` tinyint(1) unsigned DEFAULT 0,
  `has_alarm` tinyint(1) unsigned DEFAULT 0,
  `has_automatic_calibration` tinyint(1) unsigned DEFAULT 0,
  `movement_type` enum('automatic','mechanical','quartz') COLLATE utf8mb4_unicode_ci NOT NULL,
  `band_type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `uq_item_image_path` (`image_path`) USING HASH,
  KEY `fk_item_band_type_id` (`band_type_id`),
  CONSTRAINT `fk_item_band_type_id` FOREIGN KEY (`band_type_id`) REFERENCES `band_type` (`band_type_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.item: ~2 rows (approximately)
INSERT INTO `item` (`item_id`, `name`, `image_path`, `description`, `display_type`, `has_stopwatch`, `has_subdial`, `has_alarm`, `has_automatic_calibration`, `movement_type`, `band_type_id`) VALUES
	(1, 'Seiko 5 Sports', 'img/seiko-5-sports', 'Neki opis', 'analog', 0, 0, 0, 0, 'automatic', 3),
	(2, 'Casio G-shock', 'img/casio-gshock', 'Neki opis za Casio', 'digital', 1, 1, 1, 1, 'quartz', 2);

-- Dumping structure for table watch_shop_db.order
DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int(10) unsigned NOT NULL,
  `status` enum('pending','declined','accepted') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `uq_order_cart_id` (`cart_id`),
  CONSTRAINT `fk_order_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.order: ~0 rows (approximately)

-- Dumping structure for table watch_shop_db.price
DROP TABLE IF EXISTS `price`;
CREATE TABLE IF NOT EXISTS `price` (
  `price_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`price_id`),
  KEY `fk_price_item_id` (`item_id`),
  CONSTRAINT `fk_price_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.price: ~0 rows (approximately)

-- Dumping structure for table watch_shop_db.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `forname` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street_and_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `floor` int(10) unsigned DEFAULT NULL,
  `apartment` int(10) unsigned DEFAULT NULL,
  `city` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) unsigned DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_username` (`username`),
  UNIQUE KEY `uq_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.user: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
