/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/* コンストラクタ                                                                               */
/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
function ListGroup(){
    this.grouplist = [];
    this.callback = [];
    this.selectedGroupIndex = -1;
}

/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/* 内部定数                                                                                     */
/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
ListGroup.def =
{
    LISTENER_ADD    : "add",
    LISTENER_REMOVE : "remove",
    LISTENER_MOVE   : "move",
    LISTENER_SELECT : "select",
};

/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/* メソッド                                                                                     */
/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/************************************************************************************************/
/* 新規グループを、リストに追加                                                                 */
/************************************************************************************************/
ListGroup.prototype.
addGroup = 
function(groupname){
    var listelem;

    var nameDbl = this.getGroup(groupname);

    if( nameDbl == null ){
        // エレメント作成
        listelem = new Group(groupname,5);
        listelem.addEventListener("click", this.groupClickListener.bind(this) );

        this.grouplist.push( listelem );

        var newindex = this.grouplist.length - 1;

        /* コールバック */
        this.callCB( ListGroup.def.LISTENER_ADD, new this.CBResult( newindex, null, listelem ) );

        /* 追加の後にやらないと、選択コールバックと順番が入れ替わる */
        this.selectGroup( newindex );
    }

    return listelem;
}

/************************************************************************************************/
/* グループ名で、グループを、取得                                                               */
/************************************************************************************************/
ListGroup.prototype.
getGroup = 
function(groupname){
    var ret = null;

    var index = this.getGroupIndex( groupname );
    if( index != -1 ){
        ret = this.grouplist[index];
    }
    return ret;
}

/************************************************************************************************/
/* 選択中グループを、削除                                                                       */
/************************************************************************************************/
ListGroup.prototype.
removeGroup = 
function(){
    var group = this.getSelectGroup();
    if( group != null ){
        var removeindex = this.selectedGroupIndex;
        this.grouplist.splice( removeindex, 1 );

        if( this.selectedGroupIndex >= this.grouplist.length ){
            this.selectedGroupIndex--;
        }

        /* 要コールバック */
        this.callCB( ListGroup.def.LISTENER_REMOVE, new this.CBResult( null, removeindex, group ) );

        /* 削除の後にやらないと、選択コールバックと順番が入れ替わる */
        this.selectGroup( this.selectedGroupIndex );
    }
}

/************************************************************************************************/
/* 指定方向で、選択中グループを、移動                                                           */
/************************************************************************************************/
ListGroup.prototype.
moveGroup = 
function(direct){
    var ret = false;
    var curindex = this.selectedGroupIndex;
    var anchorindex;
    var curgroup = this.getSelectGroup();
    if( (direct != 0) && (this.grouplist.length >= 2)){
        /* とりあえず、始点と終点を決める。 */
        if( direct < 0 ){
        //左移動
            anchorindex = this.getPrevIndex();

            //左端のループ対応
            if( curindex < anchorindex ){
                this.grouplist.push(this.grouplist.shift());
            }else{
                this.swap(this.grouplist, curindex, anchorindex);
            }
        }else{
        //右移動
            anchorindex = this.getNextIndex();

            //右端のループ対応
            if( curindex > anchorindex ){
                this.grouplist.unshift(this.grouplist.pop());
            }else{
                this.swap(this.grouplist, curindex, anchorindex);
            }
        }

        /* 要コールバック */
        this.callCB( ListGroup.def.LISTENER_MOVE, new this.CBResult( anchorindex, curindex, curgroup ));

        this.selectGroup( anchorindex );
    }
}

/************************************************************************************************/
/* 指定要素を、選択中グループに、追加                                                           */
/************************************************************************************************/
ListGroup.prototype.
addElement = 
function( elem ){
    var ret = false;

    var group = this.getSelectGroup();
    if(group != null){
        group.addElem(elem);
        ret = true;
    }
}

/************************************************************************************************/
/* 選択中グループから、選択中要素を、削除                                                       */
/************************************************************************************************/
ListGroup.prototype.
removeElement = 
function(){
    var ret = false;

    var group = this.getSelectGroup();
    if(group != null){
        group.removeElement();
        ret = true;
    }
}

/************************************************************************************************/
/* コールバックを、登録                                                                         */
/************************************************************************************************/
ListGroup.prototype.
addListener = 
function(func){
    this.callback.push( func );
}

