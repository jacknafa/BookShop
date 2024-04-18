const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const order = (req, res) => {
    const {items, delivery, totalQuantity, totalPrice, userId, mainBookTitle} = req.body;

    let delivery_id=3;
    let order_id=2;
    let sql = 'INSERT INTO Bookshop.delivery (address, receiver, contact) VALUES (?, ?, ?);';
    let values = [delivery.address, delivery.receiver, delivery.contact];
//     conn.query(sql, values,
//         (err, results) => {
//             if(err) {
//                 console.log(err);
//                 return res.status(StatusCodes.BAD_REQUEST).end();
//             }
//             delivery_id = results.insertId;
//             return res.status(StatusCodes.OK).json(results);
//     });

    sql = `INSERT INTO Bookshop.orders (book_title, total_quantity, total_price, user_id, delivery_id) 
            VALUES (?, ?, ?, ?, ?)`;
    values = [mainBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    // conn.query(sql, values,
    //             (err, results) => {
    //                 if(err) {
    //                     console.log(err);
    //                     return res.status(StatusCodes.BAD_REQUEST).end();
    //                 }
    //                 order_id = results.insertId;
    //                 return res.status(StatusCodes.OK).json(results);
    //         });

    sql = `INSERT INTO Bookshop.orderedBook (order_id, book_id, quantity) VALUES ?`;

    values = [];
    items.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity]);
    });
        conn.query(sql, [values],
                (err, results) => {
                    if(err) {
                        console.log(err);
                        return res.status(StatusCodes.BAD_REQUEST).end();
                    }
                    return res.status(StatusCodes.OK).json(results);
            });
};

const getOrders = (req, res) => {
    res.json('회원가입')
};

const getOrderDetail = (req, res) => {
    res.json('회원가입')
};

module.exports = {
    order,
    getOrders,
    getOrderDetail
};