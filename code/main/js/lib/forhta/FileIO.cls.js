var FileIO=
(function()
{
	var ret = {};
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	
	ret.FileExists=
		function( filepath )
		{
			return fso.FileExists( filepath );
		};
	
	ret.FolderExists=
		function( filepath )
		{
			return fso.FolderExists( filepath );
		};
	
	ret.GetFolder=
		function( folderpath )
		{
			return fso.GetFolder( folderpath );
		}

	ret.BuildPath=
		function( filepath, name )
		{
			return fso.BuildPath( filepath, name );
		};
		
	ret.GetAbsolutePathName=
		function( filepath )
		{
			return fso.GetAbsolutePathName( filepath );
		};
	
	ret.GetParentFolderName=
		function( filepath )
		{
			return fso.GetParentFolderName( filepath );
		};

	ret.GetSplitFolderRoute=
		function( folderpath )
		{
			var ret = [];
			
			if( fso.FileExists( folderpath ) )
			{
				folderpath = fso.GetFile( folderpath ).ParentFolder.Path;
			}
			
			if( fso.FolderExists( folderpath ) )
			{
				var folder = fso.GetFolder( folderpath );
				
				do
				{
					if( folder.ParentFolder )
					{
						ret.unshift( folder.Name );
					}
					else
					{
						ret.unshift( folder.Drive );
					}
				}while( null != ( folder = folder.ParentFolder ) );
			}
			
			return ret;
		};

	ret.CollectionToArray=
		function( collection )
		{
			var objEnu = new Enumerator(collection);
			var array = [];
			for (; !objEnu.atEnd(); objEnu.moveNext() )
			{
				array.push(objEnu.item());
			}
		    return array;
    	};
	
	ret.FileReader=
		function( filepath )
		{
			var ForReading = 1;
			var ForWriting = 2;
			var ForAppending = 8;
			
			try
			{
				this.reader = fso.OpenTextFile( filepath, ForReading, true );
			}
			catch(e)
			{
				return null;
			}
		};
		
		ret.FileReader.
		prototype.
		read=
		function()
		{
			var ret = null;
			if( this.reader != null )
			{
				try
				{
					ret = this.reader.readAll();
				}
				catch(e)
				{
					ret = null;
				}
			}

			return ret;
		};

		ret.FileReader.
		prototype.
		readln=
		function()
		{
			var ret = null;
			if( this.reader != null )
			{
				try
				{
					ret = this.reader.ReadLine();
				}
				catch(e)
				{
					ret = null;
				}
			}

			return ret;
		};

		ret.FileReader.
		prototype.
		close=
		function()
		{
			var ret = null;
			if( this.reader != null )
			{
				this.reader.Close();
				this.reader=null;
			}
		};

	ret.FileWriter=
		function( filepath )
		{
			var ForReading = 1;
			var ForWriting = 2;
			var ForAppending = 8;
			
			try
			{
				this.writer = fso.OpenTextFile( filepath, ForWriting, true );
			}
			catch(e)
			{
				return null;
			}
		};

		ret.FileWriter.
		prototype.
		write=
		function( text )
		{
			if( this.writer != null )
			{
				this.writer.write( text );
			}
		};

		ret.FileWriter.
		prototype.
		writeln=
		function( text )
		{
			if( this.writer != null )
			{
				this.writer.write( text + "\r\n" );
			}
		};

		ret.FileWriter.
		prototype.
		close=
		function()
		{
			if( this.writer != null )
			{
				this.writer.Close();
				this.writer = null;
			}
		};

	return ret;
})();
