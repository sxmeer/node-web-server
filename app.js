const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

hbs.registerPartials(__dirname+'\\views\\partials'); //for registering partials which can be used from hbs templates
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var log = `${req.method} ${new Date()}`;
    fs.appendFile('server.log', log+'\n',(err)=>{
        next();
    });
});

app.use((req,res,next)=>{
    res.render('maintenance');
})

app.use(express.static(__dirname+'\\public'))

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})//helper are functions which can be used by hbs to perform javascript functionality
//while rendering hbs first interpolation value is checked against helper function name and then the json passed

hbs.registerHelper('upperCase',(text)=>{
    return text.toUpperCase();
})//helper with argument


app.listen(3000,()=>{
    console.log(`started on ${3000}`);
})



app.get('/about',(req,res)=>{
    res.render('about',{
        header: 'about page',
        msg:'get lost'
    })
})

app.get('/maintenance',(req,res)=>{
    res.render('maintenance');
})

app.get('/bad',(req,res)=>{
    res.send({
        msg:'bad'
    })
})

app.get('/',(req,res)=>{
    res.render('home',{
        header:'home page',
        msg:'welcome to home page',
    })
})

