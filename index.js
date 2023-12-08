require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json())

app.use(bodyParser.json())

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

const generateAccessToken = (credentials)=>{
    let accessToken = jwt.sign({ username : credentials.username }, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1m' });
    return accessToken;
}

const generateRefreshToken = (credentials)=>{
    let refreshToken = jwt.sign({ username : credentials.username }, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1h' });
    return refreshToken;
}

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


app.post('/login',(req,res)=>{
    const accessToken = generateAccessToken(req.body)
    res.send({accessToken:accessToken})
})


app.get('/students',verifyAccessToken,(req,res)=>{
    res.send(students)
})


app.listen(3000,()=>{
    console.log('Server started listening...')
})

