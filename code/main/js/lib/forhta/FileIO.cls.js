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
        function( filepath, create )
        {
            var ForReading = 1;
            var ForWriting = 2;
            var ForAppending = 8;
            var reader = null;
            create = ( create == null ) ? true : create;

            var ret={
                read:
                function()
                {
                    var ret = null;
                    if( reader != null )
                    {
                        try
                        {
                            ret = reader.readAll();
                        }
                        catch(e)
                        {
                            ret = null;
                        }
                    }

                    return ret;
                },

                readln:
                function()
                {
                    var ret = null;
                    if( reader != null )
                    {
                        try
                        {
                            ret = reader.ReadLine();
                        }
                        catch(e)
                        {
                            ret = null;
                        }
                    }

                    return ret;
                },

                close:
                function()
                {
                    var ret = null;
                    if( reader != null )
                    {
                        reader.Close();
                        reader=null;
                    }
                },
            };

            try
            {
                reader = fso.OpenTextFile( filepath, ForReading, create );
                return ret;
            }
            catch(e)
            {
                return null;
            }
        };

    ret.FileWriter=
        function( filepath )
        {
            var ForReading = 1;
            var ForWriting = 2;
            var ForAppending = 8;

            var writer;

            var ret = {
                write:
                function( text )
                {
                    if( writer != null )
                    {
                        writer.write( text );
                    }
                },

                writeln:
                function( text )
                {
                    if( writer != null )
                    {
                        writer.write( text + "\r\n" );
                    }
                },

                close:
                function()
                {
                    if( writer != null )
                    {
                        writer.Close();
                        writer = null;
                    }
                },
            };

            try
            {
                writer = fso.OpenTextFile( filepath, ForWriting, true );
                return ret;
            }
            catch(e)
            {
                return null;
            }
        };

    return ret;
})();
