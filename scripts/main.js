
const url = "https://fdnd.directus.app/items/women_in_tech";
const list = document.querySelector('section:nth-of-type(1)>ul');
const personDetail = document.querySelector('.personDetail');


const selection = document.querySelector('select');
const iFrame = document.querySelector('iframe');

// Get all stage elements
const gordijnenL = document.querySelector('.gordijnen');
const gordijnenR = document.querySelector('.right');

// Get all body parts
const personDIV = document.querySelector('.person');
const personHead = document.querySelector('.head');
const personTorso = document.querySelector('.torso');
const personLRLeg = document.querySelector('.lowerRightLeg');
const personRLeg = document.querySelector('.rightLeg');
const personLRArm = document.querySelector('.lowerRightArm');
const personRArm = document.querySelector('.rightArm');
const personLLLeg = document.querySelector('.lowerLeftLeg');
const personLLeg = document.querySelector('.leftLeg');
const personLLArm = document.querySelector('.lowerLeftArm');
const personLArm = document.querySelector('.leftArm');

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
                `<li id="${personID}">
            <article>
            <img src=" https://fdnd.directus.app/assets/${personImgSrc}" alt="${personName}">
            <h3>${personName}</h3>
        </article>
        </li>`;
            list.insertAdjacentHTML('beforeend', personHTML);
        });

        const allListItems = document.querySelectorAll('.scroll-container li')

        allListItems.forEach(listItem => {
            // gebruik voortaan een button, voor nu ok
            listItem.addEventListener('click', getID)
        })
    });
});

function resetAnimation() {
    // Disable body parts
    personDIV.style.animation = "none";
    personHead.style.animation = "none";
    personTorso.style.animation = "none";
    personLRLeg.style.animation = "none";
    personRLeg.style.animation = "none";
    personLRArm.style.animation = "none";
    personRArm.style.animation = "none";
    personLLLeg.style.animation = "none";
    personLLeg.style.animation = "none";
    personLLArm.style.animation = "none";
    personLArm.style.animation = "none";

    setTimeout(() => {

        personDIV.style.animation = "WalkingUp 4s 1 normal linear forwards"
        personHead.style.animation = "transformHead var(--walk-speed) var(--iteration-count) normal ease-in-out forwards"
        personTorso.style.animation = "transformTorso var(--walk-speed) var(--iteration-count) normal ease-in-out forwards"
        personLRLeg.style.animation = "transformlowerRightLeg var(--walk-speed) var(--iteration-count) normal linear forwards"
        personRLeg.style.animation = "transformRightLeg var(--walk-speed) var(--iteration-count) normal ease-in-out forwards"
        personLRArm.style.animation = "transformlowerRightArm var(--walk-speed) var(--iteration-count) normal ease-in-out forwards"
        personRArm.style.animation = "transformRightArm var(--walk-speed) var(--iteration-count) normal ease-in-out forwards"
        personLLLeg.style.animation = "transformlowerLeftLeg var(--walk-speed) var(--iteration-count) normal linear"
        personLLeg.style.animation = "transformleftLeg var(--walk-speed) var(--iteration-count) normal ease-in-out forwards"
        personLLArm.style.animation = "transformlowerLeftArm var(--walk-speed) var(--iteration-count) normal ease-in-out forwards"
        personLArm.style.animation = "transformLeftArm var(--walk-speed) var(--iteration-count) normal ease-in-out forwards"
    }, 10)
}

// Get the clicked on persons ID
function getID(event) {
    console.log(event.target.id);


    const personIDClicked = event.target.id
    if (gordijnenOpen == false) {
        gordijnenL.style.animation = "gordijnenL 6s ease-in-out";
        gordijnenL.style.animationFillMode = "forwards";
        gordijnenR.style.animation = "gordijnenR 6s ease-in-out";
        gordijnenR.style.animationFillMode = "forwards";

        resetAnimation();


        gordijnenOpen = true;
    } else if (gordijnenL.style.animationName == "gordijnenHeropenL") {
        gordijnenL.style.animation = "gordijnenHeropenL2 6s ease-in-out";
        gordijnenL.style.animationFillMode = "forwards";

        setTimeout(() => {
            resetAnimation();
        }, 3000);

        gordijnenR.style.animation = "gordijnenHeropenR2 6s ease-in-out";
        gordijnenR.style.animationFillMode = "forwards";
    } else {
        gordijnenL.style.animation = "gordijnenHeropenL 6s ease-in-out";
        gordijnenL.style.animationFillMode = "forwards";

        gordijnenR.style.animation = "gordijnenHeropenR 6s ease-in-out";
        gordijnenR.style.animationFillMode = "forwards";

        setTimeout(() => {
            resetAnimation();
        }, 3000);
    }


    const scrollContainer = document.querySelector('.scroll-container ul')
    console.log(event.target.offsetLeft)
    scrollContainer.scrollTo({
        left: (event.target.offsetLeft - (window.innerWidth / 2)), top: 0, behavior: 'smooth'
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
                    let short_name = persons.short_name;
                    let period = persons.period;
                    let website = persons.website;
                    let country = persons.country;
                    let github = persons.github;
                    let work = persons.work;

                    let personCodepen = persons.codepen;
                    let personPen = persons.codepen_demo;
                    let personFullPenLink = "";

                    if (personPen != null) {
                        personFullPenLink = personCodepen + "/embed/" + personPen;
                    } else {
                        personFullPenLink = "./gif.html";
                    }

                    const element = document.querySelector(".personDetail");
                    while (element.firstChild) {
                        element.removeChild(element.firstChild);
                    }

                    // iFrame.src = personFullPenLink;

                    personHTML =
                        // `<article id="${personID}" onclick="getID(this.id)">
                        // <img src=" https://fdnd.directus.app/assets/${personImgSrc}" alt="${personName}">
                        // <h3>${personName}</h3>
                        // <p>${personTagline}</p>
                        // </article>`;

                        `   <article class="personsTemplate" id="${personID}" onclick="getID(this.id)">
                                <ul>
                                    <li><img src=" https://fdnd.directus.app/assets/${personImgSrc}" alt="${personName}"></li>
                                    <li>
                                        <h1>${personName}</h1>
                                        <p>"${personTagline}"</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <p>Short name:</p>
                                        <p>Period:</p>
                                        <p>Country:</p>
                                        <p>Work:</p>
                                    </li>
                                    <li>
                                        <p>${short_name}</p>
                                        <p>${period}</p>
                                        <p>${country}</p>
                                        <p>${work}</p>
                                    </li>
                                    <li>
                                        <p>Visit me at:</p>
                                        <div>
                                        <a href="${website}"><img src="../img/website.png" alt="website"></a>
                                        <a href="${github}"><img src="../img/github.png" alt="github"></a>
                                        <a href="${personCodepen}"><img src="../img/codepen.png" alt="codepen"></a>
                                        </div>
                                    </li>
                                </ul>
                                <iframe src="${personFullPenLink}"></iframe>
                            </article>`;

                    personDetail.insertAdjacentHTML('beforeend', personHTML);
                } else {
                    console.log("Werkt niet");
                }
            }, 2990);
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