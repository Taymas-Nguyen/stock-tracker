// varible accessible by js and python (via regex parse) to keep track of # of forms across entire app, index at 0
amount_of_forms = 10;

all_graphs = []
for( i=0; i < amount_of_forms; i++ )
{
    all_graphs.push(`stock${i}`)
}


// on page load
document.addEventListener('DOMContentLoaded', function() {

    // Iterate through the NodeList and remove the list tags that django adds
    const elementsWithClass = document.querySelectorAll('.errorlist');
    elementsWithClass.forEach(element => {
        element.remove();
    });
    
    // Iterate through all graphs
    for (const stock of all_graphs) {
        // if graph has stock then show, else hide all elements
        get_stock(stock).then(data =>{
            if (data == null){
                document.querySelector(`#${stock}`).style.display = 'none';
            }else{
                console.log("asd");
                get_range(stock).then(data => {
                    topDiv = document.getElementById(stock);
                    rangeType = data == null ? "Max" : data;
        
                    loadingGraph(topDiv, stock, rangeType)
                    drawLine('red', rangeType, stock);
                });
            }
        });
    }
});

// on ANY range button press, get top level parent (i.e stock0, stock1, ect), modify only that div
function rangeClicked(element, ticker_name) {
    topDivName = getTopDiv(element);

    topDiv = document.getElementById(topDivName)
    removeSVG(topDivName);

    rangeType = element.id.split("-")[1];
    loadingGraph(topDiv, topDivName, rangeType)

    change_range(topDivName, rangeType);
    drawLine('red', rangeType, topDivName);
}

// delete entire graph, all graphs beneath should move up
function deleteGraph(element){
    topDivName = getTopDiv(element);
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

// before graphs can load, disable all buttons, show the loading icon, and highlight the chosen range
function loadingGraph(topDiv, topDivName, rangeType){
    range_buttons = topDiv.querySelectorAll('button');
    for( i=0; i< range_buttons.length; i++ )
        {
            range_buttons[i].disabled = true;
        }
    topDiv.querySelector(`#${topDivName}-loading_graph`).style.display = 'inline';
    for( i=0; i< range_buttons.length; i++ )
    {
        if (range_buttons[i].id == `${topDivName}-${rangeType}`){
            range_buttons[i].style.backgroundColor = 'yellow';
        }
        else{
            range_buttons[i].style.backgroundColor = 'transparent';
        }
    }
}

// calls get_range() in api
async function get_range(stock_number) {
    const response = await fetch('js-py-api-getRange', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stock_number: stock_number
        })
    })
    const data = await response.json();
    return data['range'];
}

// calls change_range() in api, updates the ranges in cache
function change_range(stock_number, new_range) {
fetch('js-py-api-changeRange', {
    method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stock_number: stock_number,
            new_range: new_range
        })
    })
    .then(response => response.json())
}

// calls get_stock() in api
async function get_stock(stock_number) {
    const response = await fetch('js-py-api-getStock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stock_number: stock_number
        })
    })
    const data = await response.json();
    return data['stock'];
}
