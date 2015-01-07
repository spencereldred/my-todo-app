function addColorProperty(e){var t=function(e){return this._color=e,this};for(var n in SOLARIZED_COLORS)t[n]=function(t){return function(){return e.color(SOLARIZED_COLORS[t])}}(n);e.color=t}var Montage=require("./core").Montage,Logger,loggers,consoleLog,emptyLoggerFunction,getFunctionName,toTimeString,LoggerUI,localStorage;loggers=exports.loggers={},getFunctionName=function(){var e,t=getFunctionName.caller.caller;return e=t.name,""===e&&(e="anonymous"),e},toTimeString=function(e){if(e.getHours){var t=e.getHours(),n=e.getMinutes(),i=e.getSeconds();return(1===t.length?"0"+t:t)+":"+(1===n.length?"0"+n:n)+":"+(1===i.length?"0"+i:i)+"."+e.getMilliseconds()}},emptyLoggerFunction=function(){},consoleLog=function(){console.log(arguments)},Logger=exports.Logger=Montage.specialize({constructor:{value:function Logger(){this.super(),addColorProperty(this)}},init:{value:function(e,t,n){if(this.name=e,this._onStateChange=t,this._storeState=!n,this._storeState&&localStorage){var i=localStorage.getItem("_montage_logger_"+e);i&&(this.isDebug="true"===i)}return t&&this._onStateChange("true"===i),this.isError=!0,this}},name:{value:null},buffer:{value:[],distinct:!0},buffered:{value:!1},flush:{value:function(){var e,t,n=this.buffer;for(t=0;e=n[t];t++)this._formattedLog(e);this.buffer.length=0}},isDebug:{get:function(){return this.debug!==emptyLoggerFunction},set:function(e){this.debug=e?this._consoleLogMontage:emptyLoggerFunction}},isError:{get:function(){return this.error!==emptyLoggerFunction},set:function(e){this.error=e?this._consoleLogMontage:emptyLoggerFunction}},_consoleLogMontage:{value:function(){var e=arguments[0],t=e._montage_metadata;new Date,t?(Array.prototype.shift.call(arguments),Array.prototype.unshift.call(arguments,t.objectName+"."+getFunctionName(e)+"()"),this.buffered?this.buffer.push(arguments):this._formattedLog(arguments)):this.buffered?this.buffer.push(arguments):this._formattedLog(arguments)}},_formattedLog:{value:function(e){var t=e[0];colors.isDebug&&"string"==typeof t&&Array.prototype.splice.call(e,0,1,"%c"+t,this._logCss),console.log.apply(console,e)}},__logCss:{value:null},_logCss:{get:function(){return null===this.__logCss&&(this.__logCss="",this.__logCss+=this._color?"color:"+this._color+";":"color:black;"),this.__logCss}},debug:{value:emptyLoggerFunction},error:{value:emptyLoggerFunction},toTimeString:{value:toTimeString},_storeState:{value:null},_onStateChange:{value:null}});var SOLARIZED_COLORS={base03:"#002b36",base02:"#073642",base01:"#586e75",base00:"#657b83",base0:"#839496",base1:"#93a1a1",base2:"#eee8d5",base3:"#fdf6e3",yellow:"#b58900",orange:"#cb4b16",red:"#dc322f",magenta:"#d33682",violet:"#6c71c4",blue:"#268bd2",cyan:"#2aa198",green:"#859900"};exports.logger=function(e,t,n){var i;return null==(i=loggers[e])&&(i=(new Logger).init(e,t,n),Montage.defineProperty(loggers,e,{value:i})),i},LoggerUI=Montage.specialize({constructor:{value:function LoggerUI(){this.super()}},init:{value:function(){return document.nativeAddEventListener?(document.nativeAddEventListener("keyup",this,!1),document.nativeAddEventListener("keydown",this,!1)):(document.addEventListener("keyup",this,!1),document.addEventListener("keydown",this,!1)),this}},inspectorElement:{value:null},m_dontRemove:{value:null},titleHeader:{value:null},shown:{value:!1},isCtrl:{value:!1},isAlt:{value:!1},keyup:{value:function(e){17==e.which&&(this.isCtrl=!1),18==e.which&&(this.isAlt=!1)}},keydown:{value:function(e){return 17==e.which&&(this.isCtrl=!0),18==e.which&&(this.isAlt=!0),76==e.which&&this.isCtrl===!0&&this.isAlt===!0?(this.shown?this.hideInspector():this.showInspector(),!1):void 0}},change:{value:function(e){var t=e.target.checked,n=e.target.value,i=loggers[n];i.isDebug=t,i._onStateChange&&i._onStateChange(t),i._storeState&&localStorage&&localStorage.setItem("_montage_logger_"+n,t)}},mouseup:{value:function(){this.hideInspector()}},showInspector:{value:function(){if(!this.inspectorElement){var e,t,n,i,r,a,o,s,u,l,c,d=0;for(this.m_dontRemove=document.getElementsByTagName("body")[0],this.inspectorElement=document.createElement("div"),this.inspectorElement.id="_montage_logger_inspector",t=document.createElement("div"),this.inspectorElement.appendChild(t),i=document.createElement("div"),t.appendChild(i),n=document.createElement("h1"),n.className="_montage_logger_inspector-title",n.textContent="Logger Inspector",this.titleHeader=n,i.appendChild(n),u=Object.keys(loggers),d=0;e=loggers[u[d]];d++)r=document.createElement("label"),a=document.createElement("input"),c=document.createElement("span"),r.className="_montage_logger_inspector-content",c.textContent=e.name,r.appendChild(a),r.appendChild(c),a.value=e.name,a.type="checkbox",a.checked=!!e.isDebug,s="_montage_logger_"+e.name,e._storeState&&localStorage&&(o=localStorage.getItem(s),null==o&&localStorage.setItem(s,e.isDebug)),i.appendChild(r);l=document.createElement("style");var h="#_montage_logger_inspector {";h+="    border: 1px solid rgba(15,15,15,0.4);",h+="    position: fixed;",h+="    right: 25px;",h+="    top: 25px;",h+="    -webkit-border-radius: 5px;",h+="    color: #dddddd;",h+='    font: 10px "Lucida Grande","Lucida Sans", sans;',h+="    background:-webkit-gradient(linear, left top, left bottom, from(rgba(15,15,15,0.75)), to(rgba(15,15,15,0.95)) );",h+="    -webkit-box-shadow: 0 0 15px rgba(0,0,0,.3);",h+="    width: 250px;",h+="}",h+="#_montage_logger_inspector div {",h+="    -webkit-border-radius: 5px;",h+="    background: -webkit-gradient(radial, 100 -60, 0, 125 -50, 125, from(rgba(255,255,255,0.00)), to(rgba(0,0,0,.2)), color-stop(1, rgba(0,0,0,.2)));",h+="}",h+="#_montage_logger_inspector div div {",h+="    background: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,0.2)), to(rgba(0,0,0,.1)), color-stop(0.33, rgba(255,255,255,.01)), color-stop(0.33, rgba(50,50,50,1)) );",h+="    padding: 7px 10px;",h+="    -webkit-border-radius: 3px;",h+="    overflow-x: hidden;",h+="}",h+="._montage_logger_inspector-title {",h+="    color: rgba(255,255,255,0.9);",h+="    font-size: 13px;",h+="    margin: 0 0 11px 0;",h+="    padding: 0 0 0 5px;",h+="}",h+="._montage_logger_inspector-content {",h+="    padding: 0 0 0 20px;",h+="    margin: 0;",h+="    display: block;",h+="}",l.textContent=h,document.head.appendChild(l)}this.shown=!0,this.m_dontRemove.appendChild(this.inspectorElement),this.titleHeader.nativeAddEventListener("mouseup",this,!1),this.inspectorElement.nativeAddEventListener("change",this,!1)}},hideInspector:{value:function(){document.getElementById("_montage_logger_inspector")&&(this.shown=!1,this.m_dontRemove.removeChild(this.inspectorElement),this.titleHeader.nativeRemoveEventListener("mouseup",this,!1),this.inspectorElement.nativeRemoveEventListener("change",this,!1))}},handleEvent:{enumerable:!1,value:function(e){this[e.type]&&this[e.type](e)}}});var setupUI=function(){(new LoggerUI).init()};if("undefined"!=typeof window){try{localStorage=window.localStorage}catch(e){console.log("Error accessing localStorage",e)}window.loggers=loggers,localStorage&&setupUI()}var colors=exports.logger("colors");