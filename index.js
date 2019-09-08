const animals = [
    'images/animals/bird.jpg',
    'images/animals/cat.jpg',
    'images/animals/rhinoceros.jpg',
    'images/animals/dog.jpg',
    'images/animals/fox.jpg',
    'images/animals/hors.jpg',
    'images/animals/lizard.jpg',
    'images/animals/monkey.jpg',
    'images/animals/panda.jpg'
];

const berriesAndFruits = [
    'images/berriesAndFruits/apple.jpg',
    'images/berriesAndFruits/banana.jpg',
    'images/berriesAndFruits/blueberries.jpg',
    'images/berriesAndFruits/lemon.jpg',
    'images/berriesAndFruits/granat.jpg',
    'images/berriesAndFruits/pineapple.jpg',
    'images/berriesAndFruits/raspberries.jpg',
    'images/berriesAndFruits/strawberry.jpg',
    'images/berriesAndFruits/watermelon.jpg'
];

const friends = [
    'images/friends/lemish.jpg',
    'images/friends/pashaG.jpg',
    'images/friends/petay.jpg',
    'images/friends/romaS.jpg',
    'images/friends/sergeyL.jpg',
    'images/friends/sergeyZ.jpg',
    'images/friends/zhenya.jpg',
    'images/friends/pasha.jpg',
    'images/friends/andrey.jpg',
];

const themeCard = {
    animals,
    berriesAndFruits,
    friends,
};

let memoryGameTheEndInscription = document.querySelector('.memoryGame__the-end');

const startPage = document.querySelector('.startPage');
const gamePage = document.querySelector('.memoryGame');
const settingsPage = document.querySelector('.settings');
const playGameButton = document.querySelector('.play-button');
const settingButton = document.querySelector('.settings-button');
const backButtonGame = document.querySelector('.backButton__game');
const backButtonSettings = document.querySelector('.backButton__settings');
const cardsElement = document.querySelector('.cards');

let attemptCounter = document.querySelector('.memoryGame__counter');
let attempt = 0;

let randomCardForGet = [];

let settingInput = null;
let columns = null;
let rows = null;
let numberOfCards = null;


function setGrid(columns, rows) {
    cardsElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    cardsElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
}

function getGridParameters() {
    settingInput = document.querySelector('input[name="getCard"]:checked');

    columns = settingInput.dataset.column;
    rows = settingInput.dataset.row;
}

function getThemeCard() {
    let themaCard = document.querySelector('input[name="style"]:checked');
    let nameThemaCard = themaCard.value;
    console.log(nameThemaCard);
    return nameThemaCard;
}

/*   startPage   */

let themeCardsName = null;

playGameButton.addEventListener('click', handleClickPlayGame);

function handleClickPlayGame(event) {
    startPage.classList.add('hiddenPage');
    gamePage.classList.remove('hiddenPage');

    let themeName = getThemeCard();
    themeCardsName = themeCard[themeName];

    getGridParameters();
    numberOfCards = columns * rows;

    setGrid(columns, rows);
    const cards = getCards();
    setCardsToCardsElement(cards);
}


settingButton.addEventListener('click', handleClickSettingsButton);

function handleClickSettingsButton() {
    startPage.classList.add('hiddenPage');
    settingsPage.classList.remove('hiddenPage')
}

/*   BackPageButton   */

backButtonGame.addEventListener('click', handleClickBackButtonGame);

function handleClickBackButtonGame(event) {
    backFromGamePage();
}

backButtonSettings.addEventListener('click', handleClickBackButtonSettings);

function handleClickBackButtonSettings() {
    backFromSettingsPage();
}

function backFromGamePage() {
    startPage.classList.remove('hiddenPage');
    gamePage.classList.add('hiddenPage');
    randomCardForGet.length = 0;

    columns = null;
    rows = null;
    numberOfCards = null;

    while (cardsElement.firstChild) {
        cardsElement.removeChild(cardsElement.firstChild);
    }

    attemptCounter.textContent = 'Number of attempts: 00';
    attempt = 0;

    memoryGameTheEndInscription.classList.remove('memoryGame__the-end-opasity');
}

function backFromSettingsPage() {
    startPage.classList.remove('hiddenPage');
    settingsPage.classList.add('hiddenPage');
}

function getCards() {
    const duplication = 2;
    const cards = [];

    for (let j = 0; j < duplication; j++) {
        for (let i = 1; i <= (numberOfCards / duplication); i++) {
            const card = createCard(i, themeCardsName[i - 1]);
            cards.push(card);
        }
    }

    makeRandomCards(cards);
    return cards;
}

function createCard(number, imageCard) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.dataset.name = number;

    const cardFrontSide = document.createElement('img');
    cardFrontSide.classList.add('card__frontSide');
    cardFrontSide.src = imageCard;

    const cardBackSide = document.createElement('img');
    cardBackSide.classList.add('card__backSide');
    cardBackSide.src = "images/argyle-640x1136.png";

    card.appendChild(cardBackSide);
    card.appendChild(cardFrontSide);

    return card;
}

function makeRandomCards(cards) {
    let j = 0;
    let temp = 0;

    for (let i = cards.length - 1; i > 0; i--) {
        const min = 0;
        const max = cards.length;
        j = Math.floor(Math.random() * (max - min)) + min;

        temp = cards[j];
        cards[j] = cards[i];
        cards[i] = temp;
    }
}

function setCardsToCardsElement(cards) {
    for (let i = 0; i < cards.length; i++) {
        cardsElement.appendChild(cards[i]);
    }
}

/*===============================Card===================================================*/

const currentOpenCards = [];

cardsElement.addEventListener('click', handleClickCards);

function handleClickCards(event) {
    let target = event.target.closest('.card');

    if (!target) {
        return;
    }

    if (currentOpenCards[0] === target) {
        return;
    }

    openCard(target);
}

function openCard(cardElement) {
    currentOpenCards.push(cardElement);

    if (currentOpenCards.length < 3) {
        cardElement.classList.toggle('card__rotate');
    }

    if (currentOpenCards.length === 2) {
        comparison();

        attempt++;
        attemptCounter.textContent = `Number of attempts: ${addZeroIfItNeed(attempt)}`;
    }
}

function addZeroIfItNeed(number) {
    let result = number;

    if (number < 10) {
        result = `0${number}`;
    }

    return result;
}

function comparison() {
    const firstCardName = currentOpenCards[0].dataset.name;
    const secondCardName = currentOpenCards[1].dataset.name;

    if (firstCardName === secondCardName) {
        setTimeout(hideCards, 1500);
    } else {
        setTimeout(flipCardsBack, 1500);
    }
}

function flipCardsBack() {
    currentOpenCards[0].classList.toggle('card__rotate');
    currentOpenCards[1].classList.toggle('card__rotate');

    currentOpenCards.length = 0;
}

let guessingCardCounter = 0;


function hideCards() {
    currentOpenCards[0].classList.add('hiddenElement');
    currentOpenCards[1].classList.add('hiddenElement');

    guessingCardCounter++;

    currentOpenCards.length = 0;

    if (guessingCardCounter == (numberOfCards / 2)) {
        memoryGameTheEndInscription.textContent = `The end of the game took ${attempt} attempts`;
        memoryGameTheEndInscription.classList.add('memoryGame__the-end-opacity');
    }
}


