//2024-04-11 김준서
const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const allBooks = (req, res) => {
    let {category_id, news } = req.query;

    let sql = 'SELECT * FROM Bookshop.books';
    let values = [];
    if (category_id && news){
        sql += ' WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
        values = [category_id, news];
    } else if(category_id){
        sql += ' WHERE category_id = ?';
        values = category_id;
    } else if(news) {
        sql += ' AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
        values = news;
    }
    conn.query(sql, values,
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
                    }
                    
            if(results.length)
                return res.status(StatusCodes.OK).json(results);
            else
                return res.status(StatusCodes.NOT_FOUND).end();
            })
    
};


const bookDetail = (req,res) => {
    let {id} = req.params;
  
    let sql = `SELECT * FROM Bookshop.books LEFT JOIN Bookshop.category 
                ON books.category_id = category.id WHERE books.id=?`;
    conn.query(sql, id,
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            
            if(results[0])
                return res.status(StatusCodes.OK).json(results[0]);
            else
                return res.status(StatusCodes.NOT_FOUND).end();
    })
};

module.exports = {
    allBooks, 
    bookDetail, 
};
