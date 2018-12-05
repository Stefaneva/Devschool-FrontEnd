dictionaryStore = {}
var log = new Map();

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Cipher{ 
    constructor(key) {
        if(!key)
            key = 123;
        this.key = key;
    }

    async encode(message) {
        if (!checkString(message))
            return;
        var encodedMessage = '';
        for (let char of message) {
            var encodedChar = char.charCodeAt() * this.key;
            if (encodedMessage !== '') {
                encodedMessage = encodedMessage + '|' + encodedChar;
            }   
            else
                encodedMessage = encodedChar; 
        }
        dictionaryStore[encodedMessage] = message;
        await timeout(message.length * 100);
        log.set(dateFormat(), `"${message}" encoded as "${encodedMessage}"`);
        return encodedMessage;
    }

    async decode(message) {
        if (!checkString(message))
            return;
        var decodedMessage = '';
        if (dictionaryStore[message]) {
            decodedMessage = dictionaryStore[message];
        }
        else {
            var stringArray = message.split('|');
            stringArray.forEach(element => {
                decodedMessage += decodeElement(element);
            });
        }
        await timeout(message.length * 100);
        log.set(dateFormat(), `"${message}" decoded as "${decodedMessage}"`);
        return decodedMessage;
    }

    readLog() {
        for (let key of log.keys())
            console.log(key + ':' + log.get(key));
    }
}

function dateFormat() {
    var currentDate = new Date();
    var currentDateFormatted =  currentDate.getDay() + '/'
                                    + currentDate.getMonth() + '/'
                                    + currentDate.getFullYear() + ', '
                                    + currentDate.getHours() + ':'
                                    + currentDate.getMinutes() + ':'
                                    + currentDate.getSeconds() + ' ';
    if (currentDate.getHours >= 12)
        currentDateFormatted += 'AM';
    else
        currentDateFormatted += 'PM';
    return currentDateFormatted;
}

function checkString(message) {
    if(!(typeof message === 'string')) {
        console.log("Message is not a string!");
        return false;
    }
    return true;
}

function decodeElement(element) {
    return String.fromCharCode(element/cipher.key);
}

(async () => {
    var cipher = new Cipher(20);
    var message = "asD";
    message = await cipher.encode(message);
    var message = await cipher.decode(message);
    cipher = new Cipher(30);
    message = await cipher.encode(message);
    message = await cipher.decode(message);
    cipher.readLog();
})();
