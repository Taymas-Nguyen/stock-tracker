// varible accessible by js and python (via regex parse) to keep track of # of forms across entire app, index at 0
amount_of_forms = 10;

all_graphs = []
for( i=0; i < amount_of_forms; i++ )
{
    all_graphs.push(`stock${i}`)
}

// visibility statuses for cache
show = 'show' // show everything and the hide button
invisible = 'invisible' // show nothing
partial_show = 'partial_show' // show only filled out input field with the show button
partial_invisible = 'partial_invisible' // show only empty input field with no buttons

// on page load
document.addEventListener('DOMContentLoaded', function() {

    // Iterate through the NodeList and remove the list tags that django adds
    const elementsWithClass = document.querySelectorAll('.errorlist');
    elementsWithClass.forEach(element => {
        element.remove();
    });
    
    // Iterate through all graphs
    for (const stock of all_graphs) {

        // if no visibility then default is invisible, else preserve visibility
        get_visibility(stock).then(data =>{
            if (data == null){
                change_visibility(stock, invisible);
            }
        });

        get_visibility(stock).then(data =>{
            if (data == invisible){
                document.querySelector(`#${stock}`).style.display = 'none';

            }else if (data == partial_invisible){
                // hide all range buttons
                var range_buttons = document.querySelector(`#${stock}`).querySelectorAll('button');
                for( i=0; i< range_buttons.length; i++ )
                {
                    range_buttons[i].style.display = 'none';
                }
                document.querySelector(`#${stock}`).style.display = 'inline';
                document.querySelector(`#${stock}-line_graph`).style.display = 'none';
                document.querySelector(`#${stock}-hideGraph`).style.display = 'none';
            }else{
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

// hides entire div except the input field, all graphs beneath should move up, replace hide button with show button
function hideGraph(element){
    topDivName = getTopDiv(element);
}

// reveals entire div, replace show button with hide button
function showGraph(element){

}

// add new graph at the bottom, only show the input field, hide hide/show button
function addGraph(element){
    for (const stock of all_graphs){
        if (document.querySelector(`#${stock}`).style.display == 'none'){
            
            // hide all range buttons
            var range_buttons = document.querySelector(`#${stock}`).querySelectorAll('button');
            for( i=0; i< range_buttons.length; i++ )
            {
                range_buttons[i].style.display = 'none';
            }
            
            change_visibility(stock, partial_invisible);
            document.querySelector(`#${stock}`).style.display = 'inline';
            document.querySelector(`#${stock}-line_graph`).style.display = 'none';
            document.querySelector(`#${stock}-hideGraph`).style.display = 'none';
            return;
        }
    }
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
