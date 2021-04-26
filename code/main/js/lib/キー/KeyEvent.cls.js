/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
/* コンストラクタ */
/* イベントかユーザー設定を引数に取る。 */
/*oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/
function KeyEvent(key, ctrl,alt,shift){
    if( arguments.length == 1 )
    {
        var event    = key;
        this.ctrl    = event.ctrlKey;
        this.alt     = event.altKey;
        this.shift   = event.shiftKey;
        this.key     = event.key;
        this.keyCode = event.keycode;
    }
    else
    {
        this.ctrl = ctrl;
        this.alt = alt;
        this.shift = shift;

        if( typeof(key) == "string" )
        {
            this.key     = key;
        }
        else
        {
            this.keyCode = key;
        }
    }
};

/************************************************************************************************/
/* シリアライズ */
/************************************************************************************************/
KeyEvent.prototype.s = function(){
    var ret = "";

    ret += (this.ctrl  ? 1 : 0);
    ret += (this.alt   ? 1 : 0);
    ret += (this.shift ? 1 : 0);
    ret += this.keyCode;
    ret += this.key;

    return ret;
}

/************************************************************************************************/
/* toString */
/************************************************************************************************/
KeyEvent.prototype.toString = function(){
    return JSON.stringify(this);
}

