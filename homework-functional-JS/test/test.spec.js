const axios = require('axios');
const { expect } = require('chai');
const scripts = require('../scripts/scripts.js');

var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();
var document = mock.getDocument();
var sinon = require('sinon');

function fakeCreateMessageIncontainer(message) {
    var paragraph = document.createElement('p');
    paragraph.innerHTML = message;
    return paragraph;
}

function fakeFecthDataWeatherApi(cityName) {
    axios.get(`https://www.metaweather.com/api/location/search/?query=${cityName}`)
                    .then(function(response) {
                        return response;
                    })
                    .catch(function(error) {
                        return error;
                    });
}

it ('Should test the new paragraph message', function() {
    var text = sinon.stub(scripts, 'createMessageInContainer').callsFake(fakeCreateMessageIncontainer('test message'));
    expect(text.innerHTML).to.be = 'test message';
});

describe('Test for fetching data from weather api', function() {
    it('Should get data from specified api', async () => {
        const fetchedData = await sinon.stub(scripts, 'getData').callsFake(fakeFecthDataWeatherApi('London'));
        expect(fetchedData).to.be.not.null;
    });
});