//�C�ӂ̃u���E�U�̃p�X�ɏ���������
var strBrowserPath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
 
strBrowserPath = "\"" + strBrowserPath + "\"";
 
var keyword = Editor.GetSelectedString(0);
if( keyword == ""){
    Editor.GetSelectedString(0);
}

//�G���R�[�h���ĂȂ��Ǝ��s����orz
keyword = encodeURIComponent(keyword);
 
var strUrl = "https://www.google.co.jp/search?hl=ja&inlang=ja&q=" + keyword;
var shell = new ActiveXObject("WScript.Shell");
shell.Run(strBrowserPath + " \"" + strUrl + "\"");

param.winclose = true;
return param;
