DROP DATABASE IF EXISTS techxchange;

CREATE DATABASE techxchange;

USE techxchange;

CREATE TABLE users (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` CHAR(60) NOT NULL,
  `thumbnail_url` VARCHAR(255) NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL,
  `street` VARCHAR(255) NOT NULL,
  `zip_code` VARCHAR(10) NOT NULL
);

CREATE TABLE devices (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `thumbnail_url` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `item_condition` VARCHAR(16) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES users (`id`)
);

CREATE TABLE trades (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `proposer_id` INT NOT NULL,
  `proposer_device_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `receiver_device_id` INT NOT NULL,
  `status` VARCHAR(16) NOT NULL,
  FOREIGN KEY (`proposer_id`) REFERENCES users (`id`),
  FOREIGN KEY (`proposer_device_id`) REFERENCES devices (`id`),
  FOREIGN KEY (`receiver_id`) REFERENCES users (`id`),
  FOREIGN KEY (`receiver_device_id`) REFERENCES devices (`id`)
);

CREATE TABLE bookmarks (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES users (`id`),
  FOREIGN KEY (`item_id`) REFERENCES devices (`id`)
);