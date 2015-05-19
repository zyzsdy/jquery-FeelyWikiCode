jQuery.feelywiki = {
	//标题位置
	"titleElem" : "title",
	//设置标题 
	"setTitle": function(title){
		this.titleElem = title;	
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
		
		if(s != "") s = "<p>" + s + "</p>";
		return s;
	},
	"__notParagraph" : function(s){
		var flag = false;
		var list = "n";
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
		if(list=="ol") s = s.replace(/<li>(.*)<\/li>(.|\n)*/igm, function(){return "<ol>" + arguments[0] + "</ol>"});
		else if(list=="ul") s = s.replace(/<li>(.*)<\/li>(.|\n)*/igm, function(){return "<ul>" + arguments[0] + "</ul>"});
		if(flag) return s;
		else return "";
	},
	"__setTitle" : function(res0, res1){
		$($.feelywiki.titleElem).html(res1);
		return "";
	}
}