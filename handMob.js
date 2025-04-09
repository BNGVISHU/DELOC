const inputBox = document.getElementById("inputSearchBox901238012")
const mainMsgEngine  = document.getElementById("enginemsgshowpragraph")



// Function to detect the device type
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/mobile|android|iphone|ipad|ipod/.test(userAgent)) {
        return "Mobile";
    } else if (/tablet/.test(userAgent)) {
        return "Tablet";
    } else {
        return "Desktop";
    }
    
}

// Example usage
function handleStyle(){
    const deviceType = detectDevice()
    console.log("Handling style "+deviceType);
    if (deviceType == "Mobile"){
        console.log("mobile")
        searchButton.style.display = "none";
        inputBox.style.width = "80%";
        suggestionsDiv.style.width = "90%";

        inputBox.addEventListener("focus", () => {
            inputBox.style.width = "100%";
        });
        inputBox.addEventListener("blur", () => {
            inputBox.style.width = "60%";
        });
        enginemsgshow.style.padding = "12px";
        mainSettings.style.width = "75vw"
        mainSettings.style.height = "50vh"
        currentTimeDiv.style.position = "absolute";
        currentTimeDiv.style.top = "50%";
        currentTimeDiv.style.left = "50%";
        currentTimeDiv.style.transform = "translate(-50%, -50%)";
        currentTimeDiv.style.textAlign = "center";
        hour.style.fontSize = "90px";
        ampm.style.fontSize = "40px";
        hour.style.textShadow = "4px 4px 6px black, 0px 0px 5px black";
        ampm.style.textShadow = "4px 4px 6px black, 0px 0px 5px black";



        
    }
}

handleStyle()