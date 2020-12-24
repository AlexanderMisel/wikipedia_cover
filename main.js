
// ==UserScript==
// @name              维基百科用户屏蔽工具
// @namespace         https://github.com/Hyijun/wikipedia_cover
// @version           1.5.6
// @icon              https://zh.wikipedia.org/favicon.ico
// @description       维基百科上的一个用户屏蔽工具，它能删除一些您不希望看到用户的留言
// @author            Hyijun
// @license           GNU
// @supportURL        https://github.com/Hyijun/wikipedia_cover/issues
// @match             *://zh.wikipedia.org/wiki/Wikipedia*
// @match             *://zh.wikipedia.org/wiki/User_talk:*
// @match             *://zh.wikipedia.org/wiki/User:*
// @match             *://zh.wikipedia.org/wiki/*Talk*:*
// @match             *://zh.wikipedia.org/wiki/Talk:*
// ==/UserScript==

//By Hyijun. 如有问题请联系作者：https://github.com/Hyijun/wikipedia_cover/issues

//将你需要屏蔽的用户写在这个数组中，以逗号（半角）分隔，名字用双引号（半角）包围起来，不需要User:前缀
//例子：var users = ["User1", "User2", "User3"];
var users = ["Any_user"];

//如果您不熟悉js语言，请不要修改以下代码
var url = window.location.href;
var matre = /.*?zh.wikipedia.org\/wiki\/(Wikipedia.*?|User_talk:.*?|User:.*?|.*?Talk.*?:.*?|Talk:.*?)/img;
if (!matre.test(url)){
    console.log("因为处于条目空间，屏蔽工具未运行。");
}else{
    console.log("屏蔽工具正在运行。");
    var users_name = users.join("|");
    var s1 = document.getElementById("mw-content-text").innerHTML;
    var re1 = new RegExp("<(p|dd|li|ul)>.*?User:(" + users_name +")[\\s\\S]*?</(p|dd|li|ul)>", "igm");
    s1 = document.getElementById("mw-content-text").innerHTML = s1.replace(re1, "<small><div>[已删除一段留言]</div></small>");

    // flow page
    var bdi = document.getElementsByTagName('bdi');
    for (var index = bdi.length - 1; index >= 0; index--) {
        var el = bdi[index];
        if (el.innerHTML.match('^' + users_name + '$')) {
            el.parentElement.parentElement.parentElement.parentElement.remove()
        }
    }
}
