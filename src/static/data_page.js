all_graphs = ['stock0', 'stock1']

// on page load, iterate through all graphs
document.addEventListener('DOMContentLoaded', function() {

    const elementsWithClass = document.querySelectorAll('.errorlist');

    // Iterate through the NodeList and remove the class from each element
    elementsWithClass.forEach(element => {
    element.remove();
    });

    console.log("page load");
    all_graphs.forEach((stock) => {
        topDiv = document.getElementById(stock);
        topDiv.querySelector(`#${stock}-deleteGraph`).style.display = 'inline';
        range_buttons = topDiv.querySelectorAll('button');
        for( i=0; i< range_buttons.length; i++ )
            {
                range_buttons[i].disabled = true;
            }
        topDiv.querySelector(`#${stock}-loading_graph`).style.display = 'inline';
        for( i=0; i< range_buttons.length; i++ )
        {
            if (range_buttons[i].id == `${stock}-Max`){
                range_buttons[i].style.backgroundColor = 'yellow';
            }
            else{
                range_buttons[i].style.backgroundColor = 'transparent';
            }
        }
        drawLine('red', "Max", stock, "changeRange");
    });
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
}

// add new graph at the bottom
function addGraph(element){
    topDivName = getTopDiv(element);
    console.log("addgraph");
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