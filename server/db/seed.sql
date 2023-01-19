USE techxchange;

DELETE FROM users;
DELETE FROM devices;
DELETE FROM trades;

INSERT INTO users (`email`, `name`, `password`, `thumbnail_url`, `description`, `street`, `zip_code`)
VALUES ('bob@gmail.com', 'bob', 'pass123', 'https://pyxis.nymag.com/v1/imgs/451/ba2/6f22dfb79768b5c0841c4570cbd8cfb7bf-13-armond-white-2.rsquare.w330.jpg', 'i love trading phones', '1 street way', 98208);

INSERT INTO users (`email`, `name`, `password`, `thumbnail_url`, `description`, `street`, `zip_code`)
VALUES ('sally@gmail.com', 'sally', 'pass321', 'https://viterbischool.usc.edu/wp-content/uploads/2020/05/Lily-Profile-Square.jpeg', 'i like trading laptops', '20 street avenue', 95747);

INSERT INTO users (`email`, `name`, `password`, `thumbnail_url`, `description`, `street`, `zip_code`)
VALUES ('chris@gmail.com', 'chris', 'pass345', 'https://i0.wp.com/www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png?fit=550%2C532&ssl=1', 'i trade stuff', '10 street boulevard', 94010);

INSERT INTO devices (`user_id`, `name`, `thumbnail_url`, `description`, `item_condition`)
VALUES (1, 'iPhone 7', 'https://www.cnet.com/a/img/resize/68a75e35b45a2782ae48c9650766882b4812755a/hub/2016/09/12/2cdb7915-ede0-4db9-bd39-a2b6092719e8/iphone7plusv20.jpg?auto=webp&fit=cover&height=482&width=856', 'minor scratches.', 'great');

INSERT INTO devices (`user_id`, `name`, `thumbnail_url`, `description`, `item_condition`)
VALUES (1, 'HP Laptop', 'https://www.lifewire.com/thmb/vZjo7J29eV4rXg7Pm-Mvel0Ornc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/HP_LaptopsUnder200_Stream14_HeroSquare-06c9d0a3d73d49c2946e482d7c19a50c.jpg', 'works great; replaced SSD', 'Like New');

INSERT INTO devices (`user_id`, `name`, `thumbnail_url`, `description`, `item_condition`)
VALUES (2, 'iPhone 12', 'https://www.trustedreviews.com/wp-content/uploads/sites/54/2020/10/DSC01067-scaled.jpeg', 'still works; hmu if interested; wanna trade Google Phoone', 'Fair');

INSERT INTO devices (`user_id`, `name`, `thumbnail_url`, `description`, `item_condition`)
VALUES (2, 'HP Desktop', 'https://media.karousell.com/media/photos/products/2022/2/20/full_set_pc_hp_i5_6th_gen_19_i_1645361351_6fdc1906_progressive', 'Beefy Computer', 'Open Box');

INSERT INTO devices (`user_id`, `name`, `thumbnail_url`, `description`, `item_condition`)
VALUES (3, 'iPhone 11', 'https://i.pcmag.com/imagery/lineups/01jdxcK1H42vibMZ8WMW1Nw-1.fit_lim.size_1200x630.v1572054234.jpg', 'some dents on edge; working', 'fair');

INSERT INTO devices (`user_id`, `name`, `thumbnail_url`, `description`, `item_condition`)
VALUES (3, 'Galaxy S9', 'https://www.lifewire.com/thmb/bQUvzoJ0ialmWWU7YGR6bTjCtek=/1000x1000/filters:no_upscale():max_bytes(150000):strip_icc()/4043781-6-HeroSquare-ff6cc4599b9d4120a540c5c3bbf74b20.jpg', 'galaxy is fast and reliable; great camera', 'Good');

INSERT INTO trades (`proposer_id`, `proposer_device_id`, `receiver_id`, `receiver_device_id`, `status`)
VALUES (1, 1, 2, 3,'proposed');

INSERT INTO trades (`proposer_id`, `proposer_device_id`, `receiver_id`, `receiver_device_id`, `status`)
VALUES (2, 4, 3, 5,'approved');

INSERT INTO trades (`proposer_id`, `proposer_device_id`, `receiver_id`, `receiver_device_id`, `status`)
VALUES (3, 6, 1, 2,'proposed');

INSERT INTO trades (`proposer_id`, `proposer_device_id`, `receiver_id`, `receiver_device_id`, `status`)
VALUES (1, 1, 2, 4,'proposed');

INSERT INTO trades (`proposer_id`, `proposer_device_id`, `receiver_id`, `receiver_device_id`, `status`)
VALUES (1, 2, 3, 5,'proposed');

INSERT INTO bookmarks (`item_id`, `user_id`) VALUES (1, 1);

INSERT INTO bookmarks (`item_id`, `user_id`) VALUES (2, 2);

INSERT INTO bookmarks (`item_id`, `user_id`) VALUES (2, 1);
