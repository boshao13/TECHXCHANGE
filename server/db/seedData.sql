
USE techxchange;
-- CHANGE FOR YOUR Local DB_NAME if Different^^

-- RESETS TABLE DATA!
DELETE FROM users;
DELETE FROM devices;
DELETE FROM trades;

INSERT INTO users
(email,`password`,thumbnail_url, `description`, street, zip_code)
VALUES ('bob@gmail.com', 'pass123', 'image.jpeg', 'i love trading phones', '1 street way', 98208);
INSERT INTO users
(email,`password`,thumbnail_url, `description`, street, zip_code)
VALUES ('sally@gmail.com', 'pass321', 'image.jpeg', 'i like trading laptops', '20 street avenue', 95747);
INSERT INTO users
(email,`password`,thumbnail_url, `description`, street, zip_code)
VALUES ('chris@gmail.com', 'pass345', 'image.jpeg', 'i trade stuff', '10 street boulevard', 94010);


INSERT INTO devices (`user_id`, `name`, `thumbnail_url`, `description`, `condition`) VALUES (1, 'iPhone 7', 'image1.jpeg', 'minor scratches.', 'great');
INSERT INTO devices
(`user_id`, `name`, `thumbnail_url`, `description`, `condition`)
VALUES (1,'HP Laptop', 'image.jpeg', 'works great; replaced SSD', 'Like New');
INSERT INTO devices
(`user_id`, `name`, `thumbnail_url`, `description`, `condition`)
VALUES (2,'iPhone 12', 'image.jpeg', 'still works; hmu if interested; wanna trade Google Phoone', 'Fair');
INSERT INTO devices
(`user_id`, `name`, `thumbnail_url`, `description`, `condition`)
VALUES (2,'HP Desktop', 'image.jpeg', 'Beefy Computer', 'Open Box');
INSERT INTO devices
(`user_id`, `name`, `thumbnail_url`, `description`, `condition`)
VALUES (3,'iPhone 11', 'image.jpeg', 'some dents on edge; working', 'fair');
INSERT INTO devices
(`user_id`, `name`, `thumbnail_url`, `description`, `condition`)
VALUES (3,'Galaxy S9', 'image.jpeg', 'galaxy is fast and reliable; great camera', 'Good');


INSERT INTO trades
(proposer_id,proposer_device_id,receiver_id,receiver_device_id,`status`)
VALUES (1,1,2,3,'proposed');
INSERT INTO trades
(proposer_id,proposer_device_id,receiver_id,receiver_device_id,`status`)
VALUES (2,4,3,5,'approved');
INSERT INTO trades
(proposer_id,proposer_device_id,receiver_id,receiver_device_id,`status`)
VALUES (3,6,1,2,'proposed');

