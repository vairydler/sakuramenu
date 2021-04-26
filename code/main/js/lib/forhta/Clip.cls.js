function
Clip()
{
    return {
        getText:
        function()
        {
            return window.clipboardData.getData("text");
        },

        setText:
        function( txt )
        {
            return window.clipboardData.setData("text", txt);
        }
    }
}