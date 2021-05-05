var EventLoader=
function()
{
};

EventLoader.prototype.
load=
function( eventpath )
{
    return this.fastLoad( eventpath );
};

EventLoader.prototype.
listUpdate=
function( eventpath )
{
    var ret = this.variableLoad( eventpath );
    var listpath = FileIO.BuildPath( eventpath, "list" );

    var writer = new FileIO.FileWriter( listpath );
    writer.write( JSON.stringify( ret, null, 4 ) );
}

EventLoader.prototype.
variableLoad=
function( eventpath )
{
    var splitter =
    function( name )
    {
        var ret = {};

        var reg = new RegExp("((\\d+)_)?(.+)$");
        var regex = reg.exec(name);

        ret.num  = parseInt( regex[2] );
        ret.name = regex[3];

        return ret;
    };

    var subfileSearch =
    function( subfilelist )
    {
        var ret = {};

        subfilelist.forEach(
            function( e,i,a )
            {
                ret[ e.name ]      = splitter( e.name );
                ret[ e.name ].path = e.Path;
            }
        );

        return ret;
    };

    var subfolderSearch =
    function( subfolderlist )
    {
        var ret = {};

        subfolderlist.forEach(
            function(e,i,a)
            {
                ret[ e.name ]      = splitter( e.name );
                ret[ e.name ].list = subfileSearch( FileIO.CollectionToArray( e.Files ) );
            }
        );

        return ret;
    };

    var eventroot     = FileIO.GetFolder( eventpath );
    var subfolderlist = FileIO.CollectionToArray( eventroot.SubFolders );
    return subfolderSearch( subfolderlist );
};

EventLoader.prototype.
fastLoad=
function( eventpath )
{
    var ret = null;
    var listpath = FileIO.BuildPath( eventpath, "list" );

    try
    {
        var reader = new FileIO.FileReader( listpath, false );
        ret = JSON.parse( reader.read() );
    }
    catch( e )
    {
        ret = this.variableLoad( eventpath );
    }

    return ret;
};
