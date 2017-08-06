# Vue简介
     轻量级的MVM框架。简单，易学，易用。
## 不兼容IE8,全力支持H5的新标准，支持ES5版本
   对移动端webapp开发具有天然的优势
# Vue的使用
   1. 引用vue.js
   2. 在代码中创建一个vue对象实例
   ````
   var vm=new Vue({
           el:"#div1",//这个el就是选择器
           data:{
               msg:"hello world"
       }
       })

   ````
   vm对象是一个Vue的对象实例，它本身就使用是viewModul视图模型，相当于ng当中的$scope
   3. vm中的el属性就是dom选择器，通过它要绑定的元素，最终就通过
     document.querySelector(el)这个代码找到DOM对象，vm点的data就是要绑定的数据，
     可以在视图中{{msg}}来填充数据
## Vue实现数据的双向绑定
1. 可以在html元素上直接使用，v-model='msg'绑定数据，类似于ng中的ng-model或ng-bind命令
2. 数据只绑定一次，后面数据发生变化，不会跟着变化，可以使用* 只在vue_1.0有效
```
{{*msg}}
```
3. {{}}可以直接填充html代码，但不会解析，如果要解析，可以使用{{{ }}}填充 ，只在vue_1.0有效
4. {{ }}中填充数据，可以使用表达式，包括三目运算
5. vm中使用绑定的数据和原始数据时一个对象，所以vm对数据的修改会影响元数据，反之亦然
6. vm中的数据可以多次被重复绑定的
7. vm中的el选择器一旦绑定了DOM元素，则不能再修改
8. 可以通过$watch('数据名',function())
## Vue实例的生命周期
1. 如果在对象会直接创建vue对象时指定了el,那么vue被创建
2. 如果没有指定el,那么vue只会执行
## Vue对象的可计算属性
### 消除数据闪烁
````
<div v-text="msg"></div>
    <div v-cloak="msg">{{msg}}</div>
````
###  v-if和v-show的区别
1. v-if不能直接用于绑定的根元素，只能用于子元素,v-show可以
2. v-if判断的值如果为false所在标签不会出现在页面中，如果为true所在标签会出现在页面中，但是display是none,所以看不见
这一点与ng-if和ng-show/hidden是一样的
### <template>提供了一个可以绑定数据的虚拟标签，在实际绑定时，不会出现在html源码中，只会将其绑定的数据放如源码
### v-for的循环输出数组
1. 与ng不同，ng中实在父元素上使用ng-repeat指令，循环出子元素，而在Vue中直接在要循环的元素上使用v-for循环
2. 在vue1 中使用v-for 时，可以直接使用$index得到循环下标,但是在vue2中由于为声明变量一律不许使用，
   所以就没有$index了
3. 在vue1中 v-for="(key,value) in arry" 这种形式循环，并且key在前，value在后。
   在vue2中则要小心 v-for="(value,key) in arry " 是value在前，key在后
### v-for的循环输出对象
   1. v-for="item in object" 输出的是Object属性值
   2. 如果想要加属性名也输出，可以使用{{$key}},仅限于vue1
   3. 也可使用v-for="(key,value)in obj" 输出，其中key是属性名，value是属性值，中写法是vue1中，vue2中是
   v-for="(value，key)in obj"
### vue中的动态属性
1. 有些标签的原始属性属性需要绑定值，那么在vue中，可以使用：+属性名的形式
比如
```
<img :src={{Img}}> <a :href={{baidu}}>百度</a>
```
相当AngularJs于中的ng-src ng-href
## vue中使用v-on添加事件
1. v-on:click可以添加点击事件
2. 它的值是 vue实例中定义一个方法，这个方法可以放在methods属性中
3. 需要传递参数时，默认不会传入event对象，想要传入event对象需要使用$event


## 自定义指令
1. 使用Vue.directive定义的自定义属性
2. 的第一个参数是自定义指令的名字，不能带v-前缀
3. 第二个参数是个回调函数
4. vue1.0 中这个回调函数只有一个参，就是你给指令传递的值，他本质上在vm对象中的动态绑定的变量
5. vue2.0 这个回调函数有两个参数，第一个参数是el在DOM元素的

## 拖拽

## 动画


