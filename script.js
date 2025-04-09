// Constant 

const engineIcon = document.getElementById("engineIconDefOrSel");
const enginemsgshow = document.getElementById("enginemsgshow12039");
const mainEnginemsg = document.getElementById("enginemainmsg");
const savebuttonSettings = document.getElementById("saveSettingsButton");
const mainEngineSelected  = document.getElementById("searchEngine")
const searchInput = document.getElementById("searchText92030")
const suggestionsDiv = document.getElementById("suggestionsOfSearch12903921")
const searchButton = document.getElementById("searchButton02131029380912")
const mainSettings = document.getElementById("mainSettingsPDP18982")
const currentTimeDiv = document.querySelector('.CurrentTime');
const hour = document.getElementById("hourcurrentime")
const ampm = document.getElementById("apmpmcurrentime")

//others





//event Listener
document.querySelector('.settings button').addEventListener('click', () => {
    const mainSettingsDiv = document.getElementById('mainSettingsPDP18982');
    if (mainSettingsDiv.style.display === 'none' || mainSettingsDiv.style.display === '') {
        mainSettingsDiv.style.display = 'block';
    } else {
        mainSettingsDiv.style.display = 'none';
    }
});

document.querySelector('.searchBox input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchByOPT();
    }
});

document.querySelector('.searchBox input').addEventListener('input', function() {
    findicoandsuggestion();
});

document.querySelector('.notsavesetting').addEventListener('click', () => {
    document.getElementById('mainSettingsPDP18982').style.display = 'none';
});

savebuttonSettings.addEventListener('click', () => {
    const settingsDiv = document.getElementById('mainSettingsPDP18982');
    const inputs = settingsDiv.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        const name = input.id || input.name;
        if (name) {
            const value = input.type === 'checkbox' ? input.checked : input.value;
            localStorage.setItem(name, value);
            console.log(`Saved setting: ${name} = ${value}`);
        } else {
            console.warn('Input element is missing an id or name attribute.');
        }
    });

    settingsDiv.style.display = 'none'; // Hide settings after saving
});


window.addEventListener('load', loadDefSet);

searchButton.addEventListener("click",()=> {
    searchByOPT()
});









//functions


function loadDefSet(){
        const settingsDiv = document.getElementById('mainSettingsPDP18982');
        const inputs = settingsDiv.querySelectorAll('input, select, textarea');
    
        inputs.forEach(input => {
            const name = input.id || input.name;
            if (name && localStorage.getItem(name) !== null) {
                const value = localStorage.getItem(name);
                if (input.type === 'checkbox') {
                    input.checked = value === 'true';
                } else {
                    input.value = value;
                }
            }
        });

        engineIcon.src = "./res/"+mainEngineSelected.value+".png";
    
}

function getMainSettingsValues() {
    const theme = document.getElementById('options').value;
    const searchEngine = document.getElementById('searchEngine').value;

    return {
        theme,
        searchEngine,
    };
}

function searchbyyt(){
    searchText = searchText.replace('/yt', '').trim().split(/\s+/).join('+');
    window.location.href = "https://www.youtube.com/results?search_query="+searchText;
    document.getElementById("searchText92030").value = '';

}

function searchbyg(){
    searchText = searchText.replace('/g', '').trim().split(/\s+/).join('+');
    window.location.href = "https://www.google.com/search?q="+searchText;
    document.getElementById("searchText92030").value = '';

}

function searchbyb(){
    searchText = searchText.replace('/b', '').trim().split(/\s+/).join('+');
    window.location.href = "https://www.bing.com/search?q="+searchText;
    document.getElementById("searchText92030").value = '';

}

function searchbyy(){
    searchText = searchText.replace('/y', '').trim().split(/\s+/).join('+');
    window.location.href = "https://search.yahoo.com/search?p="+searchText;
    document.getElementById("searchText92030").value = '';

}


