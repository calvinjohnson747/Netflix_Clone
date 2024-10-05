const mysql = require('mysql2');
require('dotenv').config();


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'Users'
  });

db.connect((err) =>{
    if(err){
      console.error('Error connecting to database:',err);
      return;
    }
    console.log('Connected to database User');
  })

const login = (req,res)=>{
    const userid = req.params.userid;
    const password = req.params.password;
    console.log(`Received userid: ${userid}, password: ${password}`);
    const query = 'SELECT * FROM users WHERE userid=? AND password=?';
    
    db.execute(query, [userid, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            console.log('Login successful for user:', userid);
            res.status(200).json({ message: 'Login successful', user: results[0] });
        } else {
            console.log('Invalid credentials for user:', userid);
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
};

const signup = async(req, res)=>{
    const userid = req.params.userid;
    const password = req.params.password;

    const isAvailable = await verify(userid);
    if(isAvailable){
        const query = 'INSERT INTO users (userid, password) VALUES (?, ?)'

        db.execute(query,[userid,password],(err,result)=>{
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            else {
                console.log('Inserted new user:', userid);
                res.status(200).json({ message: 'Insert successful',user:result[0] });
            }
        })
    }else {
        res.status(400).json({ error: 'Username unavailable, try another username' });
    }
}

function verify(userid){
    return new Promise((resolve,reject)=>{
        const query = 'SELECT * FROM users WHERE userid=?'
    db.execute(query, [userid], (err,result)=>{
        if(err){
            console.error('Error executing query',err);
            reject(false);
        }
        if(result.length>0){
            console.log('Username unavailable, try another username');
            resolve(false);
        }
        else{
            console.log('Username available');
            resolve(true);
            }
        });
    }); 
};

module.exports ={
    login,
    signup
}
  