var EventLoader=
function()
{
};

EventLoader.prototype.
load=
function( eventpath )
{
	return this.variableLoad( eventpath );
};

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
				var reader = new FileIO.FileReader( e.Path );
				var func = reader.read();

				ret[ e.name ]      = splitter( e.name );
				ret[ e.name ].func = new Function("param", func);
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
