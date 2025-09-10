// array of all of range buttons
var childDivs = document.getElementById('range_buttons').getElementsByTagName('button');

// go through array and remove background 
for( i=0; i< childDivs.length; i++ )
{
    childDivs[i].style.backgroundColor = 'transparent';
}