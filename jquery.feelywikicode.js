/* global jQuery */
jQuery.feelywiki = {
	//标题位置
	"titleElem" : "title",
	//Wiki内部链接URL前缀
	"wikiPrefix" : "/wiki/",
	//设置标题 
	"init": function(obj){
		if(obj.titleElem != undefined && obj.titleElem != "") this.titleElem = obj.titleElem;
		if(obj.wikiPrefix != undefined && obj.wikiPrefix != "") this.wikiPrefix = obj.wikiPrefix;
	},
	//开始转换 
	"start" : function(s){
		var lines = s.split("\n\n");
		for(var i = 0; i < lines.length; i++){
			lines[i] = this.__lineProcess(lines[i]);
		}
		return lines.filter(function(b){return b!="";}).join("");
	},
	
	//以下是私有成员函数
	
	//行处理器 
	"__lineProcess" : function(s){
		//带有控制功能。
		s = s.replace(/\(\:title (.+)\:\)/ig, this.__setTitle);
		
		//不带p标签
		var t = this.__notParagraph(s);
		if(t != "") return t;
		
		//包含在p标签中。
		s = s.replace(/'''''(.+)'''''/ig, "<b><i>$1</i></b>");
		s = s.replace(/'''(.+)'''/ig, "<b>$1</b>");
		s = s.replace(/''(.+)''/ig, "<i>$1</i>");
		s = s.replace(/\{_(.+)_\}/ig, "<u>$1</u>");
		s = s.replace(/\{\+(.+)\+\}/ig, "<big>$1</big>");
		s = s.replace(/\{-(.+)-\}/ig, "<small>$1</small>");
		
		//链接和图片
		s = s.replace(/\[\[(http[s]?:\/\/.+) \| (http[s]?:\/\/.+\.(jpg|png|gif|jpeg)) x(\d+)\]\]/ig, function(){
		    return "<a href=\""+arguments[1]+"\" target=\"_blank\"><img src=\""+arguments[2]+"\" width=\""+arguments[4]+"\"></a>";
		});
		s = s.replace(/\[\[(http[s]?:\/\/.+) \| (http[s]?:\/\/.+\.(jpg|png|gif|jpeg))\]\]/ig, function(){
		    return "<a href=\""+arguments[1]+"\" target=\"_blank\"><img src=\""+arguments[2]+"\"></a>";
		});
		s = s.replace(/\[\[(http[s]?:\/\/.+) \| (.+)\]\]/ig, function(){
		    return "<a href=\""+arguments[1]+"\" target=\"_blank\">"+arguments[2]+"</a>";
		});
		s = s.replace(/\[\[(.+) \| (.+)\]\]/ig, function(){
		    return "<a href=\""+ jQuery.feelywiki.wikiPrefix +arguments[1]+"\">"+arguments[2]+"</a>";
		});
		s = s.replace(/\[\[(http[s]?:\/\/.+\.(jpg|png|gif|jpeg)) x(\d+)\]\]/ig, function(){
		    return "<img src=\""+arguments[1]+"\" width=\""+arguments[3]+"\">";
		});
		s = s.replace(/\[\[(http[s]?:\/\/.+\.(jpg|png|gif|jpeg))\]\]/ig, function(){
		    return "<img src=\""+arguments[1]+"\">";
		});
		s = s.replace(/\[\[(http[s]?:\/\/.+)\]\]/ig, function(){
		    return "<a href=\""+arguments[1]+"\" target=\"_blank\">"+arguments[1]+"</a>";
		});
		s = s.replace(/\[\[(.+)\]\]/ig, function(){
		    return "<a href=\""+ jQuery.feelywiki.wikiPrefix +arguments[1]+"\">"+arguments[1]+"</a>";
		});
		
		if(s != "") s = "<p>" + s + "</p>";
		return s;
	},
	"__notParagraph" : function(s){
		var flag = false;
		var list = "n";
		var table = false;
		//原始文本
		var org = false;
		var t = s.replace(/\{code=((.|\n)*)=\}/igm, function(){
			org = true;
			return "<code><pre>" + arguments[1] + "</pre></code>";
		});
		t = t.replace(/\{=((.|\n)*)=\}/igm, function(){
			org = true;
			return arguments[1];
		});
		if(org) return t;
		
		//分隔线和标题
		s = s.replace(/={7,}/ig, function(res0){
			flag = true;
			return "<hr>";
		});
		s = s.replace(/======(.+)======/ig, function(res0, res1){
			flag = true;
			return "<h6>" + res1 + "</h6>";
		});
		s = s.replace(/=====(.+)=====/ig, function(res0, res1){
			flag = true;
			return "<h5>" + res1 + "</h5>";
		});
		s = s.replace(/====(.+)====/ig, function(res0, res1){
			flag = true;
			return "<h4>" + res1 + "</h4>";
		});
		s = s.replace(/===(.+)===/ig, function(res0, res1){
			flag = true;
			return "<h3>" + res1 + "</h3>";
		});
		s = s.replace(/==(.+)==/ig, function(res0, res1){
			flag = true;
			return "<h2>" + res1 + "</h2>";
		});
		s = s.replace(/=(.+)=/ig, function(res0, res1){
			flag = true;
			return "<h1>" + res1 + "</h1>";
		});
		//列表
		s = s.replace(/(# (.+).*)+/ig, function(){
			flag = true;
			list = "ol";
			return "<li>" + arguments[2] + "</li>";
		});
		s = s.replace(/(\* (.+).*)+/ig, function(){
			flag = true;
			list = "ul";
			return "<li>" + arguments[2] + "</li>";
		});
		if(list=="ol") s = s.replace(/<li>(.*)<\/li>(.|\n)*/igm, function(){return "<ol>" + arguments[0] + "</ol>";});
		else if(list=="ul") s = s.replace(/<li>(.*)<\/li>(.|\n)*/igm, function(){return "<ul>" + arguments[0] + "</ul>";});
		//表格
		s = s.replace(/\|\|((.+)\|\|)+/ig, function(){
			flag = true;
			table = true;
		    var tds = arguments[2].split("||");
		    for(var i=0; i<tds.length; i++){
		        if(tds[i][0]==":") tds[i] = tds[i].replace(/:(.*)/, "<th>$1</th>");
		        else tds[i] = "<td>"+tds[i]+"</td>";
		    }
		    return "<tr>"+tds.join("")+"</tr>";
		});
		if(table) s = s.replace(/<tr>(.*)<\/tr>(.|\n)*/igm, function(){return "<table border=\"1\">" + arguments[0] + "</table>";});
		
		//收集文本:
		if(flag) return s;
		else return "";
	},
	"__setTitle" : function(res0, res1){
		jQuery(jQuery.feelywiki.titleElem).html(res1);
		return "";
	}
};