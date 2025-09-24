// on page load, graph default max range from visualize.js
document.addEventListener('DOMContentLoaded', function() {
    drawLine("steelblue", "Max");
    document.getElementById('loading_graph').style.display = 'none';
});

const cvs = "C:/Users/tinko/School/Stock Tracker/stock-tracker-1/csv_page/views.py";

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
    for( i=0; i< childDivs.length; i++ )
    {
        childDivs[i].disabled = true;
    }
    document.getElementById('loading_graph').style.display = 'inline';
    removeSVG();
    $.ajax({
        type: "GET",
        success: function() {
            drawLine('red', element.id);
            for( i=0; i< childDivs.length; i++ )
            {
                if (childDivs[i].id == element.id){
                    childDivs[i].style.backgroundColor = 'yellow';
                }
                else{
                    childDivs[i].style.backgroundColor = 'transparent';
                }
            }
            document.getElementById('loading_graph').style.display = 'none';
            for( i=0; i< childDivs.length; i++ )
            {
                childDivs[i].disabled = false;
            }
        },
    });
}
