const db = require('../model/model.js')

module.exports = {
//   All general api controllers will go here
  testController: async (req, res, next) => {
    try {
      console.log('test')
      const data = await db.query('SELECT * FROM "public"."post_table" LIMIT 100')
      console.log(data)
      next()
    } catch(err) {
      console.log(err)
      next(err)
    }
  }

  
}
