const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

const loginRoutes = require('./Routes/login');

app.use(bodyParser.urlencoded({extended:true}));

app.use(loginRoutes);

app.post('/message',(req,res,next)=>{
    res.send('<form onsubmit="document.getElementById(`username`).value = localStorage.getItem(`username`)" action="/save-msg" method="POST"><input id="message" type="text" name="message"><input id="username" type="hidden" name="username"><button type="submit">Send Message</button></form>');
})

app.get('/message',(req,res,next)=>{
    fs.readFile('message.txt',{encoding:'utf-8'},(err,data)=>{
        let name = JSON.parse(data);
        res.send(`<p>${name}</p><form onsubmit="document.getElementById('username').value = localStorage.getItem('username')" action="/save-msg" method="POST"><input id="message" type="text" name="message"><input id="username" type="hidden" name="username"><button type="submit">Send Message</button></form>`);
        })
    })

    

app.post('/save-msg',(req,res,next)=>{

    // console.log(req.body)

    fs.readFile('message.txt',{encoding:'utf-8'},(err,data)=>{
        if(err){
            // console.log(err)
        }
        // console.log(data)
        let temp = JSON.parse(data)
        temp.push(`${req.body.username}: ${req.body.message}`)
        fs.writeFile('message.txt',JSON.stringify(temp),(err)=>{
            // console.log(err);
        })
        res.redirect('/message')
    })
})

app.listen(4000);