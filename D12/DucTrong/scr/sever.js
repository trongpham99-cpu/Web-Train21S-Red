const express = require("express");
const Database = require("./database");
const bodyParser = require('body-parser');
const ShopItem = require("./models/shop-item.model");
const app = express();
const db = new Database();

app.use(bodyParser.json());

app.get("/items",(req,res)=>{
    const {id} = req.query;
    if(id!= undefined){
        res.send({
            item:db.getItemByID(id),
        });
        return;
    }
    res.send({
        items:db.getAllItems(),
    });
});

app.post("/items",(req,res)=>{
    const {id, name, price,inStock,discount}=req.body;
    try{
        db.createItem(new ShopItem(id,name,price,inStock,discount));
        res.status(201).send({
            message:`Item [${id}] was created`,
        });
    }catch(err){
        res.status(400).send({
            message:`invalid Item`,
        });
    }
});
module.exports= app;
