// on page load, grapg default max range from visualize.js
document.addEventListener('DOMContentLoaded', function() {
    drawLine("steelblue");
});

const cvs = "C:/Users/tinko/School/Stock Tracker/stock-tracker-1/csv_page/views.py";

// array of all of range buttons
var childDivs = document.getElementById('range_buttons').getElementsByTagName('button');

// go through array and remove background 
for( i=0; i< childDivs.length; i++ )
{
    childDivs[i].style.backgroundColor = 'transparent';
}



function getRange(element) {
    console.log(element.id);
    $.ajax({
        type: "GET",
        success: function() {
            remove();
            drawLine('red');
        }
    });
}
