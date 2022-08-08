-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.6.8-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.administrator: ~1 rows (approximately)
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`, `is_active`, `created_at`) VALUES
	(7, 'administrator', '$2b$10$CbAKVEqfksEX/ZKNceFPDuaQ8INCJ72gQ9CqHHrSNX2SWJWxmGYvm', 1, '2022-08-07 11:23:56'),
	(8, 'adminmarko', '$2b$10$Wo/bZlsZj5Aj1zha3JORxucmroP.RtHNS/u1YmwFcGIIm3LaXYvea', 1, '2022-08-07 11:26:30');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

-- Dumping structure for table watch_shop_db.band_type
DROP TABLE IF EXISTS `band_type`;
CREATE TABLE IF NOT EXISTS `band_type` (
  `band_type_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`band_type_id`),
  UNIQUE KEY `uq_band_type_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.band_type: ~6 rows (approximately)
/*!40000 ALTER TABLE `band_type` DISABLE KEYS */;
INSERT INTO `band_type` (`band_type_id`, `name`) VALUES
	(6, 'Canvas'),
	(1, 'Leather'),
	(5, 'Mesh'),
	(4, 'Nato'),
	(3, 'Oyster'),
	(2, 'Rubber');
/*!40000 ALTER TABLE `band_type` ENABLE KEYS */;

-- Dumping structure for table watch_shop_db.cart
DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cart_id`) USING BTREE,
  KEY `fk_cart_user_id` (`user_id`),
  CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.cart: ~4 rows (approximately)
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` (`cart_id`, `user_id`, `created_at`) VALUES
	(7, 25, '2022-08-07 11:42:07'),
	(8, 31, '2022-08-07 11:42:12'),
	(9, 25, '2022-08-07 13:22:23'),
	(10, 31, '2022-08-07 13:22:27');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.cart_content: ~2 rows (approximately)
/*!40000 ALTER TABLE `cart_content` DISABLE KEYS */;
INSERT INTO `cart_content` (`cart_content_id`, `cart_id`, `item_id`, `quantity`) VALUES
	(21, 7, 4, 2),
	(22, 7, 5, 1),
	(23, 8, 1, 1);
/*!40000 ALTER TABLE `cart_content` ENABLE KEYS */;

-- Dumping structure for table watch_shop_db.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.category: ~7 rows (approximately)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `name`) VALUES
	(11, 'Chronograph'),
	(5, 'Diver'),
	(12, 'Dress'),
	(1, 'Man\'s watch'),
	(13, 'Pilot'),
	(3, 'Sport'),
	(2, 'Women\'s watch');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Dumping structure for table watch_shop_db.category_item
DROP TABLE IF EXISTS `category_item`;
CREATE TABLE IF NOT EXISTS `category_item` (
  `category_item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned NOT NULL,
  `item_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`category_item_id`),
  UNIQUE KEY `uq_category_item_category_id_item_id` (`item_id`,`category_id`) USING BTREE,
  KEY `fk_category_item_category_id` (`category_id`),
  KEY `fk_category_item_item_id` (`item_id`),
  CONSTRAINT `fk_category_item_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_category_item_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.category_item: ~21 rows (approximately)
/*!40000 ALTER TABLE `category_item` DISABLE KEYS */;
INSERT INTO `category_item` (`category_item_id`, `category_id`, `item_id`) VALUES
	(1, 1, 1),
	(2, 5, 1),
	(3, 1, 2),
	(22, 3, 2),
	(4, 5, 2),
	(5, 1, 3),
	(6, 13, 3),
	(7, 1, 4),
	(8, 13, 4),
	(11, 1, 5),
	(10, 11, 5),
	(12, 2, 6),
	(13, 11, 6),
	(14, 1, 7),
	(15, 12, 7),
	(16, 2, 8),
	(17, 12, 8),
	(19, 1, 9),
	(18, 3, 9),
	(20, 2, 10),
	(21, 3, 10);
