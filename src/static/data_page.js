// on page load, graph default max range from visualize.js
document.addEventListener('DOMContentLoaded', function() {
    for( i=0; i< childDivs.length; i++ )
    {
        childDivs[i].disabled = true;
    }
    document.getElementById('loading_graph').style.display = 'inline';
    removeSVG();
    for( i=0; i< childDivs.length; i++ )
    {
        if (childDivs[i].id == "Max"){
            childDivs[i].style.backgroundColor = 'yellow';
        }
        else{
            childDivs[i].style.backgroundColor = 'transparent';
        }
    }
    drawLine('red', "Max", "changeRange");
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
    for( i=0; i< childDivs.length; i++ )
    {
        childDivs[i].disabled = true;
    }
    document.getElementById('loading_graph').style.display = 'inline';
    removeSVG();
    for( i=0; i< childDivs.length; i++ )
    {
        if (childDivs[i].id == element.id){
            childDivs[i].style.backgroundColor = 'yellow';
        }
        else{
            childDivs[i].style.backgroundColor = 'transparent';
        }
    }
    drawLine('red', element.id, "changeRange");
}
