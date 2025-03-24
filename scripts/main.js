
const url = "https://fdnd.directus.app/items/women_in_tech";
const list = document.querySelector('section');

getEverybody();


function getEverybody() {
    getData(url).then(data => {

        const persons = data.data;
        console.log(persons);

        const element = document.querySelector("section");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        const result = persons.filter((period) => word.length > 6);

        persons.forEach(persons => {
            let personName = persons.name;
            let personImgSrc = persons.image;
            let personTagline = persons.tagline;

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