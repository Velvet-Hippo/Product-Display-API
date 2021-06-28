
CREATE TABLE products(
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(500),
  description VARCHAR(1000),
  category VARCHAR(100),
  default_price INT
);

CREATE TABLE features(
  feature_id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  feature_name VARCHAR(100),
  value VARCHAR(100),
  CONSTRAINT fk_features
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

CREATE TABLE styles(
  style_id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  style_name VARCHAR(100),
  original_price VARCHAR(10),
  sale_price VARCHAR(10),
  default_style INT,
  CONSTRAINT fk_styles
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

CREATE TABLE related(
  id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  related_product_id INT,
  CONSTRAINT fk_related
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

CREATE TABLE skus(
  skus_id INT PRIMARY KEY NOT NULL,
  style_id INT NOT NULL,
  size VARCHAR(10),
  quantity INT,
  CONSTRAINT fk_skus
    FOREIGN KEY(style_id)
      REFERENCES styles(style_id)
);

CREATE TABLE photos(
  photo_id INT,
  style_id INT,
  url VARCHAR(65000),
  thumbnail_url VARCHAR(65000),
  CONSTRAINT fk_photos
    FOREIGN KEY(style_id)
      REFERENCES styles(style_id)
);
