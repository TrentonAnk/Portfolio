var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
	socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'Bamazon_db'
})

connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected as id' + connection.threadId);
	startBuying();
})

function printStuff(res) {
	var table = new Table({
		head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity']
		, colWidths: [10, 45, 40, 8, 8]
	});
	for (var i = 0; i < res.length; i++) {
		table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
	}
	console.log(table);
}

var startBuying = function() {
	connection.query('SELECT * FROM products', function(err, res) {
		printStuff(res);
		var choiceArray = [];
		for (var i = 0; i < res.length; i++) {
			choiceArray.push(res[i].product_name);
		}
		inquirer.prompt([{
			name: 'item_id',
			type: 'input',
			message: 'Which item would you like to purchase? (Enter the Item ID)'
		},
		{
			name: 'quantity',
			type: 'input',
			message: 'How many would you like to purchase?'
		}]).then(function(answer) {
			console.log(answer);
			var item_id = answer.item_id;
			console.log(item_id);
			var chosenItem = res[item_id-1];
			console.log(chosenItem);
			var newQuantity = chosenItem.stock_quantity - answer.quantity;
			if (newQuantity >= 0) {
				connection.query('UPDATE products SET ? WHERE item_id = ?', [{ stock_quantity: newQuantity }, item_id]);
				
			} else {
				console.log('There are not enough in stock for you to purchase that many.');
				
			}
		})
	})
}
