let express = require('express');
let router = express.Router();

let Order = require('../models/order');
let Store = require('../models/store');
let Cart = Store.Cart;
let Book = Store.Book;

module.exports.displayOrderList = async (req, res, next) => {
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


// module.exports.processEditPage = (req, res, next) => {
//     let id = req.params.id;

//     // Serialize Cart Data
//     let cart = new Cart();

//     // Serialize Line Data
//     for (let line of req.body.cart.lines)
//     {
//         let book = new Book(
//             line.book._id,
//             line.book.name,
//             line.book.author,
//             line.book.description,
//             line.book.price
//         );
//         let quantity = line.quantity;
//         cart.lines.push({book, quantity})
//     }

//     cart.itemCount = req.body.cart.itemCount;
//     cart.cartPrice = req.body.cart.cartPrice;

//     // Update the Order Object
//     let updatedOrder = Order({
//         "_id": id,
//         "name" : req.body.name,
//         "address" : req.body.address,
//         "city" : req.body.city,
//         "province" : req.body.province,
//         "postalCode" : req.body.postalCode,
//         "country" : req.body.country,
//         "shipped" : req.body.shipped,        
//         "cart" : cart
//     });

//     Order.updateOne({_id: id}, updatedOrder, (err) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else {
//             res.json({success: true, msg: "Successfully Edited Order", order: updatedOrder})
//         }
//     })
// }

// module.exports.performDelete = (req, res, next) => {
//     let id = req.params.id;

//     Order.deleteOne({_id: id}, (err)=> {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         } 
//         else {
//             res.json({success: true, msg: "Successfully Deleted Order"})
//         }
//     })
// }


module.exports.processEditPage = async (req, res, next) => {
    let id = req.params.id;

    // Serialize Cart Data
    let cart = new Cart();

    // Serialize Line Data
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

    // Update the Order Object
    let updatedOrder = Order({
        "_id": id,
        "name" : req.body.name,
        "address" : req.body.address,
        "city" : req.body.city,
        "province" : req.body.province,
        "postalCode" : req.body.postalCode,
        "country" : req.body.country,
        "shipped" : req.body.shipped,        
        "cart" : cart
    });

    try 
    {
        await Order.updateOne({_id: id}, updatedOrder);
        res.json({success: true, msg: "Successfully Edited Order", order: updatedOrder})
    } 
    catch (err)
    {
        console.log(err);
        res.status(500).send(err);
    }

}

module.exports.performDelete = async (req, res, next) => {
    let id = req.params.id;

    try 
    {
        await Order.deleteOne({_id: id});
        res.json({success: true, msg: "Successfully Deleted Order"})
    } 
    catch (err)
    {
        console.log(err);
        res.status(500).send(err);
    }

}