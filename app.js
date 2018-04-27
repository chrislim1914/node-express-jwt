const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to jwt api'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post Created...',
                authData
            })
        }
    });
});

app.post('/api/login', (req, res) => {
    //mock user
    const user = {
        id: 1,
        username: 'chrislim1914',
        email: 'lm.chrstphr.m@gmail.com'
    }

    jwt.sign({user: user}, 'secretkey', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token: token
        });
    });
});
//format token
//authorization: Bearer <access token>

//verify token
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undifined
    if(typeof bearerHeader !== 'undifined') {
        //split the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set token
        req.token = bearerToken;
        //next middleware
        next();
    } else {
        //forbidden
        res.sendStatus(403)
        // res.json({
        //     message: 'Access Denied!'
        // })
    }
}

app.listen(5000, () => console.log('Server start at port: 5000'));
