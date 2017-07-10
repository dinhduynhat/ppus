log={VERBOSITY:0,info:function(a){console.info("[INFO]",a)},warn:function(a){log.VERBOSITY<1||console.warn("[WARN]",a)},err:function(a){log.VERBOSITY<2||console.error("[ERROR]",a)},debug:function(a){log.VERBOSITY<3||console.debug("[DEBUG]",a)}};var LOAD_START=new Date;
var Quad={init:function(a){function b(a,b,c,d,e){this.x=a,this.y=b,this.w=c,this.h=d,this.depth=e,this.items=[],this.nodes=[]}var c=a.maxChildren||2,d=a.maxDepth||4;b.prototype={x:0,y:0,w:0,h:0,depth:0,items:null,nodes:null,exists:function(a){for(var b=0;b<this.items.length;++b){var c=this.items[b];if(c.x>=a.x&&c.y>=a.y&&c.x<a.x+a.w&&c.y<a.y+a.h)return!0}if(0!=this.nodes.length){var d=this;return this.findOverlappingNodes(a,function(b){return d.nodes[b].exists(a)})}return!1},retrieve:function(a,b){for(var c=0;c<this.items.length;++c)b(this.items[c]);if(0!=this.nodes.length){var d=this;this.findOverlappingNodes(a,function(c){d.nodes[c].retrieve(a,b)})}},insert:function(a){0!=this.nodes.length?this.nodes[this.findInsertNode(a)].insert(a):this.items.length>=c&&this.depth<d?(this.devide(),this.nodes[this.findInsertNode(a)].insert(a)):this.items.push(a)},getItemCount:function(){return 0!=this.nodes.length?this.nodes[0].getItemCount()+this.nodes[1].getItemCount()+this.nodes[2].getItemCount()+this.nodes[3].getItemCount():this.items.length},findInsertNode:function(a){return a.x<this.x+this.w/2?a.y<this.y+this.h/2?0:2:a.y<this.y+this.h/2?1:3},findOverlappingNodes:function(a,b){return!!(a.x<this.x+this.w/2&&(a.y<this.y+this.h/2&&b(0)||a.y>=this.y+this.h/2&&b(2))||a.x>=this.x+this.w/2&&(a.y<this.y+this.h/2&&b(1)||a.y>=this.y+this.h/2&&b(3)))},devide:function(){var a=this.depth+1,c=this.w/2,d=this.h/2;for(this.nodes.push(new b(this.x,this.y,c,d,a)),this.nodes.push(new b(this.x+c,this.y,c,d,a)),this.nodes.push(new b(this.x,this.y+d,c,d,a)),this.nodes.push(new b(this.x+c,this.y+d,c,d,a)),a=this.items,this.items=[],c=0;c<a.length;c++)this.insert(a[c])},clear:function(){for(var a=0;a<this.nodes.length;a++)this.nodes[a].clear();this.items.length=0,this.nodes.length=0}};var e={x:0,y:0,w:0,h:0};return{root:new b(a.minX,a.minY,a.maxX-a.minX,a.maxY-a.minY,0),insert:function(a){this.root.insert(a)},retrieve:function(a,b){this.root.retrieve(a,b)},retrieve2:function(a,b,c,d,f){e.x=a,e.y=b,e.w=c,e.h=d,this.root.retrieve(e,f)},getItemCount:function(){return this.root.getItemCount()},exists:function(a){return this.root.exists(a)},clear:function(){this.root.clear()}}}};
function Reader(a,b,c){this.view=a,this._e=c,this._o=0}Reader.prototype={reader:!0,getUint8:function(){return this.view.getUint8(this._o++,this._e)},getInt8:function(){return this.view.getInt8(this._o++,this._e)},getUint16:function(){return this.view.getUint16((this._o+=2)-2,this._e)},getInt16:function(){return this.view.getInt16((this._o+=2)-2,this._e)},getUint32:function(){return this.view.getUint32((this._o+=4)-4,this._e)},getInt32:function(){return this.view.getInt32((this._o+=4)-4,this._e)},getFloat32:function(){return this.view.getFloat32((this._o+=4)-4,this._e)},getFloat64:function(){return this.view.getFloat64((this._o+=8)-8,this._e)},getStringUTF8:function(){for(var b,a="";0!==(b=this.view.getUint8(this._o++));)a+=String.fromCharCode(b);return decodeURIComponent(escape(a))}};
function Writer(a){this._b=[],this._e=a,this._o=0}var __buf=new DataView(new ArrayBuffer(8));Writer.prototype={writer:!0,setUint8:function(a){a>=0&&a<256&&this._b.push(a)},setInt8:function(a){a>=-128&&a<128&&this._b.push(a)},setUint16:function(a){__buf.setUint16(0,a,this._e),this._move(2)},setInt16:function(a){__buf.setInt16(0,a,this._e),this._move(2)},setUint32:function(a){__buf.setUint32(0,a,this._e),this._move(4)},setInt32:function(a){__buf.setInt32(0,a,this._e),this._move(4)},setFloat32:function(a){__buf.setFloat32(0,a,this._e),this._move(4)},setFloat64:function(a){__buf.setFloat64(0,a,this._e),this._move(8)},_move:function(a){for(var b=0;b<a;b++)this._b.push(__buf.getUint8(b))},setStringUTF8:function(a){for(var b=unescape(encodeURIComponent(a)),c=0,d=b.length;c<d;c++)this._b.push(b.charCodeAt(c));this._b.push(0)},build:function(){return new Uint8Array(this._b)}};
function keydown(a){if(!$("#chat_textbox").is(":focus")){if(87==a.keyCode&&(canFeed=!0,feed()),67==a.keyCode&&(split(),setTimeout(split,150*Math.random()+200)),49!=a.keyCode&&83!=a.keyCode||split(),16==a.keyCode||52==a.keyCode)for(var b=0;b<4;b++)setTimeout(split,50*b);if(65==a.keyCode||51==a.keyCode)for(var c=0;c<3;c++)setTimeout(split,50*c);68!=a.keyCode&&50!=a.keyCode||(split(),setTimeout(split,50)),72==a.keyCode&&(X=window.innerWidth/2,Y=window.innerHeight/2,$("canvas").trigger($.Event("mousemove",{clientX:X,clientY:Y})))}}function keyup(a){87==a.keyCode&&(canFeed=!1)}function feed(){canFeed&&(window.onkeydown({keyCode:87}),window.onkeyup({keyCode:87}),setTimeout(feed,0))}function split(){$("body").trigger($.Event("keydown",{keyCode:32})),$("body").trigger($.Event("keyup",{keyCode:32}))}window.addEventListener("keydown",keydown),window.addEventListener("keyup",keyup);var canFeed=!1;
$.fn.extend({animateCss:function(n){this.addClass("animated "+n).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){$(this).removeClass("animated "+n)})}});
function upperCase(e){return e?e.charAt(0).toUpperCase()+e.slice(1):config.defaultmode}
jQuery.fn.extend({disable:function(e){return this.each(function(){this.disabled=e})}});
Array.prototype.rand=function(){return this[Math.floor(Math.random() * this.length)]}
var base={encode:function(n){return btoa(encodeURIComponent(n).replace(/%([0-9A-F]{2})/g,function(n,e){return String.fromCharCode("0x"+e)}))},decode:function(n){return decodeURIComponent(atob(n).split("").map(function(n){return"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)}).join(""))}};