/************************************************************************************************/
/* 前インデックスを、取得                                                                       */
/************************************************************************************************/
ListGroup.prototype.
getPrevIndex = 
function(){
    var ret = this.grouplist.length - 1;
    if( this.selectedGroupIndex > 0 ){
        ret = this.selectedGroupIndex - 1;
    }
    return ret;
}

/************************************************************************************************/
/* 前グループを、選択                                                                           */
/************************************************************************************************/
ListGroup.prototype.
selectPrevGroup = 
function(){
    var newindex = this.getPrevIndex();
    this.selectGroup( newindex );
}

/************************************************************************************************/
/* 次インデックスを、取得                                                                       */
/************************************************************************************************/
ListGroup.prototype.
getNextIndex = 
function(){
    var ret = 0;
    if( this.selectedGroupIndex < this.grouplist.length - 1 ){
        ret = this.selectedGroupIndex + 1;
    }
    return ret;
}

/************************************************************************************************/
/* 次グループを、選択                                                                           */
/************************************************************************************************/
ListGroup.prototype.
selectNextGroup = 
function(){
    var newindex = this.getNextIndex();
    this.selectGroup( newindex );
}

/************************************************************************************************/
/* 前要素を、選択                                                                               */
/************************************************************************************************/
ListGroup.prototype.
selectPrevElem = 
function(){
    var group = this.getSelectGroup();
    if( group != null ){
        group.selectPrevElem();
    }
}

/************************************************************************************************/
/* 次要素を、選択                                                                               */
/************************************************************************************************/
ListGroup.prototype.
selectNextElem = 
function(){
    var group = this.getSelectGroup();
    if( group != null ){
        group.selectNextElem();
    }
}

/************************************************************************************************/
/* インデックスで、グループを選択                                                               */
/************************************************************************************************/
ListGroup.prototype.
selectGroup = 
function(index){
    if( index >= 0 ){
        this.selectedGroupIndex = index;
    }

    /* 要コールバック */
    this.callCB( ListGroup.def.LISTENER_SELECT, new this.CBResult( this.selectedGroupIndex, null, this.getSelectGroup) );

    /* レイアウト */
    var group = this.getSelectGroup();
    if( group != null ){
        for( var elem in this.grouplist ){
            this.grouplist[ elem ].classList().remove("select");
        }
        group.classList().add("select");
    }
}

/************************************************************************************************/
/* 全グループの情報を取得                                                                       */
/************************************************************************************************/
ListGroup.prototype.
getInfo = 
function(){
    var ret = [];
    for( var elem in this.grouplist ) {
        var info = {};

        info.name = this.grouplist[ elem ].getName();
        info.value = this.grouplist[ elem ].getValue();

        ret.push( info );
    }
    return ret;
}

/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/* イベントリスナー                                                                             */
/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/************************************************************************************************/
/* グループクリックリスナー                                                                     */
/************************************************************************************************/
ListGroup.prototype.
groupClickListener = 
function( event ){
    var group = event.currentTarget;

    var index = this.getGroupIndex( group.getName() );
    if( index != -1 ){
        this.selectedGroupIndex = index;
        this.selectGroup( this.selectedGroupIndex );
    }
}

/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/* ユーティリティ                                                                               */
/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/************************************************************************************************/
/* グループ名で、インデックスを、取得                                                           */
/************************************************************************************************/
ListGroup.prototype.
getGroupIndex = 
function( groupname ){
    var ret = -1;
    for( var i=0; i < this.grouplist.length; i++ ){
        var elem = this.grouplist[i];
        if ( elem.getName() === groupname ){
            ret = i;
            break;
        }
    }
    return ret;
}

/************************************************************************************************/
/* 選択中のグループを、取得                                                                     */
/************************************************************************************************/
ListGroup.prototype.
getSelectGroup = 
function(){
    return this.grouplist[this.selectedGroupIndex];
}

/************************************************************************************************/
/* 配列要素の入れ替え                                                                           */
/************************************************************************************************/
ListGroup.prototype.
swap = 
function(list, indexa,indexb){
    list[indexa] = [list[indexb], list[indexb] = list[indexa]][0]; 
}

/************************************************************************************************/
/* コールバック呼び出し                                                                         */
/************************************************************************************************/
ListGroup.prototype.
callCB = 
function( type, arg ){
    for( var i=0; i < this.callback.length; i++ ){
        var func = this.callback[i];
        func( type, arg );
    }
}

/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/* サブクラス */
/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
ListGroup.prototype.
CBResult = 
function( newindex, oldindex, group ){
    this.newindex = newindex;
    this.oldindex = oldindex;
    this.group = group;
}
