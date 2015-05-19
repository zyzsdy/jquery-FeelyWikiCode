#jquery_FeelyWikiCode

这是一个jQuery的插件。目的是提供一种类Wiki的标记语言的前端转换。
用于构造非可视化编辑器。

用法：

参考test.html的写法。

如果要设置标题，必须先初始化：

    $.feelywiki.init({
		"titleElem" : "#title", //标题元素
		"wikiPrefix" : "/wiki/", //用于内部链接的地址前缀
	})

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
    
粗体，斜体和粗斜体：

    ''我是斜体''
    '''我是粗体'''
    '''''我是粗斜体'''''
    
下划线，大字体和小字体，删除线：

    注意，这些标签不能重复嵌套。如果你希望获得更大的字体，请参考下面的字体样式设置。
    {_下划线字体_}
    {+大字体+}
    {++比大更大++}
    {-小字体-}
    {--更小的字体--}
    {~删除线~}
    
表格:

    按照下面的代码可以创建一个表格， 在单元格内容前面加“:”，可以作为标题行。
    ||:Title1||:Title2||:Title3||
    ||AAA||BBB||CCC||
    ||DDD||EEE||FFF||
    
原始文本和代码文本：

    如果想要不转义某些字符，将他们包裹在{= =}中。
    比如：
        {='''这些代码不会转义。'''=}
    如果你贴入了一段代码。可以使用下面的方法：
    {code=
        //Your codes here...
    =}
    注： 代码的显示样式由<code>标签提供，如果你需要代码着色，在该程序执行完毕后使用另外的程序。

链接和图片：

    注意竖线“|”的前后均有空格。
    Wiki内部链接的URL前缀在Init时设置。 
    
    普通外部超链接
    [[http://www.baidu.com]]
    
    重命名的外部超链接
    [[http://www.baidu.com | 百度]]
    
    Wiki内部链接
    [[Index]]
    
    重命名的Wiki内部链接
    [[Index | 首页]]
    
    图片，仅支持jpg,jpeg,png,gif的后缀
    [[http://blog.zyzsdy.com/wordpress/wp-content/themes/feelyblog/img/avatar.jpg]]
    
    限定大小的图片
    [[http://blog.zyzsdy.com/wordpress/wp-content/themes/feelyblog/img/avatar.jpg x300]]
    
    图片超链接
    [[http://www.baidu.com | http://blog.zyzsdy.com/wordpress/wp-content/themes/feelyblog/img/avatar.jpg]]
    
    限定大小的图片超链接
    [[http://www.baidu.com | http://blog.zyzsdy.com/wordpress/wp-content/themes/feelyblog/img/avatar.jpg x300]]
    
对齐，浮动和样式：

    支持4种样式的产生：color, size, align, float
    在一整段里都会保持这种格式。
    下面是使用示例：
    
    %color=red float=right size=20px%
    ||:TITLE||:dfadsfa||
    ||AA||BB||
    
    %align=center%
    居中
    
    %align=right%
    右对齐
    
内嵌样式：

    内嵌样式仅限使用color和size属性。
    例子：
    内嵌样式是这样的，这里是{%color=red% 红字}。这里是{%size=20px% 设定字号为20px}。这些是其他文字。


设定标题的不同显示法:

    (:title 标题:)
    我们推荐这一句放置在文档开始。

