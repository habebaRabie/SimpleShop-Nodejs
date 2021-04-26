const express = require("express")
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json())

let products= [
    {
        serial: "123",
        name: "apple",
        price: "10L.E"
    },
    {
        serial: "456",
        name: "banana",
        price: "7L.E"
    }
]

let cart =[

]

//retreive all the products
app.get("/products", (req, res)=>{
    res.json(products)
})

//adding new product
app.post("/products", (req, res)=>{
    products.push(req.body);
    res.send(products)
})

//retreive specific product
app.get("/products/:serial", (req, res)=>{
    res.json(products.filter(el => el.serial === req.params.serial))
    
})


//adding specific product to the cart
app.post("/cart", (req, res)=>{
    let exist = false
    products.map((item)=>{
        if(item.serial === req.body.serial){
            exist = true;
        }
    })
    if (exist === true){
        cart.push(req.body);
        res.send(cart)
    }
    else{
        console.log("error")
        cart.push({});
        res.send(cart)
    }
})

//delete item from the cart
app.delete("/cart/:id", (req, res)=>{
    cart = cart.filter(el => el.serial !== req.params.serial);
    res.send(cart)
})

//to retreive all the products inside the cart
app.get("/cart", (req, res)=>{
    res.json(cart)
})

app.listen(3000, ()=>{
    console.log("server is running right now...")
})