document.addEventListener("DOMContentLoaded",
	function()
	{
		dbg.listgroup();
	}
);

dbg=
{
	group:
	function()
	{
		var ba = new Group("ba");
		var ca = new Group("ca");
		
		document.body.appendChild(ba);
		document.body.appendChild(ca);
	},
	
	listgroup:
	function()
	{
		var lg = new ListGroup();
		
		var cb = function( type, result )
		{
			switch( type ){
				case ListGroup.def.LISTENER_ADD:
					document.body.appendChild( result.group );
					break;
				case ListGroup.def.LISTENER_REMOVE:
					result.group.remove();
					break;
				case ListGroup.def.LISTENER_MOVE:
					var list = lg.getInfo();
					for( var i=0; i<list.length; i++ )
					{
						document.body.appendChild( lg.getGroup( list[i].name ) );
					}
					break;
				case ListGroup.def.LISTENER_SELECT:
					break;
			}
		};
		lg.addListener(cb);
		
		var valuetbl = {
			"ho":
				{
					"el":()=>{console.log("ho:el")},
					"a":()=>{console.log("ho:a")},
				},
			"ge":
				{
					"em":()=>{console.log("ge:em")},
					"b":()=>{console.log("ge:b")},
				},
			"ha":
				{
					"em":()=>{console.log("ha:em")},
					"c":()=>{console.log("ha:c")},
				},
			"ki":
				{
					"o":()=>{console.log("ki:o")},
					"d":()=>{console.log("ki:d")},
				}
		}
		
		var group = lg.addGroup("ho");
		group.addElem("el");
		group.addElem("a");
		
		var group = lg.addGroup("ge");
		group.addElem("em");
		group.addElem("b");

		var group = lg.addGroup("ha");
		group.addElem("em");
		group.addElem("c");
		
		var group = lg.addGroup("ki");
		group.addElem("o");
		group.addElem("d");
	
		document.addEventListener("keydown",
			function( event )
			{
				switch( event.key )
				{
					case "d":
						if( event.ctrlKey )
						{
							lg.removeGroup();
						}
						else
						{
							lg.selectPrevGroup();
						}
						break;
					case "f":
						lg.selectNextGroup();
						break;
					case "j":
						lg.selectNextElem();
						break;
					case "k":
						lg.selectPrevElem();
						break;
					case "D":
						lg.moveGroup(-1);
						break;
					case "F":
						lg.moveGroup(1);
						break;
					case "i":
						console.table( lg.getInfo() );
						break;
					case "Enter":
						valuetbl[ lg.getSelectGroup().getName() ][ lg.getSelectGroup().getValue() ]();
						break;
					default:
						console.log( event.key );
				}
			}
		);

	}
};