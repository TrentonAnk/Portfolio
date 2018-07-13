USE Bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
)


INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Lebron James Shoes","Shoes",10000.00,2),
	   ("Kobe Bryant Shoes","Shoes",15000.00,3),
       ("Magic Johnson Jersey","jersey",12000.00,1),
       ("Steph Curry Hat","hat",500.00,4),
       ("Tom Brady Jersey","Jersey",20000.00,2),
       ("Allen Iverson Headband","hat",500.00,3),
       ("Tim Duncan Jersey","Jersey",10000.00,2),
       ("Lebron James Jersey","Jersey",18000.00,3),
       ("Kobe Bryant Jersey","Jersey",17000.00,4),
       ("Micheal Jordan Jersey","Jersey",20000.00,2)