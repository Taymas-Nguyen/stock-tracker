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

// updates the ranges in cache
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

async function get_visibility(stock_number) {
    const response = await fetch('js-py-api-getVisibility', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stock_number: stock_number
        })
    })
    const data = await response.json();
    return data['visibility'];
}

// updates the visibility in cache
function change_visibility(stock_number, new_visibility) {
fetch('js-py-api-changeVisibility', {
    method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stock_number: stock_number,
            new_visibility: new_visibility
        })
    })
    .then(response => response.json())
}