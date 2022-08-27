const db = require('../model/model.js')

module.exports = {

  addToBook_Table: async (req, res, next) => {
    try {
        // add username to res.locals
        res.locals.username = req.params.username;
        console.log("req.body", req.body);
        //destructure the request body
        const { title, author } = req.body;
        //query for adding to the book table
        const book_tableQuery = `INSERT INTO book_table (title, author) VALUES ('${title}', '${author}') RETURNING *`
        // adds book title and author to database if it doesnt exist
        const data = await db.query(book_tableQuery);
        console.log("addToBook_Table data: ", data.rows);
        next()
    } catch(err) {
        console.log("Book Already Exists");
        next()
    }
  },

  getBook_id: async (req, res, next) => {
    try {
        //destructure the request body
        const { title } = req.body;
        //query for getting book_id
        const book_tableQuery = `SELECT book_id FROM book_table WHERE title = $1`
        // params for getBook_id query
        const book_tableQueryParams = [title];
        // query execution 
        const data = await db.query(book_tableQuery, book_tableQueryParams);
        // add book_id to res.locals
        res.locals.book_id = data.rows[0].book_id;
        console.log("Current Book ID: ", res.locals.book_id);
        next();
    } catch(err) {
        next({
            log: "error in getBook_id middleware",
            message: "error in getBook_id middleware"
        })
    }
  },

  addToPost_Table: async (req, res, next) => {
    try {
        //destructure the request body
        const { comments } = req.body;
        //query for adding to post_table
        const post_tableQuery = `INSERT INTO post_table (username, comments, book_id) VALUES ($1, $2, $3) RETURNING *`
        // params for post_table query
        const post_tableQueryParams = [res.locals.username, comments, res.locals.book_id];
        // query execution 
        console.log("Post_table params", post_tableQueryParams);
        const data = await db.query(post_tableQuery, post_tableQueryParams);
        // adds post_id to res.locals
        res.locals.post_id = data.rows[0].post_id;
        console.log("res.locals.post_id", res.locals.post_id);
        console.log("addToPost_Table: ", data.rows);
        next();
    } catch(err) {
        console.log("Tags Already Exist");
        next({
            log: "error in addToPost_Table middleware",
            message: "error in addToPost_Table middleware"
        })
    }
  },

  addToHash_Table: async (req, res, next) => {
    try {
        //destructure the request body
        const { tags } = req.body;
        const tagsArray = tags.split(",");
        let insertIntoQuery = ""
        for (let i = 1; i <= tagsArray.length; i++) {
            if (i < tagsArray.length) {
                insertIntoQuery = insertIntoQuery.concat("($", i, "), ");
            } else {
                insertIntoQuery = insertIntoQuery.concat("($", i, ") ");
            }
        }
        //query for adding to post_table
        const hash_tableQuery = `INSERT INTO hash_table (hash) VALUES ${insertIntoQuery} RETURNING *`
        console.log("Tags Array: ", tagsArray);
        console.log("QUERY hash_table: ", hash_tableQuery);
        // query execution 
        const data = await db.query(hash_tableQuery, tagsArray);
        console.log("data added to hash_table", data.rows);
        next();
    } catch(err) {
        next({
            log: "error in addToHash_Table middleware",
            message: "error in addToHash_Table middleware"
        })
    }
  }

}
