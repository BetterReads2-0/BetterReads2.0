const db = require('../model/model.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  // look into why catch block doesn't catch db errror ... potentially b/c nested within bcrypt callback
  checkSignup: async (req, res, next) => {
    const { username, password, email } = await req.body;
    if(!username || !password || !email) res.status(422).send({error: 'You must provide a username, password and email.'});
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if(err) return next({ message:'There was an error with the signup request' });
      const accountsQuery = 'INSERT INTO accounts (username, password, email) VALUES ($1, $2, $3) RETURNING *';
      const accountsQueryParams = [username, hash, email];
      db.query(accountsQuery, accountsQueryParams).then(() => {
        res.locals.username = username;
        res.locals.hash = hash;
        res.locals.email = email;
        res.locals.userCreated = true;
        next();
      }).catch((err) => {
        console.log(err);
        res.locals.userCreated = false;
        return next();
      })
    });
  },

  checkLogin: async (req, res, next) => {
    try {
      const { username, password, email } = await req.body;
      const accountsQuery = 'SELECT * FROM accounts WHERE username = $1';
      const accountsQueryParams = [ username ];

      const data = await db.query(accountsQuery, accountsQueryParams);
      const userPass = await data.rows[0].password;
      await bcrypt.compare(password, userPass, (err, response) => {

          if(response === false){
            // catches when password is wrong but username exists
              res.locals.isUser = false;
          } else {
            res.locals.username = username;
            res.locals.hash = userPass;
            res.locals.email = email;
            res.locals.isUser = true
          }
          return next();
      });
    } catch(err) {
      // catches when username doesn't exist
      res.locals.isUser = false;
      next()
    }
  }
  
}
