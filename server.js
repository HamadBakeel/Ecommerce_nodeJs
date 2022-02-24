import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.set('view engine', 'ejs')
app.set('views','views')
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);


app.get('/',(req,response)=>{
    fetch('https://dummyjson.com/products?limit=12&select=id,title,price,rating,discountPercentage,thumbnail')
        .then(res => res.json())
        .then(r1 =>
            {fetch('https://dummyjson.com/products/categories')
                .then(r2 => r2.json())
                .then(r2 => response.render('index', { products: r1.products, categories: r2 }))
        })
    
});

app.get("/products?:category", (req, response) => {
    var url = 'https://dummyjson.com/products';
    if (!req.query.category)
        url += '?select=title,price,rating,discountPercentage,thumbnail';

    else
        url += '/category/' + req.query.category;

    fetch('https://dummyjson.com/products/categories')
        .then(r2 => r2.json())
        .then(r2 => {
            fetch(url)
                .then(res => res.json())
                .then(res => response.render('categories', { products: res.products, categories: r2 }))
        });
})


app.get("/products/:p_id?", (req, response) => {
    if (req.params.p_id) {
        fetch('https://dummyjson.com/products?limit=3&select=title,price,rating,discountPercentage,thumbnail')
            .then(res1 => res1.json())
            .then(r1 => {
                fetch('https://dummyjson.com/products/categories')
                    .then(r2 => r2.json())
                    .then(r2 => {

                        fetch('https://dummyjson.com/products/' + req.params.p_id)
                            .then(res2 => res2.json())
                            .then(r3 => response.render('product-details', { products: r1.products, categories: r2, product: r3, }))
                    })
            });
    }
});



// app.get('/categories',(req,res)=>{
//     fetch('https://dummyjson.com/products/categories')
//                     .then(r2 => r2.json())
//                     .then(r2 => res.render("categories",{categories: r2}));
// })


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
