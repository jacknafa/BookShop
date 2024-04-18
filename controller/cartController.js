// 2024-04-16_김준서
const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const addToCart = (req, res) => {
    const {book_id, quantity, user_id} = req.body;

    let sql = 'INSERT INTO Bookshop.cartitems (book_id, quantity, user_id) VALUES (?, ?, ?);';
    let values = [book_id, quantity, user_id];
    conn.query(sql, values,
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
    })
};

// 2024-04-16_김준서
const getCartItems = (req, res) => {
    const {user_id, selected} = req.body;
    let sql = `SELECT Bookshop.cartitems.id, book_id, title, summary, quantity, price 
                FROM Bookshop.cartitems LEFT JOIN Bookshop.books 
                ON Bookshop.cartitems.book_id = books.id
                WHERE user_id=? AND Bookshop.cartitems.id IN (?)`;
        
    let values = [user_id, selected];
    conn.query(sql, values,
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
        
            return res.status(StatusCodes.OK).json(results);
        })
};

// 2024-04-16_김준서
const removeCartItem = (req, res) => {
    const {id} = req.params;

    let sql = 'DELETE FROM Bookshop.cartitems WHERE id = ?;';
    conn.query(sql, id,
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
    })
};

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
};