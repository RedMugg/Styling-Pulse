
const url = "https://fdnd.directus.app/items/women_in_tech";
const list = document.querySelector('section');


const selection = document.querySelector('select');

selection.addEventListener('change', getEverybody());

function getEverybody() {
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

            personHTML =
                `<article>
                <img src=" https://fdnd.directus.app/assets/${personImgSrc}" alt="${personName}">
                <h3>${personName}</h3>
                <p>${personTagline}</p>
            </article>`;
            list.insertAdjacentHTML('beforeend', personHTML);
        });

    });
}

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