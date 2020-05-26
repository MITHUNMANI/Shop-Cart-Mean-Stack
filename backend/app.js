const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); //middleware for the data to be received in json data
const mongodb = require("mongodb").MongoClient;
const jwt = require('jsonwebtoken');
const app = express();
const multer = require('multer');
var db;      
app.use(cors());
app.use(bodyParser.json());
mongodb.connect("mongodb+srv://mithunsdb:mithunsdb@mithunscluster-c0yos.mongodb.net/test?retryWrites=true&w=majority",(error, database)=>{
    db = database.db("ShoppingCartMithun");
    console.log("DB Connected");
    });
    
/* FE N BE connections */
app.get("/", (req, res) => {
    res.json("home");
});

app.get("/listproducts", (req, res) => {
    // res.json(products);
    db.collection('products').find().toArray((error,data)=>{
        res.json(data);
    })
});
/*User Registration */
app.post("/register", (req, res) => { /* signup data */
    // console.log(req.body);
    req.body._id = new Date().getTime();
    db.collection("users").insert(req.body, (error, data) => { // insert method doesnt allow duplicate id
        if (error) { // save method will update the duplicate id           
            res.status(403).json("Error in insert query");
        } else {
            res.json("success");
        }
    });
});
app.post("/login", (req, res) => {  /* login data */
    // console.log(req.body);
    db.collection('users').find(req.body, {
        projection: {
            _id: 1,
            username: 1
        }
    }).toArray((error, data) => {
        if (error) {
            res.status(400).json('Error in select query');
        } else     
        var token = '';
        {
            if (data.length > 0){
             token = jwt.sign(data[0], 'mykey');
        }
             res.json(token);
        }
    }) 
});
/*User Registration */
/* middleware to verify token*/
var loggedUser;
function verifyToken(req, res, next)
{
   var token = req.headers.myauthkey;
   if (!token){
       return res.status(401).json('No Token Found');
   }
   jwt.verify(token, 'mykey',(error, data)=>{
       if(error){
           return res.status(401).json('Token Mismatch');
       }
       loggedUser = data;
    //    console.log(loggedUser);
   }); 
    next();
}
/* middleware to verify token*/
app.get('/view/', (req,res)=>{
    var query = {productcatId:Number(req.query.pdtcatid)};
    console.log(req.query);
db.collection('products').find(query).toArray((error, data)=>{
    res.json(data);
});
});
app.get('/mycart', verifyToken, (req,res)=>{
    // res.json('mycart');
    // console.log(req.headers.myauthkey);
    // console.log(req.headers);

    db.collection('cart').aggregate([{
        $match: {
            catUserId: loggedUser._id
        }},
        {
            $lookup:{
                from:'products',
                localField: 'cartPdtId',
                foreignField : '_id',
                as:'orderdetails'
            }
        }
    ]).toArray((error, data)=>{
        res.json(data);

    });
});
app.get('/categories', (req,res)=>{
    db.collection('Categories').find().toArray((error, data)=>{
        res.json(data);
    });
});
const myStorage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "src/assets/product_image");
    },
    filename: (req, file,cb )=>{
        cb(null, file.originalname+"-"+ new Date().getTime()+'.png');
    }
});

app.post('/addproducts', verifyToken,multer({storage: myStorage}).single('productImg'), (req, res)=>{
    // res.json('product added');
    req.body._id = new Date().getTime();
    req.body.productcatId = Number(req.body.productcatId); 
    req.body.productPrice = Number(req.body.productPrice);
    req.body.productImgPath = req.file.filename;
    // console.log(req.body);
    db.collection('products').save(req.body, (error, data) => { // insert method doesnt allow duplicate id
       res.json(data);
        })
}); 
app.get('/pdtcatwise/:catId', (req,res)=>{
    // console.log(req.params.catId);
    db.collection('products').find({productcatId: Number(req.params.catId)}).toArray((error,data)=>{
        res.json(data);
    })
});
app.post('/addtocart', verifyToken, (req,res)=>{
    req.body._id = new Date().getTime();
    req.body.catUserId = loggedUser._id;
    req.body.cartQty = 1; 
    // console.log(req.body);
    db.collection('cart').save(req.body, (error,data)=>{
        res.json(data);
    })
});
app.get('/cartcount', verifyToken, (req,res)=>{
    db.collection('cart').count({catUserId : loggedUser._id}, (error, data)=>{
        res.json(data);
    })
});
app.put('/updatecart',verifyToken, (req, res)=>{
    // console.log(req.body);
    var condition = {_id : req.body.cartId}
    var newValues = {$set: {cartQty: req.body.cartQty, cartPdtPrice: req.body.cartQty*req.body.pdtPrice}}
    db.collection('cart').update(condition, newValues, (error, data)=>{
        res.json(data);

    })
});
app.delete('/removecart/:cartid', verifyToken,(req,res)=>{
    console.log(req.params);
    db.collection('cart').deleteOne({_id: Number(req.params.cartId)},
    (error, data)=>{
        res.json(data);

    })
} );

module.exports = app;
