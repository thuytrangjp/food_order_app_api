DROP DATABASE food_order_app;

CREATE DATABASE IF NOT EXISTS food_order_app;

USE food_order_app;

CREATE TABLE users
(
    user_id   INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100)  NOT NULL,
    email     VARCHAR(100)  NOT NULL,
    password  VARCHAR(1000) NOT NULL
);

CREATE TABLE food_types
(
    type_id   INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(100) NOT NULL
);

CREATE TABLE restaurants
(
    res_id      INT PRIMARY KEY AUTO_INCREMENT,
    res_name    VARCHAR(100) NOT NULL,
    image       VARCHAR(255),
    description VARCHAR(100)
);

CREATE TABLE foods
(
    food_id     INT PRIMARY KEY AUTO_INCREMENT,
    type_id     INT          NOT NULL,
    food_name   VARCHAR(100) NOT NULL,
    image       VARCHAR(1000),
    price       FLOAT DEFAULT (0),
    description VARCHAR(100),

    FOREIGN KEY (type_id) REFERENCES food_types (type_id)
);

CREATE TABLE orders
(
    id         INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id    INT                            NOT NULL,
    food_id    INT                            NOT NULL,
    amount     INT DEFAULT (0),
    code       VARCHAR(1000),
    arr_sub_id VARCHAR(100),

    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (food_id) REFERENCES foods (food_id)
);

