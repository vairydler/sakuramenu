var hta = true;
var keyhook;
var Editor;
var storage;

var App=
function()
{
    var eventpath;
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
            var timemap = {};
            console = {};
            console.log   = function( txt ){ Editor.TraceOut( txt ); };
            console.table = function( map ){};
            console.time  = function( label ){
                 if( ! timemap.hasOwnProperty( label ) )
                 {
                    timemap[ label ] = new Date().valueOf();
                 }
            };
            console.timeEnd = function( label ){ 
                if( timemap.hasOwnProperty( label ) )
                {
                    console.log( label + ":" + ( new Date().valueOf() - timemap[ label ] ) );
                    delete timemap[label];
                }
            };
        }
    }();

    if( hta )
    {
        storage = new Storage( args[1] );
        Editor = storage.getHost("editor");
        storage.setHost("read",true );

        var eventpath = FileIO.GetSplitFolderRoute( args[0] );
        this.eventpath = FileIO.BuildPath( eventpath.join("/"), "../event" );
    }

    var bgl = new BuildGL();
    bgl.build(this.eventpath);
};

App.prototype.
start=
function(args)
{
};

App.prototype.
/* ウィンドウアンロード */
beforeunload=
function()
{
    var evtld = new EventLoader();
    var eventmap = evtld.listUpdate( this.eventpath );

    Editor.ReDraw();
    storage.setHost("end",true);
};
