!function(){"use strict";let e,t,n,o,i,a,l,s,r=[];function d(){l=$(this),function(e){let t,n=$(e);t=parseInt($(n).offset().top)-$("header").height(),i&&a&&(i.destroy(),a.destroy(),i=void 0,a=void 0),$(window).scrollTo(t,{duration:500,onAfter:()=>{m()}})}(l.find("a").attr("href"))}function c(e,t){if(e&&void 0===t){e.preventDefault();let n=$(this).parents("ul").eq(0);t=n.find("li").index(this)}r.forEach(e=>{!function(e,t){e.removeClass("active"),e.eq(t).addClass("active")}(e,t)})}function u(t){t.stopPropagation(),e.toggleClass("menu-visible")}function m(){let e=$("header").height();i=new Gumshoe(".menu a",{offset:e+10,events:!0}),a=new Gumshoe(".indicators a",{offset:e+10,events:!0})}function p(){let e=$(".panels");e.removeClass("owl-carousel"),e.trigger("destroy.owl.carousel"),window.innerWidth>=768&&window.innerWidth<1200&&(e.addClass("owl-carousel"),$(".owl-carousel").owlCarousel({items:2,autoplay:!0,loop:!0,slideBy:1,dots:!1,autoplayHoverPause:!0,mouseDrag:!1,touchDrag:!0,pullDrag:!0,margin:25,autoplayTimeout:8e3}))}let f,h,b,g,v,w,y,k,C={development:[2500,1e3],panel:[1e3,800],redesign:[1e3,1e3],"redesign-multi":[2e3,1e3],gallery:[300,100],"gallery-multi":[500,150],"contact-form":[400,100],"contact-form-multi":[500,150],parallax:[300,150],"parallax-multi":[300,150],"blog-multi":[800,400]},x={pages:[[2500,250],[1e3,250]],streaming:[[100,50],[100,50]],"streaming-multi":[[100,50],[100,50]],animations:[[100,80],[50,50]],"animations-multi":[[100,80],[50,50]]};function _(e){let t=Array.from($(`tbody td:nth-of-type(${e}) input.price`)),n=[];return t.length>0?(t.forEach(e=>{n.push(parseInt(e.value))}),n.reduce((e,t)=>e+t)):0}function W(e,t){$(`tfoot td:nth-of-type(${e}) .sum`).text("PLN "+t)}function D(e){e.preventDefault(),e.stopPropagation();let t=$(this),n=t.parent();h=n.next("td"),f=n.find("input");let o=parseInt(h.text()),i=t[0].className;"plus"===i&&o++,"minus"===i&&o--,o<0&&(o=0),h.text(o),f[0].value=function(e,t,n,o,i){let a=parseInt(h.text());return o=parseInt(o),"PLN"===t&&(0===a&&(o=0),1===a&&("plus"===i&&(o+=x[e][0][0]),"minus"===i&&(o-=x[e][0][1])),a>1&&("plus"===i&&(o+=x[e][0][1]),"minus"===i&&(o-=x[e][0][1]))),"EUR"===t&&(0===a&&(o=0),1===a&&("plus"===i&&(o+=x[e][1][0]),"minus"===i&&(o-=x[e][1][1])),a>1&&("plus"===i&&(o+=x[e][1][1]),"minus"===i&&(o-=x[e][1][1]))),o}(f[0].name,"PLN",f[0],f[0].value,i),W(2,_(2)),W(4,_(4))}function P(e){e.preventDefault(),e.stopPropagation(),g=$("section#calculator .overlay-container.send"),b=$("section#calculator .overlay-contents"),g.fadeIn(200),b.fadeIn({duration:150,start:function(){this.style.display="flex"},complete:function(){document.body.style.overflowY="hidden",w=(void 0).validate({messages:{email:{required:"Adres e-mail nie może być pusty.",email:"Wpisany adres e-mail jest niepoprawny."}}})}}),$("button.send.send-quote").on("click",()=>{(void 0).validate(),(void 0).valid()&&(b.fadeOut(150),g.fadeOut({duration:200,complete:function(){$(document.body).removeAttr("style"),resetForm()}}))})}function z(e){e.preventDefault();let t=$(this),n=$(this).parent(),o=$(n).find("input"),i=$(n).find("button:visible")[0].className,a=$("#js-panel-add-button"),l=$("#js-blog-remove-button"),s="js-blog-add-button"===t.attr("id"),r="js-panel-remove-button"===t.attr("id");s&&a.trigger("click"),r&&!l.is(":hidden")&&l.trigger("click"),o[0].value="add"===i?function(e,t){return"PLN"===t?C[e][0]:"EUR"===t?C[e][1]:0}(o[0].name,"PLN"):0,$(n).find("button").removeClass("hidden"),t.addClass("hidden"),W(2,_(2)),W(4,_(4))}function I(){v=$(".calculator-container"),window.innerWidth<1024&&(v.hide(),v.attr("id",""),$(".calculator-info-text").hide(),$("button.add, button.remove").off("click",z),$("button.plus, button.minus").off("click",D),$("button.send").off("click",P)),window.innerWidth>=1024&&($("#calculator").attr("id","calculator"),v.show(),$(".calculator-info-text").show()),window.innerHeight<1024&&$("#calculator").css("height","auto"),s=$("form")[0],$("button.add, button.remove").on("click",z),$("button.plus, button.minus").on("click",D),$("button.send").on("click",P),$(".tooltip").tooltipster({theme:"tooltipster-light",side:"top",delay:0,timer:0}),$(".tooltip-left").tooltipster({theme:"tooltipster-light",side:["right"],delay:0,timer:0,maxWidth:300,contentCloning:!0,contentAsHTML:!0})}function E(){y.data("carousel").deactivate(),y.attr("style",""),y.html("").html(k),L()}function L(){y=$("#gallery"),k=y.html(),$(window).off("resize",E),$(window).on("resize",E),$(".ref-button").on("click",(function(){window.open($(this).data().href,"_blank")})),window.innerWidth>=1024&&(console.log("called"),y.Cloud9Carousel({buttonLeft:$("#buttons > .left"),buttonRight:$("#buttons > .right"),autoPlay:!0,bringToFront:!0,farScale:.35,yRadius:140,xRadius:480,fps:60,itemClass:"gallery-item",frontItemClass:"gallery-front-item",onLoaded:()=>{y.css("display","none"),y.css("visibility","visible"),console.log(y),y.fadeIn(300),$(".gallery-item img").reflect({opacity:.2,height:.185})}}))}$(window).on("load",()=>{t=$(".menu li"),o=$(".indicator"),r=[...r,t,o],r.forEach(e=>e.on("click",c)),e=$(".menu"),n=$(".hamburger"),n.on("click",u),$(window).on("click",()=>{e.removeClass("menu-visible")}),AOS.init({disableMutationObserver:!0,once:!0}),window.innerWidth>=768&&particlesJS("stars",{particles:{number:{value:355,density:{enable:!0,value_area:789.1476416322727}},color:{value:"#7ED4F6"},shape:{type:"circle",stroke:{width:0,color:"#7ED4F6"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.48927153781200905,random:!1,anim:{enable:!0,speed:.2,opacity_min:0,sync:!1}},size:{value:2,random:!0,anim:{enable:!0,speed:2,size_min:0,sync:!1}},line_linked:{enable:!1,distance:150,color:"#7ED4F6",opacity:.4,width:1},move:{enable:!0,speed:.2,direction:"none",random:!0,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"bubble"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:83.91608391608392,size:1,duration:3,opacity:1,speed:3},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0}),window.innerWidth>=768&&window.innerWidth<1200&&p(),$(window).on("resize",p),m(),t.on("click",d),o.on("click",d),$(".logo").on("click",()=>{t.eq(0).trigger("click")}),$("button#see-more").on("click",()=>{t.eq(1).trigger("click")}),L(),$(".preloader").fadeOut(),$(window).on("resize",()=>{I(),window.innerWidth<1024&&($("body").css("overflow",""),$(".overlay-container").hide(),$(".overlay-contents").hide())}),I(),$(window).on("resize",I)})}();
