function getOrchaToken() {
    try {
        console.log("getOrchaToken entered");
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", transferComplete);
        function transferComplete(evt) {
            console.log("The transfer is complete.");
            triggerProcess(xhr.responseText);
        }
        xhr.open("POST", "https://platform.uipath.com/api/account/authenticate");
        xhr.setRequestHeader("Content-Type", "application/json");
        var apiData = JSON.stringify({
            "tenancyName": "",                                                         //Please provide tenant name for orchestrator
            "usernameOrEmailAddress": "",                                              //Please provide email address for orchestrator
            "password": ""                                                             //Please provide password to connect orchestrator
        });
        xhr.send(apiData);
    } catch (e) {
        console.log("getOrchaToken exception=" + e);
    }
}

function triggerProcess(apiResult) {
    try {
        console.log("triggerProcess entered");

        var jsonResponse = JSON.parse(apiResult);
        console.log(jsonResponse.result);
        orchaToken = jsonResponse.result;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", "https://platform.uipath.com/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + orchaToken);

        var apiData = JSON.stringify({
            "startInfo": {
                "ReleaseKey": "",                                                            //Please provide release key for the process you want to run in orchestrator (API - https://platform.uipath.com/odata/Releases)
                "Strategy": "All",
                "RobotIds": [],
                "NoOfRobots": 0
            }
        });
        xhr.send(apiData);
    } catch (e) {
        console.log("triggerProcess exception=" + e);
    }
}

