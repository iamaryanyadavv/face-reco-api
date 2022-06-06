const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('success');
})

app.post('/signin', (req,res)=> { signin.signinHandler(req, res, db, bcrypt) })

app.post('/register', (req,res)=>{ register.registerHandler(req, res, db, bcrypt) })

app.get('/profile/:id', (req,res)=>{ profile.profileGetHandler(req, res, db, bcrypt) })

app.put('/image',(req,res)=>{ image.imageHandler(req, res, db, bcrypt) })

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`running on port ${process.env.PORT}`)
})
