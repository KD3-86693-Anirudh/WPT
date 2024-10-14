const mysql=require('mysql2')
// const mysql=require('mysql')

    const pool = mysql.createPool({
        host:'localhost',
        user:'root',
        password:'manager',
        port:3306,
        database:'airbnb_db',
        connectionLimit:10,
    })

    module.exports={pool,}