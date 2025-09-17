// on page load, grapg default max range from visualize.js
document.addEventListener('DOMContentLoaded', function() {
    drawLine("steelblue");
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
    console.log(ticker_name)
    $.ajax({
        type: "GET",
        beforeSend: function(){
            removeSVG();
        },
        success: function() {
            for( i=0; i< childDivs.length; i++ )
            {
                if (childDivs[i].id == element.id){
                    childDivs[i].style.backgroundColor = 'yellow';
                }
                else{
                    childDivs[i].style.backgroundColor = 'transparent';
                }
            }
            removeSVG();
            drawLine('red');
        },
    });
}
