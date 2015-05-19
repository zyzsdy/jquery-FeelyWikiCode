#jquery_FeelyWikiCode

用法：

参考test.html的写法。

如果要设置标题，必须先初始化：

    $.feelywiki.setTitle("#title");

直接将字符串传入start方法来得到结果：

    var result = $.feelywiki.start($("#source").val());
	$("#result").html(result);
    
=================

基本排版语法：

换行： 两次换行可以产生一个新的段落。而只有一个换行则被替换为一个空格。

各级标题： &lt;h1>到&lt;h6>的标题可以通过下面的语法来设置：
    
    =h1=
    ==h2==
    ===h3===
    ====h4====
    =====h5=====
    ======h6======
    
等号个数如果等于或者超过7个，就会变成一条分割线：

    =======
    分割线
    
有序列表和无序列表：

    使用*来表示无序列表，使用#来表示有序列表。
    例如：
    
    有序列表：
    # order1
    # order2
    # order3
    # order4
    
    无序列表：
    * item1
    * item2
    * item3
    * item4
    



设定标题的不同显示法:

    (:title 标题:)
    我们推荐这一句放置在文档开始。

