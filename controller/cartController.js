
const ensureAuthorization = require('../auth');
const jwt = require('jsonwebtoken');
const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');


const addToCart = (req, res) => {
    const {book_id, quantity} = req.body;

    let authorization = ensureAuthorization(req,res);

    if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요"
        });
    }else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    }else{
        let sql = 'INSERT INTO Bookshop.cartitems (book_id, quantity, user_id) VALUES (?, ?, ?);';
        let values = [book_id, quantity, authorization.id];
        conn.query(sql, values,
            (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                return res.status(StatusCodes.OK).json(results);
        })
    }
};


const getCartItems = (req, res) => {
    const {selected} = req.body;

    let authorization = ensureAuthorization(req,res);

    if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요"
        });
    }else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    }else{
        let sql = `SELECT Bookshop.cartitems.id, book_id, title, summary, quantity, price 
                    FROM Bookshop.cartitems LEFT JOIN Bookshop.books 
                    ON Bookshop.cartitems.book_id = books.id
                    WHERE user_id=?`;
            
        let values = [authorization.id, selected];
        if(selected){
            sql += ` AND Bookshop.cartitems.id IN (?)`;
            values.push(selected);
        };

        conn.query(sql, values,
            (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
            
                return res.status(StatusCodes.OK).json(results);
            })
    }
};


const removeCartItem = (req, res) => {
    let authorization = ensureAuthorization(req,res);

    if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요"
        });
    }else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    }else{
        const cartItemId = req.params.id;

        let sql = 'DELETE FROM Bookshop.cartitems WHERE id = ?;';
        conn.query(sql, cartItemId,
            (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                return res.status(StatusCodes.OK).json(results);
        })
    }
};


module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
};