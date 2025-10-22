// on page load, graph default max range from visualize.js
document.addEventListener('DOMContentLoaded', function() {
    var starting = 'stock0';
    topDiv = document.getElementById(starting);
    topDiv.querySelector(`#${starting}-addGraph`).style.display = 'none';
    topDiv.querySelector(`#${starting}-deleteGraph`).style.display = 'inline';
    range_buttons = topDiv.querySelectorAll('button');
    for( i=0; i< range_buttons.length; i++ )
        {
            range_buttons[i].disabled = true;
        }
    topDiv.querySelector(`#${starting}-loading_graph`).style.display = 'inline';
    for( i=0; i< range_buttons.length; i++ )
    {
        if (range_buttons[i].id == `${starting}-Max`){
            range_buttons[i].style.backgroundColor = 'yellow';
        }
        else{
            range_buttons[i].style.backgroundColor = 'transparent';
        }
    }
    drawLine('red', "Max", starting, "changeRange");
});

// on ANY range button press, get top level parent (i.e stock0, stock1, ect), modify only that div
function rangeClicked(element, ticker_name) {
    topDivName = getTopDiv(element);
    
    rangeType = element.id.split("-")[1];
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

// hide only the graph and buttons, not the search bar. hide the delete icon and show the add icon
// all graphs underneath should move up, only modify the top div 
function deleteGraph(element){
    topDivName = getTopDiv(element);
}

// hide the add icon and show the delete icon
// all graphs/buttons reappear, only modify the top div, all graphs below should move down 
function addGraph(element){
    topDivName = getTopDiv(element);
}

function getTopDiv(element){
    let topLevelDiv = element;
    while (topLevelDiv.parentNode && topLevelDiv.parentNode !== document.body && topLevelDiv.parentNode !== document.documentElement) {
        if (topLevelDiv.parentNode.tagName.toLowerCase() === 'div') {
            topLevelDiv = topLevelDiv.parentNode;
        }   
    }
    return topLevelDiv.id;
}