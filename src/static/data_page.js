// on ANY range button press, get top level parent, modify only that div
function rangeClicked(element, ticker_name) {
    let topLevelDiv = element;
    while (topLevelDiv.parentNode && topLevelDiv.parentNode !== document.body && topLevelDiv.parentNode !== document.documentElement) {
        if (topLevelDiv.parentNode.tagName.toLowerCase() === 'div') {
            topLevelDiv = topLevelDiv.parentNode;
        }   
    }
    rangeType = element.id.split("-")[1];
    topDivName = topLevelDiv.id;

    removeSVG(topDivName);
    topDiv = document.getElementById(topDivName)
    range_buttons = topDiv.querySelectorAll('button');
    for( i=0; i< range_buttons.length; i++ )
        {
            range_buttons[i].disabled = true;
        }
    topDiv.querySelector(`#${topDivName}-loading_graph`).style.display = 'inline';
    for( i=0; i< range_buttons.length; i++ )
    {
        if (range_buttons[i].id == element.id){
            range_buttons[i].style.backgroundColor = 'yellow';
        }
        else{
            range_buttons[i].style.backgroundColor = 'transparent';
        }
    }
    drawLine('red', rangeType, topDivName, "changeRange");
}


// on page load, graph default max range from visualize.js
document.addEventListener('DOMContentLoaded', function() {
    var starting = 'stock2';
    topDiv = document.getElementById(starting)
    range_buttons = topDiv.querySelectorAll('button');
    for( i=0; i< range_buttons.length; i++ )
        {
            range_buttons[i].disabled = true;
        }
    topDiv.querySelector(`#${starting}-loading_graph`).style.display = 'inline';
    for( i=0; i< range_buttons.length; i++ )
    {
        console.log(range_buttons[i].id)
        if (range_buttons[i].id == `${starting}-Max`){
            range_buttons[i].style.backgroundColor = 'yellow';
        }
        else{
            range_buttons[i].style.backgroundColor = 'transparent';
        }
    }
    drawLine('red', "Max", starting, "changeRange");
});