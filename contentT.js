window.addEventListener("click",(event)=>{
        switch (event.which) {
        case 1:
            var selectedText='';
             selectedText = getSelectionText();
            var popup = document.getElementById("myPopup");
            popup!=null ?popup.remove() :null;

            if(selectedText !='' ) {
               var translate;
               translateApi(selectedText,'fa').done(res=>{
                    translate=res[0][0][0];
                });
              setTimeout(()=>{
                    var selectedTextRegExp = new RegExp(selectedText, "g");
                    var text = $(event.toElement).html().replace(selectedTextRegExp, "<sapn class='red popup' id='selectp' >" + selectedText + "<span class='popuptext' id='myPopup'>" + translate + "</span></sapn>");
                    $(event.toElement).html(text);
                    var popup = document.getElementById("myPopup");
                    popup &&  popup.classList.toggle("show");
               },500)
            }
            break;
    }},true)

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function translateApi (text,lang='en'){
   return $.ajax({
             url:'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl='+lang+'&dt=t&q='+text
           });
}

