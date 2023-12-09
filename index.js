require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');

app.use(express.json())

app.use(cors({
origin:'*'
}))

//Middleware to parse JSON
app.use(bodyParser.json())

//students data is for the demo
const students = [
    {
        roll_no: "100",
        name:"Krishna"
    },
    {
        roll_no: "101",
        name:"Jack"
    },
    {
        roll_no: "102",
        name:"john"
    },
]

// Generates Access Token for 3 minutes
const generateAccessToken = (credentials)=>{
    let accessToken = jwt.sign({ username : credentials.username }, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '3m' });
    return accessToken;
}

// Generates the Refresh Token for 30 minutes
const generateRefreshToken = (credentials)=>{
    let refreshToken = jwt.sign({ username : credentials.username }, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '15m' });
    return refreshToken;
}

//Verifies the Refresh Token
const verifyRefreshToken = (req,res,next)=>{

    const {refreshToken} = req.body;

    try {

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        next(); 

      } catch(err) {
        if(err?.message==="jwt expired")
        {
            res.sendStatus(403) //403 Forbidden
        }
        else if(err?.message=="jwt must be provided")
        {
            res.sendStatus(401)  //401 Unauthorized
        }
      }
}

//verifies the Access Token
const verifyAccessToken = (req,res,next)=>{
    const token = req.headers['authorization'];
    try {

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        next(); 

      } catch(err) {
        if(err?.message==="jwt expired")
        {
            res.sendStatus(403) //403 Forbidden
        }
        else if(err?.message=="jwt must be provided")
        {
            res.sendStatus(401)  //401 Unauthorized
        }
      }
}


app.post('/refresh',verifyRefreshToken,(req,res)=>{
    const accessToken = generateAccessToken(req.body)
    res.send({accessToken:accessToken});
})

app.post('/login',(req,res)=>{
    const accessToken  = generateAccessToken(req.body)
    const refreshToken = generateRefreshToken(req.body)
    res.send({
    accessToken:accessToken,
    refreshToken:refreshToken
    })
})


app.get('/students',verifyAccessToken,(req,res)=>{
    res.send(students)
})


app.listen(3000,()=>{
    console.log('Server started listening...')
})

