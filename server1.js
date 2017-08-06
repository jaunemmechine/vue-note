/**
 * Created by maggie on 2017/3/31.
 */
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
//添加静态资源中间件 可以加载js或css等静态资源
app.use(express.static(__dirname));
app.use(bodyParser.json());


app.listen(3001);

//设置服务器路由
app.get("/user",function (req,res) {

    console.log(req.query);
    res.send([{username:'tom',age:18}]);
});

app.post("/user",function (req,res) {
    console.log(req.body);
    var user = req.body;
     user.age=25;
    res.send(user);
})

app.get('/',function (req,res) {
    res.sendFile("./21.http请求.html",{root:__dirname});
})

