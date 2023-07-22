let express = require('express');
let router = express.Router();

let Order = require('../models/order');
let Store = require('../models/store');
let Cart = Store.Cart;
let Book = Store.Book;

module.exports.displayOrderList = async (req, res, next) => {
    // Order.find((err, orderList) => {     // Old way from Tom's video -> throw new MongooseError('Model.create() no longer accepts a callback');
    //     if(err)
    //     {
    //         return console.error(err);
    //     }
    //     else 
    //     {
    //         res.json(orderList);
    //     }
    // })
    try
    {
        let orderList = await Order.find()
        res.json(orderList);
    }
    catch (err)
    {
        console.log(err);
    }



}


module.exports.processAddPage = async (req, res, next) => {
    // SERIALIZE THE CART DATA

    let cart = new Cart();

    // Serialize the Line Data
    for (let line of req.body.cart.lines)
    {
        let book = new Book(
            line.book._id,
            line.book.name,
            line.book.author,
            line.book.description,
            line.book.price
        );
        let quantity = line.quantity;
        cart.lines.push({book, quantity})
    }

    cart.itemCount = req.body.cart.itemCount;
    cart.cartPrice = req.body.cart.cartPrice;


    // Create a new Order Object
    let newOrder = new Order({
        "name" : req.body.name,
        "address" : req.body.address,
        "city" : req.body.city,
        "province" : req.body.province,
        "postalCode" : req.body.postalCode,
        "country" : req.body.country,
        "shipped" : req.body.shipped,        
        "cart" : cart
    })

    // Add a new Order Object to the Database
    // Order.create(newOrder, (err, Order) => {     // Old way from Tom's video -> throw new MongooseError('Model.create() no longer accepts a callback');
    //     if(err)
    //     {
    //         console.log(err);
    //         res.end(err);
    //     }
    //     else 
    //     {
    //         res.json({success: true, msg: 'Successfully added New Order'});
    //     }
    // })

    try 
    {
        await newOrder.save();
        res.json({success: true, msg: 'Successfully added New Order'});
    } 
    catch (err)
    {
        console.log(err);
        res.status(500).send(err);
    }

}