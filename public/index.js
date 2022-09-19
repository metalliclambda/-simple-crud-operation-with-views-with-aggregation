const cityForm = document.getElementById('cityForm');
cityForm.addEventListener('submit', async e => {
    e.preventDefault();
    const jsonFormData = buildJsonFormData(cityForm);
    const headers = buildHeaders();

    let fetchLink = '/query/city';
    const response = await performPostHttpRequest(fetchLink, headers, jsonFormData);
    console.log(response);

});


const countryForm = document.getElementById('countryForm');
countryForm.addEventListener('submit', async e => {
    e.preventDefault();
    const jsonFormData = buildJsonFormData(countryForm);
    const headers = buildHeaders();

    let fetchLink = '/query/country';
    const response = await performPostHttpRequest(fetchLink, headers, jsonFormData);
    console.log(response);
    window.location.reload();

});


const regionForm = document.getElementById('regionForm');
regionForm.addEventListener('submit', async e => {
    e.preventDefault();
    const jsonFormData = buildJsonFormData(regionForm);
    const headers = buildHeaders();

    let fetchLink = '/query/region';
    const response = await performPostHttpRequest(fetchLink, headers, jsonFormData);
    // console.log(response);
    window.location.reload();
});


const queryForm = document.getElementById('queryForm');
queryForm.addEventListener('submit', async e => {
    e.preventDefault();
    const jsonFormData = buildJsonFormData(queryForm);
    const headers = buildHeaders();

    let fetchLink = '/query';
    const response = await performPostHttpRequest(fetchLink, headers, jsonFormData);
    console.log(response);
    insertResult(response);
});


const resultDiv = document.getElementById('resultDiv');
function insertResult(list) {
    resultDiv.innerText = "";
    for(let x of list){
        let newTag = document.createElement("p"); 
        let text = document.createTextNode(x.name);
        newTag.appendChild(text);        
        resultDiv.appendChild(newTag); 
    }

    
}






async function performPostHttpRequest(fetchLink, headers, body) {
    if (!fetchLink || !headers || !body) {
        throw new Error("One or more POST request parameters was not passed.");
    }
    try {
        const rawResponse = await fetch(fetchLink, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
        const content = await rawResponse.json();
        return content;
    }
    catch (err) {
        console.error(`Error at fetch POST: ${err}`);
        throw err;
    }
}



function buildJsonFormData(form) {
    const jsonFormData = {};
    for (const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
}

function buildHeaders(authorization = null) {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": (authorization) ? authorization : "Bearer TOKEN_MISSING"
    };
    return headers;
}