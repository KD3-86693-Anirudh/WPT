const express = require("express")
const db = require('../db')
const utils = require('../utils')
// const crypto= require('crypto-js')
// const jwt = require('jsonwebtoken')
// const config = require('../config')
const multer = require('multer')  //import multer 

const upload = multer({dest:'images'}) //create the obj to upload the files :-the upload here is a middleware


const router=express.Router()

//use the middleware (upload) a single icon using multer

router.post('/', upload.single('icon'),(request,response)=>{
    const {title,details}=request.body
    console.log("title and details :",title,details)
    //get name of uploaaded file
    const fileName = request.file.filename
    console.log("$",fileName)
    const statement=`insert into category (title,details,image) values(?,?,?)`
    db.pool.execute(
        statement,
        [title,details,fileName],
        (error,categories)=>{
            response.send(utils.createResult(error,categories))
        }
        )
})

router.get('/',(request,response)=>{
    // console.log(request.userId)
    const statement = `select id,title,details,image from category;`
    db.pool.query(statement,(error,categories)=>{
        response.send(utils.createResult(error,categories))
    })
})
module.exports=router;