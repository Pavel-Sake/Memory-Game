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


const startPage = document.querySelector('.startPage');
const gamePage = document.querySelector('.memoryGame');
const settingsPage = document.querySelector('.settings');
const playGameButton = document.querySelector('.play-button');
const settingButton = document.querySelector('.settings-button');
const backButtonGame = document.querySelector('.backButton__gama');
const backButtonSettings = document.querySelector('.backButton__settings');
const cardsElement = document.querySelector('.cards');


cardsElement.addEventListener('click', handleClickCards);

let attemptCounter = document.querySelector('.memoryGame__counter');
let attemp = 0;

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
    let themaCard = document.querySelector('input[name="style"]:checked')
    let nameThemaCard = themaCard.value;
    console.log(nameThemaCard);
    return nameThemaCard;
}

/*   startPage   */

let nmaeThemaCards = null

playGameButton.addEventListener('click', handleClickPlayGame);

function handleClickPlayGame(event) {
    startPage.classList.add('hiddenPage');
    gamePage.classList.remove('hiddenPage');

    let nameThema = getThemeCard();
    nmaeThemaCards = themeCard[nameThema];

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

    attemptCounter.textContent = '00';
    attemp = 0;

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
            const card = createCard(i, nmaeThemaCards[i - 1]);
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

    card.appendChild(cardFrontSide);
    card.appendChild(cardBackSide);

    return card;
}

function makeRandomCards(cards) {
    let j = 0;
    let temp = 0;

    for (let i = cards.length - 1; i > 0; i--) {
        // другой немного рандом, скину статью

        j = Math.floor(Math.random() * (i + 1));

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
    const childrenCard = cardElement.children;
    const nameOpenCard = cardElement.dataset.name;

    currentOpenCards.push(cardElement);

    childrenCard[0].classList.add('card__frontSide-turnOver');
    childrenCard[1].classList.add('card__backSide-turnOver');

    if (currentOpenCards.length === 2) {
        comparison();

        attemp++;

        if (attemp < 10) {
            attemptCounter.textContent = ` 0${attemp}`;
        } else if (attemp => 10) {
            attemptCounter.textContent = attemp;
        }
    }
}


function comparison() {
    const firstCard = currentOpenCards[0].dataset.name;
    const secondCard = currentOpenCards[1].dataset.name;

    if (firstCard === secondCard) {
        setTimeout(hideCards, 1000);
    } else {
        setTimeout(flipCardsBack, 1000);
    }
}

function flipCardsBack() {
    /*   firstCard   */

    const firsCardBackSideBackSide = currentOpenCards[0].querySelector('.card__backSide');
    const firsCardBackSideFrontSide = currentOpenCards[0].querySelector('.card__frontSide');

    firsCardBackSideFrontSide.classList.remove('card__frontSide-turnOver');
    firsCardBackSideBackSide.classList.remove('card__backSide-turnOver');

    /*   secondCard   */

    const secondCardBackSideBackSide = currentOpenCards[1].querySelector('.card__backSide');
    const secondCardBackSideFrontSide = currentOpenCards[1].querySelector('.card__frontSide');

    secondCardBackSideFrontSide.classList.remove('card__frontSide-turnOver');
    secondCardBackSideBackSide.classList.remove('card__backSide-turnOver');

    currentOpenCards.length = 0;
}

let guessingCardCounter = 0;

function hideCards() {
    currentOpenCards[0].classList.add('hiddenElement');
    currentOpenCards[1].classList.add('hiddenElement');

    currentOpenCards.length = 0;

    guessingCardCounter++;
    console.log(numberOfCards / 2);
    console.log(guessingCardCounter);

    if (guessingCardCounter == (numberOfCards / 2)) {
        console.log('функция загружается');
        let memoryGameTheEndInscription = document.querySelector('.memoryGame__the-end');
        memoryGameTheEndInscription.textContent = `the end of the game took ${attemp} attempts`
        memoryGameTheEndInscription.classList.add('memoryGame__the-end-opasity');
    }
}


