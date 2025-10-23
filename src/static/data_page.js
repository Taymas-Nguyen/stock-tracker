all_graphs = []

// on page load, graph default max range from visualize.js
document.addEventListener('DOMContentLoaded', function() {
    var starting = 'stock0';
    all_graphs.push(starting);
    topDiv = document.getElementById(starting);
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

// delete entire graph, all graphs beneath should move up
function deleteGraph(element){
    topDivName = getTopDiv(element);
    topDiv.querySelector(`#${topDivName}-button_and_graph`).remove();
}

// add new graph at the bottom
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