const express = require("express")   //allow your server to accept all server req
const cors = require("cors")  //used for generating and verifying token for authentication and authorization purpose
const jwt = require("jsonwebtoken")
const config = require("./config")
const utils = require("./utils")  //reusable functions and helpers for your application 


const app = express() //create a new instance of the Express.js application which is the main entry point of your server




app.use(cors())  // enables CORS middleware for your application
//Enable JSON parsing for incommiing req 
//incoming req 
app.use(express.json())

app.use((request,response,next)=>{
    //check if token is required for the API
    if(
        request.url === '/user/login'||
        request.url === '/user/register'||
        request.url.startsWith('/image/')
    )
    {
        //skip verifying the token 
        next()
    }
    else
    {
        //get token 

        // const token = request.headers['token']
        const authtoken = request.headers.authorization;
        const token = authtoken.split(' ')[1];

        console.log("$ ",token);

        if (!token || token.length === 0){
            response.send(utils.createErrorResult('missing token'))
        }
        else
        {
            try
            {
                //verify token
                const payload = jwt.verify(token, config.secret)
                console.log("$$ ",payload)
                //add the user id to request 
                request.userId = payload['id']

                //TODo expiry logic
                //call the real route

                next()

            }
            catch(ex){
                response.send(utils.createErrorResult('invalid token'))
            }
        }
        // console.log("app not found")
    }
})



//add the router/

const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const propertyRouter = require('./routes/property')
const bookingRouter = require('./routes/booking')
const imageRouter = require('./routes/image')

const { request, response } = require("express")


app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/image', imageRouter)
app.use('/property', propertyRouter)
app.use('/booking', bookingRouter)




app.listen(4000,'0.0.0.0',()=>{
    console.log(`server started on pot 4000`)
})