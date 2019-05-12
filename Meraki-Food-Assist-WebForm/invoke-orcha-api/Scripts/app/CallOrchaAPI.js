function getOrchaToken() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        console.log("The transfer is complete.");
        triggerProcess(xhr.responseText);
    }
    xhr.open("POST", "https://platform.uipath.com/api/account/authenticate");
    xhr.setRequestHeader("Content-Type", "application/json");
    var apiData = JSON.stringify({
        "tenancyName": "harshvchawla",
        "usernameOrEmailAddress": "harshvchawla@yahoo.co.in",
        "password": "chef-doeuvre1"
    });
    xhr.send(apiData);
}

function triggerProcess(apiResult) {
    var jsonResponse = JSON.parse(apiResult);
    console.log(jsonResponse.result);
    orchaToken = jsonResponse.result;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            finallyComplete();
        }
    });

    xhr.open("POST", "https://platform.uipath.com/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + orchaToken);
    
    var apiData = JSON.stringify({
        "startInfo": {
            "ReleaseKey": "96f192bd-b6c5-4f43-865c-6f61e10611b6",
            "Strategy": "All",
            "RobotIds": [],
            "NoOfRobots": 0
        }
    });
    xhr.send(apiData);
}

function finallyComplete() {
    alert("all done!!");
}

function callOrchaAPI() {
    getOrchaToken();
}
