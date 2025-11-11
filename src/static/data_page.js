// varible accessible by js and python (via regex parse) to keep track of # of forms across entire app, index at 0
amount_of_forms = 10;

all_graphs = []
for( i=0; i < amount_of_forms; i++ )
{
    all_graphs.push(`stock${i}`)
}


// on page load, iterate through all graphs
document.addEventListener('DOMContentLoaded', function() {

    const elementsWithClass = document.querySelectorAll('.errorlist');

    // Iterate through the NodeList and remove the list tags that django adds
    elementsWithClass.forEach(element => {
        element.remove();
    });
    
    for (const stock of all_graphs) {
        get_range(stock).then(data => {
            topDiv = document.getElementById(stock);
            rangeType = data == null ? "Max" : data;


            // if stock has no range, then it has newly been created and its default is max
            if (topDiv.querySelector(`#${stock}-range_buttons`).getAttribute('range') == null){
                topDiv.querySelector(`#${stock}-range_buttons`).setAttribute('range' , 'Max');
            }

            topDiv.querySelector(`#${stock}-deleteGraph`).style.display = 'inline';
            range_buttons = topDiv.querySelectorAll('button');
            for( i=0; i< range_buttons.length; i++ )
                {
                    range_buttons[i].disabled = true;
                }
            topDiv.querySelector(`#${stock}-loading_graph`).style.display = 'inline';
            for( i=0; i< range_buttons.length; i++ )
            {
                if (range_buttons[i].id == `${stock}-${rangeType}`){

                    range_buttons[i].style.backgroundColor = 'yellow';
                }
                else{
                    range_buttons[i].style.backgroundColor = 'transparent';
                }
            }
            drawLine('red', rangeType, stock);
        });
    }
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

// calls get_range() in /data_page/views.py
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

// calls change_range() in /data_page/views.py
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
    .then(data => {
        console.log('change_range:', data);
    })
}