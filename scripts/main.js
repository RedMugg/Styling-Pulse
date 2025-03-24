
const url = "https://fdnd.directus.app/items/women_in_tech";
const list = document.querySelector('section:nth-of-type(1)');
const personDetail = document.querySelector('section:nth-of-type(2)');
 

const selection = document.querySelector('select');

// Get all the woman in tech field from API
getAllPersons();

function getAllPersons() {
    getData(url).then(data => {

        const persons = data.data;

        var result = persons;

        result.forEach(result => {
            let personName = result.name;
            let personImgSrc = result.image;
            let personTagline = result.tagline;
            let personID = result.id;


            // Add info to template and repeat for everyone
            personHTML =
                `<article id="${personID}" onclick="getID(this.id)">
                <img src=" https://fdnd.directus.app/assets/${personImgSrc}" alt="${personName}">
                <h3>${personName}</h3>
                <p>${personTagline}</p>
            </article>`;
            list.insertAdjacentHTML('beforeend', personHTML);
        });

    });
}


// Filter the selection of women and refresh who is shown
selection.addEventListener('change', function getPersonSelection() {
    getData(url).then(data => {

        const persons = data.data;

        var result = persons;
        console.log(selection.value);

        switch (selection.value) {
            case "all":
                result = persons;
                console.log(result);
                break;
            case "webWeirdness":
                result = persons.filter((period) => (period.period.includes("web weirdness")));
                console.log(result);
                break;
            case "webPioneer":
                result = persons.filter((period) => (period.period.includes("web pioneer")));
                console.log(result);
                break;
            case "webMaturity":
                result = persons.filter((period) => (period.period.includes("web maturity")));
                console.log(result);
                break;
            case "wayBack":
                result = persons.filter((period) => (period.period.includes("way back")));
                console.log(result);
                break;
            }
            
            const element = document.querySelector("section");
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            
            result.forEach(result => {
                let personName = result.name;
                let personImgSrc = result.image;
                let personTagline = result.tagline;
                let personID = result.id;
                
                personHTML =
                `<article id="${personID}" onclick="getID(this.id)">
                <img src=" https://fdnd.directus.app/assets/${personImgSrc}" alt="${personName}">
                <h3>${personName}</h3>
                <p>${personTagline}</p>
                </article>`;
                list.insertAdjacentHTML('beforeend', personHTML);
            });
        });
    });
    
    // Get the clicked on persons ID
    function getID(personIDClicked) {
        console.log(personIDClicked);
        
        getData(url).then(data => {
            
            const persons = data.data;
            console.log(persons);

            persons.forEach(persons => {

                if (persons.id == personIDClicked) {
                let personName = persons.name;
                let personImgSrc = persons.image;
                let personTagline = persons.tagline;
                let personID = persons.id;
                
                const element = document.querySelector("section:nth-of-type(2)");
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
    
                personHTML =
                    `<article id="${personID}" onclick="getID(this.id)">
                    <img src=" https://fdnd.directus.app/assets/${personImgSrc}" alt="${personName}">
                    <h3>${personName}</h3>
                    <p>${personTagline}</p>
                </article>`;
                personDetail.insertAdjacentHTML('beforeend', personHTML);
                } else {
                    console.log("Werkt niet");
                }
            })
    });
}


// Basic function to retrieve data from the desired url
async function getData(URL) {
    return (
        fetch(URL)
            .then(
                response => response.json()
            )
            .then(
                jsonData => { return jsonData }
            )
    );
}