CREATE TABLE rate_res
(
    user_id   INT NOT NULL,
    res_id    INT NOT NULL,
    amount    INT NOT NULL,
    date_rate DATETIME,

    PRIMARY KEY (user_id, res_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (res_id) REFERENCES restaurants (res_id)
);

CREATE TABLE like_res
(
    user_id   INT NOT NULL,
    res_id    INT NOT NULL,
    date_like datetime,

    PRIMARY KEY (user_id, res_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (res_id) REFERENCES restaurants (res_id)
);


-- Users
INSERT INTO `users` (full_name, email, password)
VALUES ('Trần Văn A', 'van.a@example.com', 'password123'),
       ('Nguyễn Thị B', 'thi.b@example.com', 'securepwd456'),
       ('Lê Thị C', 'thi.c@example.com', 'qwerty789'),
       ('Hoàng Văn D', 'van.d@example.com', 'password123'),
       ('Phạm Văn E', 'van.e@example.com', 'securepwd456'),
       ('Nguyễn Thị F', 'thi.f@example.com', 'qwerty789'),
       ('Trần Thị G', 'thi.g@example.com', 'password123'),
       ('Hoàng Văn H', 'van.h@example.com', 'securepwd456'),
       ('Lê Thị I', 'thi.i@example.com', 'qwerty789'),
       ('Nguyễn Văn K', 'van.k@example.com', 'password123');

-- Food Types
INSERT INTO `food_types` (type_name)
VALUES ('Ý'),
       ('Mexican'),
       ('Trung Quốc'),
       ('Ấn Độ'),
       ('Nhật Bản'),
       ('Mỹ'),
       ('Thái Lan'),
       ('Pháp'),
       ('Hy Lạp'),
       ('Địa Trung Hải');

-- Restaurants
INSERT INTO `restaurants` (res_name, image, description)
VALUES ('Cung Đình Pizza', 'cung_dinh_pizza.jpg', 'Nơi tốt nhất trong thành phố cho người yêu pizza'),
       ('Thiên Đường Taco', 'thien_duong_taco.jpg', 'Ẩm thực Mexico chân thực'),
       ('Quán Rồng', 'quan_rong.jpg', 'Phục vụ các món Trung Hoa ngon'),
       ('Hốc Lửa', 'hoc_lua.jpg', 'Trải nghiệm hương vị của Ấn Độ'),
       ('Vương Quốc Sushi', 'vuong_quoc_sushi.jpg', 'Sushi Nhật Bản tươi ngon và chính hãng'),
       ('Góc Burger', 'goc_burger.jpg', 'Burger và khoai tây chiên thơm ngon'),
       ('Hương Vị Thái Lan', 'huong_vi_thai_lan.jpg', 'Thưởng thức hương vị của Thái Lan'),
       ('Quán Café Paris', 'quan_cafe_paris.jpg', 'Ẩm thực Pháp tinh tế'),
       ('Vườn Dầu Ôliu', 'vuon_dau_oliu.jpg', 'Hương vị Ý trong mỗi miếng'),
       ('Ốc Địa Trung Hải', 'oc_dia_trung_hai.jpg', 'Khám phá hương vị của Địa Trung Hải');

-- Foods
INSERT INTO `foods` (food_name, image, price, description, type_id)
VALUES ('Pizza Margherita', 'pizza_margherita.jpg', 10.99, 'Pizza Ý cổ điển với cà chua và phô mai', 1),
       ('Tacos al Pastor', 'tacos_al_pastor.jpg', 8.99, 'Tacos Mexico truyền thống với thịt lợn đã ướp', 2),
       ('Gà Kung Pao', 'ga_kung_pao.jpg', 12.99, 'Gà xào cay Trung Hoa với lạc và rau cải', 3),
       ('Cà Ri Gà Tikka', 'ca_ri_ga_tikka.jpg', 14.99, 'Cà ri Ấn Độ kem với thịt gà mềm', 4),
       ('Sushi Combo', 'sushi_combo.jpg', 18.99, 'Combo sushi và sashimi Nhật Bản', 5),
       ('Burger Phô Mai', 'burger_pho_mai.jpg', 9.99, 'Burger Mỹ với phô mai, rau diếp và cà chua', 6),
       ('Pad Thai', 'pad_thai.jpg', 11.99, 'Bún xào Thái truyền thống với tôm và đậu phụ', 7),
       ('Bánh Mì Pháp', 'banh_mi_phap.jpg', 13.99, 'Bánh mì Pháp với jambon và phô mai được phủ sốt béchamel', 8),
       ('Spaghetti Bolognese', 'spaghetti_bolognese.jpg', 12.99, 'Mỳ Ý với sốt thịt thơm ngon', 9),
       ('Salad Hy Lạp', 'salad_hy_lap.jpg', 8.99, 'Salad tươi với cà chua, dưa chuột, dầu ôliu và phô mai feta', 10);

-- Orders
INSERT INTO `orders` (user_id, food_id, amount, code, arr_sub_id)
VALUES (1, 1, 2, 'ORDER123', 'SUB123'),
       (3, 5, 3, 'ORDER789', 'SUB789'),
       (4, 7, 2, 'ORDER321', 'SUB321'),
       (5, 9, 1, 'ORDER654', 'SUB654'),
       (6, 2, 2, 'ORDER987', 'SUB987'),
       (7, 4, 1, 'ORDER135', 'SUB135'),
       (7, 4, 1, 'ORDER135', 'SUB135'),
       (8, 6, 3, 'ORDER246', 'SUB246'),
       (9, 8, 2, 'ORDER579', 'SUB579'),
       (10, 10, 1, 'ORDER468', 'SUB468'),
       (5, 10, 1, 'ORDER468', 'SUB468'),
       (3, 7, 1, 'ORDER468', 'SUB468'),
       (10, 10, 1, 'ORDER468', 'SUB468'),
       (5, 5, 1, 'ORDER468', 'SUB468'),
       (7, 6, 1, 'ORDER468', 'SUB468'),
       (4, 3, 1, 'ORDER468', 'SUB468'),
       (5, 10, 1, 'ORDER468', 'SUB468'),
       (5, 6, 1, 'ORDER468', 'SUB468'),
       (5, 6, 1, 'ORDER468', 'SUB468');

-- Rate Restaurants
INSERT INTO `rate_res` (user_id, res_id, amount, date_rate)
VALUES (1, 1, 5, '2024-03-01 10:00:00'),
       (3, 3, 4, '2024-03-03 12:00:00'),
       (4, 4, 3, '2024-03-04 13:00:00'),
       (5, 5, 5, '2024-03-05 14:00:00'),
       (6, 6, 4, '2024-03-06 15:00:00'),
       (7, 7, 3, '2024-03-07 16:00:00'),
       (8, 8, 5, '2024-03-08 17:00:00'),
       (9, 9, 4, '2024-03-09 18:00:00'),
       (10, 10, 5, '2024-03-10 19:00:00');

-- Like Restaurants
INSERT INTO `like_res` (user_id, res_id, date_like)
VALUES (1, 1, '2024-03-01 10:00:00'),
       (3, 3, '2024-03-03 12:00:00'),
       (4, 4, '2024-03-04 13:00:00'),
       (5, 5, '2024-03-05 14:00:00'),
       (6, 6, '2024-03-06 15:00:00'),
       (7, 7, '2024-03-07 16:00:00'),
       (8, 8, '2024-03-08 17:00:00'),
       (9, 9, '2024-03-09 18:00:00'),
       (10, 10, '2024-03-10 19:00:00'),
       (1, 10, '2024-03-10 19:00:00'),
       (4, 2, '2024-03-10 19:00:00'),
       (5, 3, '2024-03-10 19:00:00'),
       (4, 1, '2024-03-10 19:00:00'),
       (3, 8, '2024-03-08 17:00:00'),
       (4, 10, '2024-03-08 17:00:00'),
       (1, 3, '2024-03-10 19:00:00'),
       (1, 2, '2024-03-10 19:00:00'),
       (4, 9, '2024-03-08 17:00:00'),
       (6, 1, '2024-03-08 17:00:00');


SELECT users.user_id,
       users.full_name,
       users.email,
       COUNT(like_res.user_id) as like_count
FROM users
         LEFT JOIN like_res
                   ON users.user_id = like_res.user_id
GROUP BY users.user_id
ORDER BY like_count DESC
LIMIT 5
;

SELECT restaurants.res_id,
       restaurants.res_name,
       COUNT(like_res.res_id) as liked_count
FROM restaurants
         LEFT JOIN like_res
                   ON restaurants.res_id = like_res.res_id
GROUP BY restaurants.res_id
ORDER BY liked_count DESC
LIMIT 2
;

SELECT users.user_id,
       users.full_name,
       users.email,
       COUNT(orders.user_id) as order_count
FROM users
         LEFT JOIN orders
                   ON users.user_id = orders.user_id
GROUP BY users.user_id
ORDER BY order_count DESC
LIMIT 1
;

SELECT users.user_id,
       users.full_name,
       users.email
FROM users
         LEFT JOIN like_res
                   ON users.user_id = like_res.user_id
         LEFT JOIN orders
                   ON users.user_id = orders.user_id
         LEFT JOIN rate_res
                   ON users.user_id = rate_res.user_id
WHERE like_res.user_id IS NULL
          && orders.user_id IS NULL
          && rate_res.user_id IS NULL
;
