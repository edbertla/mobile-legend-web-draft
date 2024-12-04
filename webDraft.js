import { heroes, formatHeroName } from "./data/hero_database.js";


// Nickname Update

const nameInputs = document.querySelectorAll('.name-input');

nameInputs.forEach(input => {

    const { side, nicknameNumber } = input.dataset;
    const boxSelector = `${side}-nickname-${nicknameNumber}`
    const boxElement = document.querySelector(`.${boxSelector}`)

    input.addEventListener('input', () => {
        const query = input.value.toUpperCase();
        if (query) {
            boxElement.querySelector('p').innerHTML = query;
        } else {
            boxElement.querySelector('p').innerHTML = `PLAYER ${nicknameNumber}`;
        }
    })
})


// Hero Selection

const heroInputs = document.querySelectorAll('.hero-input');

heroInputs.forEach(input => {
    input.addEventListener('input', function () {
        const { side, pickOrBan, boxNumber } = input.dataset
        const query = input.value.toLowerCase();
        const dropdown = input.nextElementSibling;

        dropdown.innerHTML = '';

        if (query.length > 0) {
            const filteredHeroes = heroes.filter(hero => hero.toLowerCase().includes(query));

            filteredHeroes.forEach(hero => {
                const div = document.createElement('div');
                div.textContent = hero;
                div.onclick = function () {
                    input.value = hero;
                    dropdown.style.display = 'none';
                    updateDisplayBox(side, pickOrBan, boxNumber, hero);
                };
                dropdown.appendChild(div);
            });

            dropdown.style.display = filteredHeroes.length > 0 ? 'block' : 'none';
        } else {
            dropdown.style.display = 'none';
        }
    });

    document.addEventListener('click', function (event) {
        if (!input.contains(event.target) && !input.nextElementSibling.contains(event.target)) {
            input.nextElementSibling.style.display = 'none';
        }
    });
});

function updateDisplayBox(side, pickOrBan, boxNumber, selectedHero) {
    const boxSelector = `${side}-${pickOrBan}-${boxNumber}`
    const boxElement = document.querySelector(`.${boxSelector}`);

    if (!boxElement) {
        console.error(`Box with selector "${boxSelector}" not found.`);
        return;
    }

    const imgElement = boxElement.querySelector("img");

    if (imgElement) {
        if (boxElement.classList.contains('active')) {
            boxElement.classList.remove('active');
            setTimeout(() => {
                imgElement.src = `data/${pickOrBan}_list/${formatHeroName(selectedHero)}.png`;
                boxElement.classList.add('active');
            }, 1000);
        } else {
            imgElement.src = `data/${pickOrBan}_list/${formatHeroName(selectedHero)}.png`;
            boxElement.classList.add('active');
        }

    } else {
        console.error(`Image element not found in "${boxSelector}".`)
    }
}

// Tournament Name Update

const tournamentNameInput = document.getElementById('tournament-name-input');
const tournamentNameElement = document.querySelector('.tournament-name');

tournamentNameInput.addEventListener('input', () => {
    const query = tournamentNameInput.value.toUpperCase();
    if (query) {
        tournamentNameElement.innerHTML = query;
    } else {
        tournamentNameElement.innerHTML = `TOURNAMENT NAME`;
    }
})

// Team Name Update

const teamNameInputs = document.querySelectorAll('.team-name-input');

teamNameInputs.forEach(input => {

    const { side } = input.dataset;
    const elementSelector = `${side}-team-name`
    const boxElement = document.querySelector(`.${elementSelector}`)

    input.addEventListener('input', () => {
        const query = input.value.toUpperCase();
        if (query) {
            boxElement.querySelector('p').innerHTML = query;
        } else {
            boxElement.querySelector('p').innerHTML = `${side.toUpperCase()} TEAM`;
        }
    })
})

// Series Update

const seriesElement = document.getElementById('best-of-series');
const leftPointElement = document.querySelector('.left-point img');
const rightPointElement = document.querySelector('.right-point img');
const leftPointDropdown = document.getElementById('left-point-input');
const rightPointDropdown = document.getElementById('right-point-input');
let selectedSeries = Number(seriesElement.value);

seriesElement.addEventListener('change', () => {
    selectedSeries = Number(seriesElement.value);
    const newImageSrc = `./asset/gamePoint/${selectedSeries}-0.png`;
    leftPointElement.src = newImageSrc;
    rightPointElement.src = newImageSrc;

    // Update Point Option
    let maxPoints;
    if (selectedSeries === 1) {
        maxPoints = 1;
    } else if (selectedSeries === 3) {
        maxPoints = 2;
    } else if (selectedSeries === 5) {
        maxPoints = 3;
    }

    updatePointOption(maxPoints);
});

function updatePointOption(maxPoints) {
    [leftPointDropdown, rightPointDropdown].forEach(dropdown => {
        dropdown.innerHTML = '';

        for (let i = 0; i <= maxPoints; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            dropdown.appendChild(option);
        }

        dropdown.value = '0';
    });
}

// Point Update

leftPointDropdown.addEventListener('change', () => {
    const leftPointSelected = leftPointDropdown.value;
    const newImageSrc = `./asset/gamePoint/${selectedSeries}-${leftPointSelected}.png`;
    leftPointElement.src = newImageSrc;
})

rightPointDropdown.addEventListener('change', () => {
    const rightPointSelected = rightPointDropdown.value;
    const newImageSrc = `./asset/gamePoint/${selectedSeries}-${rightPointSelected}.png`;
    rightPointElement.src = newImageSrc;
})

// Team Logo Update

const leftTeamLogoInput = document.getElementById('left-team-logo-input');
const leftTeamLogoPreview = document.querySelector('.left-team-logo');

leftTeamLogoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            leftTeamLogoPreview.style.backgroundImage = `url(${e.target.result})`;
        }

        reader.readAsDataURL(file);
    } else {
        leftTeamLogoInput.style.backgroundImage = "url('asset/Evos.png)";
    }
});

const rightTeamLogoInput = document.getElementById('right-team-logo-input');
const rightTeamLogoPreview = document.querySelector('.right-team-logo');

rightTeamLogoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            rightTeamLogoPreview.style.backgroundImage = `url(${e.target.result})`;
        }

        reader.readAsDataURL(file);
    } else {
        rightTeamLogoInput.style.backgroundImage = "url('asset/Rrq.png)";
    }
});