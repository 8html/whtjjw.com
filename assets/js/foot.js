(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);
function f_filterResults(a,b,c){a=a?a:0;if(b&&(!a||a>b))a=b;return c&&(!a||a>c)?c:a}function f_scrollTop(){return f_filterResults(window.pageYOffset?window.pageYOffset:0,document.documentElement?document.documentElement.scrollTop:0,document.body?document.body.scrollTop:0)};
function stick() {
	$('.zxkf').clearQueue().animate({top:f_scrollTop()+250});
	$('.dianhua').clearQueue().animate({top:f_scrollTop()+462});
}
$('.zxkf').hoverIntent({over: function(){$(this).animate({width:173, left:$(window).width()-173}, 200);}, out: function(){$(this).animate({width:33, left:$(window).width()-33}, 200);}, timeout: 500});
$('.dianhua').hoverIntent({over: function(){$(this).animate({width:226, left:$(window).width()-226}, 200);}, out: function(){$(this).animate({width:33, left:$(window).width()-33}, 200);}, timeout: 500});

$(window).scroll(function(){stick();});

$(document).ready(function(){$('.zxkf, .dianhua').show().css({'top':0, 'left':$(window).width()-33, 'width':33, 'position':'absolute', 'z-index':9999});stick();});

$(window).load(function(){
	$('.zxkf, .dianhua').show().css({'left':$(window).width()-33});});
	$(window).resize(function(){$('.zxkf, .dianhua').show().css({'left':$(window).width()-33, 'width':33, 'position':'absolute', 'z-index':9999});stick();});
/*fix footer*/
function getDocHeight(){var a=document;return Math.max(Math.max(a.body.scrollHeight,a.documentElement.scrollHeight),Math.max(a.body.offsetHeight,a.documentElement.offsetHeight),Math.max(a.body.clientHeight,a.documentElement.clientHeight))}$(function(){$("#wrapper").height()<getDocHeight()&&$("#footer").css("margin-top",parseInt($("#footer").css("margin-top"))+getDocHeight()-$("#wrapper").height()-parseInt($("#footer").css("margin-bottom")))});
