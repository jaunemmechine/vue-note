# Vue简介
  轻量级的MVVM框架。简单,易学,易用。
## Vue不兼容IE8,全力支持H5的新标准,支持ES5版本
   对移动端WebAPP开发具有天然优势

## Vue的使用
 1. 引入vue.js文件
 2. 在js代码中创建一个 Vue对象实例
  ```html
    var vm = new Vue({
       el:"#div1",
       data:"Hello World"
    })
  ```
   这个vm对象是一个Vue的对象实例,它本身就是一个ViewModel视图模型,相当于ng当中的$scope

  3.  vm中el属性就是dom选择器,通过它筛选出要绑定的元素,
  最终就是通过 document.querySelector(el)这个代码找到dom对象,  vm中的data就是要绑定的数据,可以在视图中使用{{msg}}来填充数据
## Vue实现数据的双向绑定
  1. 可以在html元素上直接使用  v-model="msg"绑定数据,类似于ng中的ng-model或ng-bind指令
  
  2. 数据只绑定一次,后面数据发生变化,不会跟着改变,可使用*
           {{*msg}}
           
  3. {{}}可以直接填充html代码,但是不会解析,如果想要解析,可使用{{{}}}填充
  4. {{}}中填充数据,可以使用表达式,包括3目运算符
  
  5. vm中绑定的数据和原始数据是同一个对象,所以vm对数据的修改会影响原始数据,反之亦然。
  6. vm中的数据是可以多次重复绑定的。
  7. vm中的el选择器一旦绑定了DOM元素,则不能再次修改
  8. 可以通过$watch('数据名',function(new,old){})来监视数据是否发生变化
## Vue实例的生命周期
   1. 如果在创建vue对象时指定了el,那么vue对象会直接被创建
   2. 如果没指定el,那么vue对象只会执行完created函数,剩下的工作会在你手动调用vm.$mount之后执行
   3. $mount函数就是手动绑定DOM元素
   4. 最后调用$destroy函数会销毁vue对象
   ```html
      var vm = new Vue({
 //         el:"#div1",
          data:{
              msg:"hello"
          },
          created:function(){
              alert("vue对象被创建");
          },
          beforeCompile: function(){
              alert("编译html模板之前");
          },
          compiled:function(){
              alert("编译之后")
          },
          ready:function () {
              alert("准备好了");
          },
          beforeDestroy:function () {
              alert("销毁之前");
          },
          destroyed:function () {
              alert("已销毁");
          }
      });
   
   ```
   
 ## vue对象的可计算属性
 
 ### vue中的数据闪烁
 ```html
         两种方式都能消除数据闪烁
         <div  v-text="price"></div><br>
         <div  v-cloak>{{price}}</div>
 ```
 
### v-if 与 v-show的差别
  1. v-if不能直接用于绑定的根元素,只能用于子元素,v-show可以
  2. v-if判定的值如果是false,那么所在标签不会出现页面中
     v-show为false,所在标签会出现在页面中,但是display属性是none,所以看不见,这点和ng-if与ng-show/hidden是一样的

### template标签提供了一个可以绑定数据的虚拟标签,在实际显示是,template不会出现在html源码中,只会讲其绑定的数据放入源码
### v-for循环输出数组
  1. 与ng不同,ng中是在父元素上使用ng-repeat指令,循环出子元素。而在Vue中是直接在要循环的元素上使用v-for指令
  2. 在vue1中使用v-for时可以直接使用$index得到循环下标 ,但是在vue2中由于未声明变量一律不许使用了,所以就没有$index了。
  3. 在vue1中使用可以使用 v-for="(key,value) in array"这种形式
     循环,  并且  key在前,value在后。
     在vue2中则需要小心, v-for="(value,key) in array" 是value在前key在后。
### v-for循环输出对象
   1.  v-for="item in obj" 输出的是obj的属性值
   2.  如果想要将属性名也输出,可以使用{{$key}},仅限于vue1
   3.  也可使用 v-for="(key,value) in obj"输出,其中key是属性名
       value是属性值,中写法是vue1中的,vue2中应该是
       v-for="(value,key) in obj" 
### Vue中的动态属性
 1. 有些标签的原始属性需要绑定值,那么在vue中可以使用:+属性名的形式
   比如  <img :src="imgUrl">  <a :href="url">百度</a>
   相当于AngularJS中 ng-src ng-href属性
   
   
### Vue中使用v-on添加事件
  1.  v-on:click可以添加点击事件
  2. 它的值是 vue实例中定义的一个方法,这个方法要放在methods属性中
      ```html
          var vm = new Vue({
                      el: ".div1",
                      data: {
                          msg:"我的消息"
                      },
                      methods:{
                          showMsg:function (event) {
                              console.log(event);
                              alert(this.msg);
                          }
    
                      }
                  }
              )
      ```
      ```html
          <div class="div1" v-on:click="showMsg()" >
      ```
      ```html
          <div class="div1" v-on:click="showMsg" >
      ```
      这两种方式的差异在于第一种带圆括号的方式,调用时,event对象不会自动传入
      第2种不带圆括号会自动传入event对象。
  3. 需要传递参数时,默认不会传入event对象,想要传入event对象使用$event

  4. 可以用@click替代 v-on:click  @dbclick
  ```html
        <div @click="add($event,10,20)">
            这是第2个div
        </div>
  ```

## v-on事件修饰符
  1. v-on:click.stop修饰符 阻止事件冒泡
  2. @click.self 使得事件只在当前元素触发
  3. @click.prevent 阻止默认事件
  4. 键盘事件  @keyup.enter等 或@keyup.13 其中13是回车的键盘码
     键盘码缩写有 enter回车 esc退出 tab制表符 space空格 left right up down 等

## 样式的动态绑定  一般都是操作元素的class属性
 1.  使用{{}}赋值的方式直接绑定


##Vue与服务端的通讯
  1. 可以使用vue-resource插件与服务端通讯
  2. vue2.0中官方推荐使用axios插件替代
### 安装npm install vue-resource,找到node_modules文件夹下的vue-resource文件夹,复制dist/vue-resource.js文件到lib目录下
### vue-resource是按照Restful设计原则编写的http请求框架

### 编写简单服务端
 1. 安装express
  ```
    cnpm install  express
  ```
 2. 安装body-parser
   ```
      cnpm install body-parser
   ```
 3. 编写服务端代码
  