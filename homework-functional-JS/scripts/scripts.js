if (typeof document !== "undefined") {
    var firstInput = document.getElementById('cityName');
    var secondInput = document.getElementById('ID');
    var button = document.getElementById('fetchData');
    secondInput.addEventListener('keyup', inputChange);
    button.addEventListener('click', getData);
}

function inputChange(event) {
    if (secondInput.value) {
        button.innerHTML = 'Get Forecast';
    }
    else {
        button.innerHTML = 'Get Location';
    }
    return button.innerHTML;
}

function getData(event) {
    event.preventDefault();
    var responseData = [];
    if (firstInput.value)
        var cityName = firstInput.value;
    else
        var cityName = 'default value';
    var cityId = secondInput.value;
    if (button.innerHTML === 'Get Location') {
        axios.get(`https://www.metaweather.com/api/location/search/?query=${cityName}`)
                    .then(function(response) {
                        responseData = response.data;
                        if (responseData.length === 0) {
                            createMessageInContainer('No valid location to display. Please enter a full name location!');
                        }
                        else {
                            createParagraphFromLocationData(responseData[0].title, responseData[0].location_type, responseData[0].woeid, responseData[0].latt_long);
                        }
                        console.log(response); 
                    })
                    .catch(function(error) {
                        var message = 'You got a ' + error.response.status + ' error. Please select a valid location!'
                        createParagraphInContainer(message);
                        console.log(error);
                    });
    }
    else {
        axios.get(`https://www.metaweather.com/api/location/${cityId}`)
                .then(function(response) {
                    createParagraphsFromForecastData(response.data);
                    console.info(response.data);
                })
                .catch(function(error) {
                    var message = 'You got a ' + error.status + ' error. Please select a valid woeid!' 
                    createMessageInContainer(message);
                    console.log(error);
                })
    }
}


function createMessageInContainer(message) {
    var paragraph = document.createElement('p');
    paragraph.innerHTML = message;
    var container = document.getElementById('container');
    container.insertBefore(paragraph, container.childNodes[0]);
} 

function createParagraphFromLocationData(title, location_type, woeid, latt_long) {
    var paragraph = document.createElement('p');
    paragraph.innerHTML = title + ' ' + latt_long + ' ' + location_type + ' ' + woeid;
    var container = document.getElementById('container');
    container.insertBefore(paragraph, container.childNodes[0]);
}

function createParagraphsFromForecastData(obj) {
    // TODO: Not finished, display data(or some data)
    var paragraph = document.createElement('p');
    paragraph.innerHTML = 'Consolidated weather: ';
    obj.consolidated_weather.forEach(element => {
        console.log(element);
        // element.forEach(item => {
        //     paragraph.innerHTML = paragraph.innerHTML + ' ' + item;
        // });
    });
    var container = document.getElementById('container');
    container.insertBefore(paragraph, container.childNodes[0]);
}

module.exports.inputChange = inputChange;
module.exports.createMessageInContainer = createMessageInContainer;
module.exports.getData = getData;