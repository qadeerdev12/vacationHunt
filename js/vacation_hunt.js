let travelData={};

fetch("../assets/vacation_hunt_api.json")
.then(response=>response.json())
.then(data=>{  

    travelData=data;
    console.log(data);

}).catch(error=>{

    console.log("Error:",error);

});

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchRecommendations);

function searchRecommendations(){

    const keyword=document.getElementById("searchInput").value.toLowerCase();


    if(keyword==="beach" || keyword==="beaches") {
        displayResults(travelData.beaches);
    }   else if(keyword==="temple" || keyword==="temples") {
        displayResults(travelData.temples);
    } else if (keyword==="country" || keyword==="countries") {
        let countryResults = [];

        travelData.countries.forEach(country=>{
            const currentTime =
            new Date().toLocaleTimeString("en-US",{
                    timeZone:country.timeZone,
                    hour12:true,
                    hour:"numeric",
                    minute:"numeric",
                    second:"numeric"
                }
            );
            country.cities.forEach(city=>{
                countryResults.push({
                    name:city.name,
                    imageUrl:city.imageUrl,
                    description:city.description,
                    currentTime:currentTime
                });
            });
        });
    
        displayResults(countryResults);
    }
}

function displayResults(items) {
    
    const results = document.getElementById("results");

    results.innerHTML = "";

    items.forEach(item => {
        results.innerHTML += `
        <div class="result-card">
            <img src="../assets/${item.imageUrl}">
            <div class="result-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                ${item.currentTime?`<p>Current Time:${item.currentTime}</p>`:""}
                <button>
                Visit
                </button>
            </div>
        </div>`;
    });

}

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearResults);

function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";

}