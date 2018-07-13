var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table")

var connection = mysql.createConnection({
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "Bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
});

function runProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var table = new Table(
            ["item_id", "product_name", "department_name", "price", "stock_quantity"],
            
        );

        //DISP 
        console.log("Buy Your Sports Memorbilia Today");
        console.log("+++++++++++++++++++++++++++++++++");
        for (var i = 0; i < results.length; i++) {
            
            table.push([results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
            console.log(table)
            console.log("++++++++++++++++++++++++++++++++")
        }
        console.log("Buy Your Sports Memorbilia Today!!")
        console.log(table);
        inquirer.prompt([{
                name: "item",
                type: "input",
                message: "What is the item ID you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many of this item would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }

            }
        ]).then(function (answer) {
            var chosenId = answer.item - 1
            var chosenProduct = results[chosenId]
            var chosenQuantity = answer.quantity
            if (chosenQuantity < results[chosenId].stock_quantity) {
                console.log("Your total for " + "(" + answer.quantity + ")" + " - " + results[chosenId].product_name + " is: " + results[chosenId].price * chosenQuantity);
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: results[chosenId].stock_quantity - chosenQuantity
                }, {
                    item_id: results[chosenId].item_id
                }], function (err, res) {
                    console.log(err)
                });

            } else {
                console.log("Sorry, insufficient Quanity at this time. All we have is " + results[chosenId].stock_quantity + " in our Inventory.");

            }
        })
    })
}


runProducts();