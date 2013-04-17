jQuery.fn.extend({everyTime:function(interval,label,fn,times){return this.each(function(){jQuery.timer.add(this,interval,label,fn,times)})},oneTime:function(interval,label,fn){return this.each(function(){jQuery.timer.add(this,interval,label,fn,1)})},stopTime:function(label,fn){return this.each(function(){jQuery.timer.remove(this,label,fn)})}}),jQuery.extend({timer:{global:[],guid:1,dataKey:"jQuery.timer",regex:/^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1e3,das:1e4,hs:1e5,ks:1e6},timeParse:function(value){if(void 0==value||null==value)return null;var result=this.regex.exec(jQuery.trim(value.toString()));if(result[2]){var num=parseFloat(result[1]),mult=this.powers[result[2]]||1;return num*mult}return value},add:function(element,interval,label,fn,times){var counter=0;if(jQuery.isFunction(label)&&(times||(times=fn),fn=label,label=interval),interval=jQuery.timer.timeParse(interval),!("number"!=typeof interval||isNaN(interval)||0>interval)){("number"!=typeof times||isNaN(times)||0>times)&&(times=0),times=times||0;var timers=jQuery.data(element,this.dataKey)||jQuery.data(element,this.dataKey,{});timers[label]||(timers[label]={}),fn.timerID=fn.timerID||this.guid++;var handler=function(){(++counter>times&&0!==times||fn.call(element,counter)===!1)&&jQuery.timer.remove(element,label,fn)};handler.timerID=fn.timerID,timers[label][fn.timerID]||(timers[label][fn.timerID]=window.setInterval(handler,interval)),this.global.push(element)}},remove:function(element,label,fn){var ret,timers=jQuery.data(element,this.dataKey);if(timers){if(label){if(timers[label]){if(fn)fn.timerID&&(window.clearInterval(timers[label][fn.timerID]),delete timers[label][fn.timerID]);else for(var fn in timers[label])window.clearInterval(timers[label][fn]),delete timers[label][fn];for(ret in timers[label])break;ret||(ret=null,delete timers[label])}}else for(label in timers)this.remove(element,label,fn);for(ret in timers)break;ret||jQuery.removeData(element,this.dataKey)}}}}),jQuery(window).bind("unload",function(){jQuery.each(jQuery.timer.global,function(index,item){jQuery.timer.remove(item)})});