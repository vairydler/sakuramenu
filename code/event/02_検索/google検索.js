//任意のブラウザのパスに書き換える
var strBrowserPath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
 
strBrowserPath = "\"" + strBrowserPath + "\"";
 
var keyword = Editor.GetSelectedString(0);
if( keyword == ""){
    Editor.GetSelectedString(0);
}

//エンコードしてないと失敗するorz
keyword = encodeURIComponent(keyword);
 
var strUrl = "https://www.google.co.jp/search?hl=ja&inlang=ja&q=" + keyword;
var shell = new ActiveXObject("WScript.Shell");
shell.Run(strBrowserPath + " \"" + strUrl + "\"");

param.winclose = true;
return param;
