// on page load, graph default max range from visualize.js
document.addEventListener('DOMContentLoaded', function() {
    drawLine("steelblue", "Max");
});

// array of all of range buttons
var childDivs = document.getElementById('range_buttons').getElementsByTagName('button');

// go through array and remove background, highlight max
for( i=0; i< childDivs.length; i++ )
{
    if (childDivs[i].id == "Max"){
        childDivs[i].style.backgroundColor = 'yellow';
    }
    else{
        childDivs[i].style.backgroundColor = 'transparent';
    }
}

function getRange(element, ticker_name) {
    removeSVG();
    $.ajax({
        type: "GET",
        success: function() {
            drawLine('red', element.id, "changeRange");
            for( i=0; i< childDivs.length; i++ )
            {
                if (childDivs[i].id == element.id){
                    childDivs[i].style.backgroundColor = 'yellow';
                }
                else{
                    childDivs[i].style.backgroundColor = 'transparent';
                }
            }
        },
    });
}
