/* スタートアップ */
document.addEventListener( "DOMContentLoaded",
    function(event)
    {
        var eventlist = [
            "focus",
            "resize",
            "move",
            "beforeunload",
            "keyup",
            "keydown",
        ];

        /* 引数取り込み */
        var getArgs=
        function( hta )
        {
            function splitCml(cml) {
                var res, reg, mat;
                reg = /"([^"]+)"|([^ ]+)/g;
                res = [];
                while (mat = reg.exec(cml))
                    res.push(  mat[1] || mat[2] );
                return res;
            }

            //IE10では使えない
            args = splitCml( oHTA.commandLine );

            /* 文字列連結ロジック */
            if( 0 )
            {
                for( var i = 0; i < args.length; i++ )
                {
                    if( args[i].charAt(0) == '"' )
                    {
                        for( var j = i; j < args.length; j++ )
                        {
                            if( args[j].charAt(args[j].length - 1) == '"' )
                            {
                                break;
                            }
                            else
                            {
                                args[i] = args[i] + " " + args[j];
                            }
                        }
                    }
                }
            }

            return args;
        };

        var app = new App();
        app.init( getArgs(oHTA) );

        eventlist.forEach(
            function(e,i,a)
            {
                if( e in app )
                {
                    window.addEventListener( e, app[ e ].bind( app ) );
                }
            }
        );
        app.start();
    }
);

function
dbgwrite(html,tm)
{
    var dbg = document.getElementById("dbg");
    if( dbg == null )
    {
        var dbg = document.createElement("div");
        document.body.appendChild(dbg);
        dbg.id = "dbg";
    }

    var line = document.createElement("div");
    line.innerHTML = html;
    dbg.appendChild( line );
    if( tm )
    {
        setTimeout(
            function()
            {
                line.remove();
            }
        ,tm);
    }
};