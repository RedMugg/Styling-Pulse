
const url = "https://fdnd.directus.app/items/women_in_tech";
const list = document.querySelector('section:nth-of-type(1)>ul');
const personDetail = document.querySelector('section:nth-of-type(2)');


const selection = document.querySelector('select');
const iFrame = document.querySelector('iframe');

// Get all stage elements
const gordijnenL = document.querySelector('.gordijnen');
const gordijnenR = document.querySelector('.right')

var gordijnenOpen = false;

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
                `<li id="${personID}">
                <article>
                <img src=" https://fdnd.directus.app/assets/${personImgSrc}" alt="${personName}">
                <h3>${personName}</h3>
            </article>
            </li>`;
            list.insertAdjacentHTML('beforeend', personHTML);
        });
        const allListItems = document.querySelectorAll('.scroll-container li')
        // we halen alle list items op en loopen er doorheen
        allListItems.forEach(listItem => {
            // gebruik voortaan een button, voor nu ok
            listItem.addEventListener('click', getID)
        })

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

        const element = document.querySelector("section>ul");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        result.forEach(result => {
            let personName = result.name;
            let personImgSrc = result.image;
            let personTagline = result.tagline;
            let personID = result.id;

            // Add info to template and repeat for everyone
            personHTML =
                `<li id="${personID}" onclick="getID(this.id)">
                <article>
                <img src="https://fdnd.directus.app/assets/${personImgSrc}" alt="${personName}">
                <h3>${personName}</h3>
            </article>
            </li>`;
            list.insertAdjacentHTML('beforeend', personHTML);
        });
    });
});



// Get the clicked on persons ID
function getID(event) {
    const personIDClicked = event.target.id
    if (gordijnenOpen == false) {
        gordijnenL.style.animation = "gordijnenL 6s ease-in-out";
        gordijnenL.style.animationFillMode = "forwards";
        gordijnenR.style.animation = "gordijnenR 6s ease-in-out";
        gordijnenR.style.animationFillMode = "forwards";

        gordijnenOpen = true;
    } else if (gordijnenOpen == true) {

        gordijnenL.style.animation = "none";
        gordijnenR.style.animation = "none";
        setTimeout(() => {
            gordijnenL.style.animation = "gordijnenHeropenL 6s ease-in-out";
            gordijnenL.style.animationFillMode = "forwards";

            gordijnenR.style.animation = "gordijnenHeropenR 6s ease-in-out";
            gordijnenR.style.animationFillMode = "forwards";
        }, 10);
    }
<<<<<<< Updated upstream
    const scrollContainer = document.querySelector('.scroll-container')
    console.log(event.target.offsetLeft)
    console.log(scrollContainer)
=======
    const scrollContainer = document.querySelector('.scroll-container ul')
    console.log(event.target.offsetLeft)
>>>>>>> Stashed changes
    scrollContainer.scrollTo({left: event.target.offsetLeft, top: 0, behavior: 'smooth'
    })

    getData(url).then(data => {

        const persons = data.data;
        console.log(persons);

        persons.forEach(persons => {

            setTimeout(() => {
                if (persons.id == personIDClicked) {
                    let personID = persons.id;
                    let personName = persons.name;
                    let personImgSrc = persons.image;
                    let personTagline = persons.tagline;

                    let personCodepen = persons.codepen;
                    let personPen = persons.codepen_demo;
                    let personFullPenLink = personCodepen + "/embed/" + personPen;

                    const element = document.querySelector("section:nth-of-type(2)");
                    while (element.firstChild) {
                        element.removeChild(element.firstChild);
                    }

                    // iFrame.src = personFullPenLink;

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
            }, 2000);
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