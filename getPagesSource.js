// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

chrome.extension.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
$( document ).on( "click", function( event ) {//can use .off to remove
                $( event.target ).closest( "*" ).toggleClass( "hilight" );
                ary=[];
                var str="";
                parents = $( event.target ).parents().andSelf();
                for(var i=0;i<parents.length;i++){
                        str = (parents[i].nodeName);
                        if(parents[i].className){
                                str+= "  "+(parents[i].className);
                                str = str.replace(/\s+/g, ".");
                        }
                        ary.push(str);
                }
                str=ary.join(">");
                //$(str).css("background:yellow");
                console.log("["+str+"]");
                console.log(window.jQuery);

                });