const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "root",
    port: 5432,
    password: "root",
    database: "root"
})

client.connect();

client.query('Select * from restaurante', (err, res)=>{
    if(!err){
        console.log(res.rows);
    } else{
        console.log(err.message);
    }
    client.end
})