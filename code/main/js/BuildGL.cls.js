var BuildGL=
function()
{
};

BuildGL.prototype.
build=
function( eventpath )
{
	var evtld = new EventLoader();
	var eventmap = evtld.load( eventpath );

	var lg = this.buildGL( "lg", eventmap );
	this.buildGroup( lg, eventmap );

	lg.selectGroup(0);
};

/* グループリスト作成 */
BuildGL.prototype.
buildGL=
function( id, eventmap )
{
	var lg = new ListGroup();
	var gldom = document.getElementById(id);
	
	/* キーイベントコールバック */
	var cb = 
	function( type, result )
	{
		switch( type ){
			case ListGroup.def.LISTENER_ADD:
				gldom.appendChild( result.group );
				break;
			case ListGroup.def.LISTENER_REMOVE:
				result.group.remove();
				break;
			case ListGroup.def.LISTENER_MOVE:
				var list = lg.getInfo();
				for( var i=0; i<list.length; i++ )
				{
					gldom.appendChild( lg.getGroup( list[i].name ) );
				}
				break;
			case ListGroup.def.LISTENER_SELECT:
				break;
		}
	};
	lg.addListener(cb);

	/* イベント名からマップキーを逆引き */
	var findKey=
	function( list, name )
	{
		var ret = null;

		for( var listkey in list )
		{
			if( list[ listkey ].name == name )
			{
				ret = listkey;
				break;
			}
		}
		
		return ret;
	};

	var eventparam = {};

	/* ドキュメントに対してリストグループへのイベントを追加 */
	document.addEventListener("keydown",
		function( event )
		{
			switch( new KeyEvent( event ).s() )
			{
				case new KeyEvent( "d", 0,0,0 ).s():
				case new KeyEvent( "Left", 0,0,0 ).s():
					lg.selectPrevGroup();
					break;
				case new KeyEvent( "f", 0,0,0 ).s():
				case new KeyEvent( "Right", 0,0,0 ).s():
					lg.selectNextGroup();
					break;
				case new KeyEvent( "k", 0,0,0 ).s():
				case new KeyEvent( "Up", 0,0,0 ).s():
					lg.selectPrevElem();
					break;
				case new KeyEvent( "j", 0,0,0 ).s():
				case new KeyEvent( "Down", 0,0,0 ).s():
					lg.selectNextElem();
					break;
				case new KeyEvent( "i", 0,0,0 ).s():
					if( ! hta )
					{
						console.table( lg.getInfo() );
					}
					break;
				case new KeyEvent( "Enter", 0,0,0 ).s():
					var groupkey = findKey( eventmap, lg.getSelectGroup().getName() );
					var elemkey  = findKey( eventmap[ groupkey ].list, lg.getSelectGroup().getValue() );
					eventparam = eventmap[ groupkey ].list[ elemkey ].func( eventparam );
					
					if( eventparam.winclose )
					{
						window.close();
					}
					break;
				case new KeyEvent( "Esc", 0,0,0 ).s():
					window.close();
					break;
				default:
					if( hta )
					{
						Editor.TraceOut( new KeyEvent( event ).s() );
					}
					else
					{
						console.log( new KeyEvent( event ).toString() );
					}
					break;
			}
		}
	);
	
	return lg;
};

/* グループを作成 */
BuildGL.prototype.
buildGroup=
function( lg, eventmap )
{
	for( var groupkey in eventmap )
	{
		var groupname = eventmap[ groupkey ].name;
		var group = lg.addGroup( groupname );
		var elements = eventmap[ groupkey ].list;

		for( var elementskey in elements )
		{
			var elemname = elements[ elementskey ].name;
			group.addElem( elemname );
		}
		
		group.selectIndex(0);
	}

};
