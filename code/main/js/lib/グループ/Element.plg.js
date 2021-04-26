Object.defineProperty(Element.prototype,
    "classList",
    {
        enumerable      :false,
        configurable    :false,
        writable        :false,
        value           :
        function()
        {
            var elem = this;
            var locallist = elem.className.split(" ");

            var extend = {
                length:locallist.length,

                add:
                function( cls )
                {
                    locallist.push( cls );
                    this.length = locallist.length;
                    elem.className = locallist.join(" ");

                    return this;
                },

                remove:
                function( cls )
                {
                    var removeindex = locallist.indexOf(cls);
                    if( removeindex >= 0 )
                    {
                        locallist.splice( removeindex, 1 );
                        this.length = locallist.length;
                        elem.className = locallist.join(" ");
                    }
                    return this;
                },

                toArray:
                function()
                {
                    return locallist.concat();
                }
            };

            return extend;
        }
    }
);