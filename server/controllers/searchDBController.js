const db = require('../model/model.js')

module.exports = {

  getPostInfo: async (req, res, next) => {
    try {
        const { username } = req.params;
        let post_tableQuery;
        // check if username exists and assigns query accordingly
        if (username) post_tableQuery = `SELECT * FROM "public"."post_table" WHERE username = '${username}' LIMIT 10`
        else post_tableQuery = 'SELECT * FROM "public"."post_table" LIMIT 10'

        // running query to get postInfo and assign to res.locals.reviews
        const data = await db.query(post_tableQuery);
        res.locals.reviews = data.rows;
        next()
    } catch(err) {
        next({
            log: "error in getPostInfo middleware",
            message: "error in getPostInfo middleware"
        })
    }
  },

  getBookInfo: async (req, res, next) => {
    try {
        // get array of reviews from res.locals
        const { reviews } = res.locals;
        // loop through reviews array and add book title and author based on book_id
        for (let element of reviews) {
            const { book_id } = element;
            const data = await db.query(`SELECT * FROM "public"."book_table" WHERE book_id = '${book_id}'`)
            const { title, author } = data.rows[0];
            element.title = title;
            element.author = author;
        }
        next()
    } catch(err) {
        next({
            log: "error in getBookInfo middleware",
            message: "error in getBookInfo middleware"
        })
    }
  },

  getRatingsInfo: async (req, res, next) => {
    try {
        // get array of reviews from res.locals
        const { reviews } = res.locals;
        // loop through reviews array and add book title and author based on book_id
        for (let element of reviews) {
            const { post_id } = element;
            const data = await db.query(`SELECT * FROM "public"."rating_table" WHERE post_id = '${post_id}'`)
            const { plotline, unpredictability, pace, writing_style, ending, overall_enjoyability } = data.rows[0];
            element.plotline = plotline;
            element.unpredictability = unpredictability;
            element.pace = pace;
            element.writing_style = writing_style;
            element.ending = ending;
            element.overall_enjoyability = overall_enjoyability;
            console.log("updated reviews:", reviews);
        }
        next()
    } catch(err) {
        next({
            log: "error in getRatingsInfo middleware",
            message: "error in getRatingsInfo middleware"
        })
    }
  },

  getHashIDs: async (req, res, next) => {
    try {
        // get array of reviews from res.locals
        const { reviews } = res.locals;
        console.log("reviews in tag", reviews);
        // loop through reviews array and add book title and author based on book_id
        for (let element of reviews) {
            const { post_id } = element;
            const data = await db.query(`SELECT * FROM "public"."post_hash_join" WHERE post_id = '${post_id}'`)
            const hashIDs = [];
            for (let element of data.rows) {
                console.log("individual hash_id", element);
                hashIDs.push(element.hash_id)
            }
            element.hashIDs = hashIDs;
            console.log("curr Element", element);
        }
        next()
    } catch(err) {
        next({
            log: "error in getHashIDs middleware",
            message: "error in getHashIDs middleware"
        })
    }
  }

  
}