//handle searches by options
function searchByOPT(){
    searchText = document.getElementById("searchText92030").value;
    if (searchText.includes("/yt")){
        searchbyyt(searchText);

    }
    
    else if (searchText.includes('/g')){
        searchbyg()
    }
    else if (searchText.includes('/b')) {
        searchbyb()

    }

    else if (searchText.includes('/y')) {
        searchbyy()

    }

    else{
        if (mainEngineSelected.value === "google"){
            searchbyg()
        }

        else if (mainEngineSelected.value === "bing"){
            searchbyb()
        }

        else if (mainEngineSelected.value === "yahoo"){
            searchbyy()
        }
    }




}

function findicoandsuggestion(){
    searchText = document.getElementById("searchText92030").value;
    if (searchText.includes('/g')) {
        mainEnginemsg.innerHTML = "Searching Using Google"
        engineIcon.src = './res/google.png';
        
    }

    if (searchText.includes("/yt")){
        mainEnginemsg.innerHTML = "Searching On Youtube"
        engineIcon.src = './res/youtube.png';
    }

    else if (searchText.includes("/b")){
        engineIcon.src = './res/bing.png';
        mainEnginemsg.innerHTML = "Searching Using Bing"
    
        
    }

    else if (searchText.includes("/y")){
        engineIcon.src = './res/yahoo.png';
        mainEnginemsg.innerHTML = "Searching Using Yahoo"
        
    }

    else{
        engineIcon.src = "./res/"+mainEngineSelected.value+".png"
        mainEnginemsg.innerHTML = "Searching Using "+mainEngineSelected.value;
    }

    if (enginemsgshow.style.opacity<0.1){
        enginemsgshow.style.opacity = 0;
        enginemsgshow.style.display = 'block';
        let opacity = 0;
        const fadeIn = setInterval(() => {
            opacity += 0.3;
            enginemsgshow.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(fadeIn);
            }
        }, 100);
    }  



}

function updateCurrentTime() {

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const isAM = hours < 12;

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    currentTimeDiv.querySelector('h1').textContent = `${formattedHours}:${formattedMinutes}`;
    currentTimeDiv.querySelector('h2').textContent = isAM ? 'AM' : 'PM';
}


setInterval(updateCurrentTime, 1000);
updateCurrentTime();


//Handling Suggestions


function googleSuggestResponse(data) {
    suggestionsDiv.style.display = "none";
    data[1].forEach(suggestion => {
        suggestionsDiv.style.display = "block"
        const btn = document.createElement('button');
        btn.textContent = suggestion;
        btn.onclick = () => {
            if (searchInput.value.includes("/g")){
                searchInput.value = "/g"+suggestion.replace(/%20/g, ' ');
            }
            else if (searchInput.value.includes("/b")){
                searchInput.value = "/b"+suggestion.replace(/%20/g, ' ');
            }
            else if (searchInput.value.includes("/y")){
                searchInput.value = "/y"+suggestion.replace(/%20/g, ' ');
            }

            else if (searchInput.value.includes("/yt")){
                searchInput.value = "/yt"+suggestion.replace(/%20/g, ' ');
            }

            else{
                searchInput.value = suggestion.replace(/%20/g, ' ');
            }


            searchByOPT();
        };
        if (suggestionsDiv.childElementCount < 3) {

            suggestionsDiv.appendChild(btn);

        }
    });
}

function getSuggestions(query) {
    const script = document.createElement('script');
    script.src = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}&callback=googleSuggestResponse`;
    document.body.appendChild(script);
}


function filterSuggestion(){
    real = searchInput.value;
    real = real.replace('/g','')
    real = real.replace('/y','')
    real = real.replace('/yt','')
    real = real.replace('/b','')
    return real
}

searchInput.addEventListener('input', () => {
    suggestionsDiv.innerHTML = "";
    keywords = filterSuggestion()
    getSuggestions(keywords);
});














