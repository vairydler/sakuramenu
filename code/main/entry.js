/* ストレージオブジェクトと、HTAの呼び出しエントリーを兼ねている。 */
function Storage( hWnd )
{
    if( isNaN( hWnd ) )
    {
        this._ie = new ActiveXObject("InternetExplorer.Application");
    }
    else
    {
        var objShell = new ActiveXObject("Shell.Application");
        var windows = objShell.Windows();
        
        for( var i = 0; i < windows.count; i++ )
        {
            try
            {
                if( windows.item(i).Hwnd == hWnd )
                {
                    this._ie = windows.item(i);
                }
            }
            catch( e )
            {
            }
        }
        
        if( !this._ie )
        {
            throw new Error( "ie not found" );
        }
        
        objShell = null;
    }
    this.id = this._ie.hWnd;
}

Storage.prototype.setHost = 
function( key,val )
{
    this._ie.PutProperty( key,val );
};

Storage.prototype.getHost = 
function( key )
{
    return this._ie.GetProperty( key );
};

Storage.prototype.close = 
function()
{
    this._ie.quit();
    this._ie = null;
};

function callhta( htaparam )
{
    /* 実行中のマクロパスからhtaのパスを生成 */
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var macropath = fso.GetParentFolderName(Editor.ExpandParameter("$M"));
    var htapath = macropath + ".\\gui.hta";

    /* ストレージにエディタクラスをセット */
    var str = new Storage();
    str.setHost("editor",Editor);

    /* パラメータ生成 */
    var htacmd = '"' + htapath + '" ' + str.id;
    for( var i = 0; i < htaparam.length; i++ )
    {
        htacmd += " " + htaparam[i];
    }

    {
        /* 非同期は不可能。たぶんマクロが死んだ時にEditorオブジェクトが死んでる。 */
        var WshShell = new ActiveXObject("WScript.Shell");
        /* 非同期 */
        if( false )
        {
            WshShell.run( htacmd,3,false );
        }
        /* 同期 */
        else
        {
            WshShell.run( htacmd,3,true );
        }
        
        WshShell = null;
    }

    /* ハッキリわからないが、WshShellだけでは動作待ちができてない気がする。 */
    var waitcnt = 0;
    while( true != str.getHost("end") )
    {
        Editor.Sleep( 100 );

        waitcnt++;
        if( waitcnt > 5 )
        {
        	Editor.TraceOut("timeout");
            break;
        }
    }

    str.close();
};

var isHTA = false;
try
{
	Editor;
}
catch( e )
{
    /* HTAの場合は、まだEditorが使えないのでこっち */
	isHTA = true;
}

if( ! isHTA )
{
    callhta( [] );
}

