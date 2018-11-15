var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytVideo', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log(event);
}

function onPlayerStateChange(event) {
    console.log(event);
}

function changeState() {
    console.log(player.getPlayerState());
    if (player.getPlayerState() === 1) {
        player.pauseVideo();
    }
    else {
        player.playVideo();
    }
}


window.onscroll = function() {
    var elements = document.getElementsByTagName('section');
    var sections = Array.from(elements);
    sections.forEach(element => {
        var rect = element.getBoundingClientRect();
        var screenHeight = window.innerHeight;
        if (rect.bottom - rect.top < screenHeight/2 && rect.top > screenHeight/4 && rect.bottom < screenHeight/4 * 3) {
            element.classList.add('centered__section');
        }
        else {
            element.classList.remove('centered__section');
        }
    });
}


newArticleButton = document.getElementById('newArticle');
newArticleButton.addEventListener('click', function(){
    const main = document.getElementsByTagName('main')[0];
    const article = document.createElement('article');
    const header = document.createElement('h2');
    const text = document.createTextNode('This is a new article');
    const button = document.createElement('button');
    article.classList.add('new__article');
    button.innerHTML = 'New section!';
    button.style.maxWidth = '150px';
    button.classList.add('new__article__button');
    button.addEventListener('click',function(){
        const section = document.createElement('section');
        section.style.wordBreak = 'break-all';
        const sectionHeader = document.createElement('h3');
        const paragraph = document.createElement('p');
        var randomContent = new String();
        paragraph.innerHTML = generateRandom();
        sectionHeader.append(paragraph);
        section.append(sectionHeader);
        article.insertBefore(section, article.childNodes[1]);
    });
    header.append(text);
    article.append(header);
    article.append(button);
    // main.insertBefore(article, main.firstChild);
    main.insertBefore(article, main.childNodes[2]);
});

function generateRandom() {
    const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
    return [...Array(400)].map(i=>chars[Math.random()*chars.length|0]).join``;
}