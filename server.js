import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.set('view engine', 'ejs')
app.set('views','views')
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);


app.get('/',(req,response)=>{
    fetch('https://dummyjson.com/products?limit=30&skip=15&select=title,price,rating,discountPercentage')
    .then(res => res.json())
    .then(res => response.render('index', { Products: res.products }))
    // .then(console.log);
    // .then(response.render('index'))
    // .then(res => res.json())
    // .then(res => response.render('index'));
    response.render("index")
});
app.get('/index',(req,res)=>{
    res.render("index");
})
app.get('/home',(req,res)=>{
    res.render("index");
})
app.get('/product-details',(req,res)=>{
    res.render("product-details");
})
app.get('/checkout',(req,res)=>{
    res.render("checkout");
})
app.get('/store',(req,res)=>{
    res.render("store");
})
app.get('/categories',(req,res)=>{
    res.render("store");
})
