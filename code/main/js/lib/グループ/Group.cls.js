/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/* コンストラクタ                                                                               */
/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/************************************************************************************************/
/* グループ                                                                                     */
/************************************************************************************************/
function Group(name,size){
	/* 引数補正 */
	name = name || "";
	size = size || 1;
	
	/* オブジェクト生成 */
	var ret = document.createElement("div");
	ret.prop =
	{
		name:"",
	};
	ret.dom =
	{
		name:null,
		list:null,
	};

	/* なんちゃって継承 */
	var keys = Object.keys(Group.prototype);
	for( var i = 0; i < keys.length; i++ )
	{
		ret[ keys[i] ] = this[ keys[i] ];
	}

	/* メンバDOMセット */
	ret.dom.name = document.createElement("div");
	ret.dom.list = document.createElement("select");

	/* 各種プロパティセット */	
	ret.classList().add("group");
	ret.dom.list.setAttribute("size",size);
	ret.setName(name);

	ret.appendChild( ret.dom.name );
	ret.appendChild( ret.dom.list );

	return ret;
}


/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/* プロトタイプフィールド                                                                       */
/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/* プロトタイプにcreateElementすると、どのインスタンスでも使い回されるのでダメだった。          */
/* プロトタイプにオブジェクトも、値か領域が使い回されるのでダメっぽい。                         */
/* これは無理っぽい。プロトタイプにはちゃんと設定されてるようなので、                           */
/* このインスタンスをnewする時になんか不備がでるのかな？                                        */
/* Group.prototype = HTMLDivElement.prototype;                                                  */

/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/* プロトタイプメソッド                                                                         */
/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/************************************************************************************************/
/* リスト要素追加                                                                               */
/************************************************************************************************/
Group.prototype.
addElem = 
function( value ){
	// エレメント作成
	var option = document.createElement("option");
	option.value     = value;
	option.innerHTML = value;

	// リストに値を追加
	this.dom.list.appendChild( option );
}

/************************************************************************************************/
/* リスト要素削除                                                                               */
/************************************************************************************************/
Group.prototype.
removeElement = 
function(){
	// 現在選択中のインデックスを保持。
	var selectindex = this.dom.list.selectedIndex;

	// 要素から削除
	var option = this.dom.list.getElementsByTagName("option");
	if( option.length > 1 ){
		option[selectindex].remove();
		
		// インデックスを選択
		if( this.dom.list.length <= selectindex ){
			selectindex = this.dom.list.length;
		}
		
		this.dom.list.selectedIndex = selectindex;
	}
}

/************************************************************************************************/
/* 名前設定                                                                                     */
/************************************************************************************************/
Group.prototype.
setName = 
function(val){
	this.dom.list.setAttribute("name",val);
	this.dom.name.innerText = val;
	this.prop.name = val;
}

/************************************************************************************************/
/* 名前取得                                                                                     */
/************************************************************************************************/
Group.prototype.
getName = 
function(){
	return this.prop.name;
}

/************************************************************************************************/
/* 値取得                                                                                       */
/************************************************************************************************/
Group.prototype.
getValue = 
function(){
	return this.dom.list.value;
}

/************************************************************************************************/
/* 前要素を選択                                                                                 */
/************************************************************************************************/
Group.prototype.
selectPrevElem = 
function(){
	var curindex = this.dom.list.selectedIndex;
	if( curindex > 0 ){
		this.dom.list.selectedIndex = curindex - 1;
	}else{
		var max = this.dom.list.length;
		this.dom.list.selectedIndex = max - 1;
	}
}

/************************************************************************************************/
/* 次要素を選択                                                                                 */
/************************************************************************************************/
Group.prototype.
selectNextElem = 
function(){
	var curindex = this.dom.list.selectedIndex;
	var max = this.dom.list.length;
	if( curindex < max - 1 ){
		this.dom.list.selectedIndex = curindex + 1;
	}else{
		this.dom.list.selectedIndex = 0;
	}
}

/************************************************************************************************/
/* 指定要素を選択                                                                                 */
/************************************************************************************************/
Group.prototype.
selectIndex = 
function( index ){
	var guardindex = index;
	guardindex = Math.max(0,guardindex);
	guardindex = Math.min(this.dom.list.length - 1,guardindex);
	this.dom.list.selectedIndex = guardindex;
}

/************************************************************************************************/
/* イベントリスナー拡張                                                                         */
/************************************************************************************************/
Group.prototype.
addEventListener =
function()
{
	this.dom.list.addEventListener.apply( this, arguments );
//	this.dom.list.addEventListener.apply( this.dom.list, arguments );
}

Group.prototype.
removeEventListener =
function()
{
	this.dom.list.removeEventListener.apply( this, arguments );
//	this.dom.list.removeEventListener.apply( this.dom.list, arguments );
}
