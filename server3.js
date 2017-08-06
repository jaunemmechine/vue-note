/**
 * Created by maggie on 2017/3/31.
 */
var express = require("express");
var bodyParser = require("body-parser");
var path=require('path');
var dbFliePath=path.join(__dirname,'./database/');
var Datastore=require('nedb');
var db={}
db.discusses=new  Datastore
(dbFliePath+'discusses.db')
db.discusses.loadDatabase()

var app = express();
//添加静态资源中间件 可以加载js或css等静态资源
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.listen(3002);

//设置服务器路由
app.get("/discuss",function (req,res) {
    db.discusses.find({},function (err,list) {
        res.send(list);
    })
});
/*添加留言数据
留言的数据格式
title;string
content;string
creatTime:Date.Dow()*/
app.post("/discuss",function (req,res) {
    var data=req.body;
    console.log(req.body);
    data.createTime=Date.now();
    db.discusses.insert(data,function (err,discuss) {
        res.send(discuss);

    })
})

app.get('/',function (req,res) {
    res.sendFile("./discusses.html",{root:__dirname});
})

