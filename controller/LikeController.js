// 2024-04-15 감준서
const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const addLike = (req,res) => {

    const {id} = req.params;
    const {user_id} = req.body;

    let sql = 'INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)';
    let values = [user_id, id];
    conn.query(sql, values,
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
    })
};

// SELECT count(*) FROM Bookshop.likes WHERE liked_book_id=1;
const removeLike = (req,res) => {
    const {id} = req.params;
    const {user_id} = req.body;

    let sql = ' DELETE FROM Bookshop.likes WHERE user_id = ? AND liked_book_id = ?';
    let values = [user_id, id];
    conn.query(sql, values,
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
    })
    
};

module.exports = {
    addLike,
    removeLike
};

