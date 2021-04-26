var hta = true;
var keyhook;
var Editor;
var storage;

var App=
function()
{
};

App.prototype.
init=
function(args)
{
    /* HTAとHTMLの隠蔽 */
    var htaWrap=
    function()
    {
        hta = (function(){
            try
            {
                console.log("html");
                return false;
            }
            catch( e )
            {
                return true;
            }
        })();

        /* 関数オーバーライド */
        if( hta )
        {
            console = {};
            console.log   = function( txt ){ Editor.TraceOut( txt ); };
            console.table = function( map ){};
        }
    }();

    if( hta )
    {
        storage = new Storage( args[1] );
        Editor = storage.getHost("editor");
        storage.setHost("read",true );

        var eventpath = FileIO.GetSplitFolderRoute( args[0] );
        eventpath = FileIO.BuildPath( eventpath.join("/"), "../event" );
    }

    var bgl = new BuildGL();
    bgl.build(eventpath);
};

App.prototype.
start=
function(args)
{
};

App.prototype.
/* ウィンドウアンロード */
unload=
function()
{
    Editor.ReDraw();
    storage.setHost("end",true);
};
