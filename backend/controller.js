const mysql = require('mysql2');

const hostname = '127.0.0.1';
const port = 3306;

const db = mysql.createConnection({
    host: hostname,
    port: port,
    user: 'calvin',
    password: 'Password123#',
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

module.exports ={
    login
}
  