/*!40000 ALTER TABLE `category_item` ENABLE KEYS */;

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
  `is_ active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `price` decimal(10,2) unsigned NOT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `uq_item_image_path` (`image_path`) USING HASH,
  KEY `fk_item_band_type_id` (`band_type_id`),
  CONSTRAINT `fk_item_band_type_id` FOREIGN KEY (`band_type_id`) REFERENCES `band_type` (`band_type_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.item: ~10 rows (approximately)
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` (`item_id`, `name`, `image_path`, `description`, `display_type`, `has_stopwatch`, `has_subdial`, `has_alarm`, `has_automatic_calibration`, `movement_type`, `band_type_id`, `is_ active`, `price`) VALUES
	(1, 'Seiko Prospex SPB143', '../images/seiko-diver.png', 'Seiko’s Prospex lineup of dive watches runs the gamut of price points from hundreds to thousands of dollars, though the brand has recently released a number of excellent watches for around $1,000. The Prospex SPB143 might look somewhat familiar to you, and that’s because it closely resembles the limited edition SLA017, which is in turn inspired by the Seiko 62MAS — Seiko’s very first dive watch. To justify its higher price tag, the SPB143 comes in a more refined case that’s just a tad over 40mm wide, a sign of changing times and case downsizing throughout the industry. The finishing on the case and the dial is also a step up from your usual Sumos, Monsters, and Turtles. The movement inside is Seiko’s 6R35 with a 70-hour power reserve, making this an excellent option for the price.', 'analog', 0, 0, 0, 0, 'automatic', 3, 1, 120000.00),
	(2, 'Casio G-Shock DW9052', '../images/casio-diver.jpg', 'Hardy, cheap, and reliable are all words that perfectly describe what is perhaps the best truly inexpensive dive watch in the world, Casio’s G-Shock DW9052. This is a watch which was for years standard issue at the Naval Diving and Salvage Training Center in Panama City Beach, FL, given to divers right along with their fins, masks, and knives. Used by everyone from US Navy SEALs to Home Depot dads, the DW9052 does everything it needs to do in terms of underwater time telling, with a simple to use stopwatch feature, while being virtually indestructible, exactly what military and civilian divers need.', 'digital', 1, 1, 1, 1, 'quartz', 2, 1, 5000.00),
	(3, 'Hamilton Khaki Aviation Pilot', '../images/hamilton-pilot.jpg', 'Vintage-inspired watches have been a huge trend for the past couple of years, and one of the standout pieces from this trend is the Hamilton Khaki Aviation Pilot Pioneer Mechanical ― a comically long name for an excellent watch. Designed as an homage to the old Hamilton and CWC W10s, it might be more accurate to call the Pioneer a reissue because of the sizing which is, at 36mm in width by 42mm in length, incredibly faithful to the original. Its modest size, coupled with faux vintage lume, truly makes it seem like a watch from the past you scored on eBay. Inside the Pioneer, however, beats a thoroughly modern movement, the Hamilton calibre H-50, which is hand-wound and has a generous 80-hour power reserve, which ensures it’ll keep running even if you’ve left it on the counter or in the glove box (don’t do this) over the weekend.', 'analog', 0, 0, 0, 0, 'quartz', 1, 1, 61000.00),
	(4, 'Bulova Lunar Pilot LE', '../images/bulova-pilot.jpg', 'The Bulova Lunar Pilot is an homage to the Bulova chronograph worn by US astronaut Dave Scott on the freakin’ Moon on Apollo 15. Visually, the new Lunar Pilot is a faithful recreation, retaining the curvy case shape and distinctive elongated pushers of the original. The dial is mostly similar too ― except for the addition of a date window at 4:30 and the label “262 kHz” at 6 o’clock within the running seconds subdial. Some enthusiasts will turn up their nose at this piece because it has a quartz movement, but this isn’t the quartz in a Timex from Walmart. Bulova’s high-performance quartz movement buzzes away at 262Hz, which is 8 times that of typical quartz movements and has an accuracy of +/-5 seconds per month. This quartz caliber also makes the Lunar Pilot a screaming deal with both aviation and space connections.', 'analog', 0, 1, 0, 1, 'quartz', 1, 1, 53000.00),
	(5, 'Tissot Heritage 1973', '../images/tissot-chrono.png', 'The Tissot Heritage 1973 Chronograph was developed with Kessel Classics in mind; the barrel case and orange accents look right at home amongst the cars the shop preps for races like the Monte-Carlo Rally and the Bernina Granturismo in St. Moritz. The Tissot Navigator watch of the \'70s was the blueprint for the new Heritage 1973 Chronograph, with its tonneau case and panda-style chronograph registers. Since the design language is already out there. Tissot nails it, and there are a variety of finishes present that make this an exciting bit of metal with which to encapsulate an ETA Valjoux 7753.', 'analog', 1, 1, 1, 1, 'quartz', 1, 1, 210000.00),
	(6, 'Michael Kors, MK5879 Rose Gold & Black', '../images/michael-kors-chrono.jpg', 'This ladies black chronograph watch demands attention immediately. The 43mm case is atypically large for a female watch, resulting in a bold appearance.', 'analog', 1, 1, 1, 1, 'quartz', 3, 1, 18000.00),
	(7, 'Orient Bambino II', '../images/orient-dress.jpg', 'As one of the true gateway brands, Orient’s value packed lineup doesn’t stop at just tool watches. The Bambino is an affordable mechanical dress watch that offers modern yet reasonable case measurements along with solid specs. Inside, the in-house manufactured caliber F6724 gives the wearing hacking second capabilities and has a power reserve of 40 hours while operating at 3hz. A domed mineral crystal covers the white dial and while it would have been nice to have a sapphire crystal, the trade off for an in-house movement at this price range is worth it. ', 'analog', 0, 0, 0, 0, 'automatic', 1, 1, 31000.00),
	(8, 'Citizen Silhouette Crystal', '../images/citizen-dress.jpg', 'American watch designer Citizen is making a comeback this year with its new glamorous watch collection. Take this gorgeous Citizen Silhouette Crystal watch as an example. The classic lines of the two-tone watch are spiced up with dozens of mineral crystals jewelry. We think the Citizen Silhouette Crystal strikes the perfect balance between elegance and glam.', 'analog', 0, 0, 0, 0, 'automatic', 3, 1, 40000.00),
	(9, 'Gshock GA-110SR-1A', '../images/casio-sport.jpg', 'Immerse yourself in brilliant iridescent color, the first-ever G-SHOCK with full-surface gradated crystal finish evoking reflected sunlight. Rainbow vapor deposition reproduces the midsummer sky at dusk, changing hue moment by moment depending on the light.', 'digital', 1, 1, 1, 1, 'quartz', 2, 1, 20000.00),
	(10, 'Gshock DW-5600SC-4', '../images/casio-sport-w.jpg', 'This is a youth culture-inspired model from G-Shock, a tough watch that has continuously evolved in the relentless pursuit of strength, featuring a pastel coloring to conjure up images of spring. This model is based on the classic square DW-5600 model.', 'digital', 1, 1, 1, 1, 'quartz', 2, 1, 13000.00);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;

-- Dumping structure for table watch_shop_db.order
DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int(10) unsigned NOT NULL,
  `status` enum('pending','declined','accepted') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `uq_order_cart_id` (`cart_id`),
  CONSTRAINT `fk_order_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.order: ~4 rows (approximately)
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` (`order_id`, `cart_id`, `status`, `created_at`) VALUES
	(7, 7, 'pending', '2022-08-07 13:21:53'),
	(8, 8, 'pending', '2022-08-07 13:21:58'),
	(11, 9, 'declined', '2022-08-07 13:22:36'),
	(12, 10, 'accepted', '2022-08-07 13:22:41');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

-- Dumping structure for table watch_shop_db.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `password_hash` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `activation_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `forename` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) unsigned DEFAULT 0,
  `address` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`),
  UNIQUE KEY `uq_user_activation_code` (`activation_code`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table watch_shop_db.user: ~2 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `password_hash`, `activation_code`, `forename`, `surname`, `email`, `is_active`, `address`, `created_at`) VALUES
	(25, '$2b$10$ww86C2Nm8Mf7wMRasq9kyetLNrrXE5kSRzGVy4NhexWf3U94LbOoO', 'fae9e51b-82f4-4c47-960a-4abbdfcc6af5', 'David', 'Mijic', 'david@gmail.com', 1, 'Danijelova 32', '2022-07-30 09:28:13'),
	(31, '$2b$10$TIJhKMAIj/rFkFAbEmnEH.cB8omTaDsa00M3BrcLSluvvQffOre.a', '2d2dc076-2570-4fe1-9fe4-e578621e5529', 'Marko', 'Markovic', 'marko@gmail.com', 1, 'Vojvode Stepe 23', '2022-08-07 11:39:28');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
