class Theme {
    constructor() {
        this.isDark = true;
        this.currentNameProperty = 'light';
    }

    toggleTheme() {
        this.isDark = !this.isDark;
        this.currentNameProperty =
            this.currentNameProperty === 'dark' ? 'light' : 'dark';
    }
}

class VariablesCSS {
    constructor() {
        this.modeColors = ['dark', 'light', 'current'];
        this.typeColors = ['bg', 'color'];
        this.variant = ['1', '2', 'main', 'secondary'];
    }
}

const [theme] = document.getElementsByClassName('theme');
let referenceTheme = new Theme();
let vCss = new VariablesCSS();

theme.onclick = () => {
    const cssRoot = document.styleSheets[6]['cssRules'][0].style;
    const darkModeOnOff = (on = 0) => {
        for (let i = 0, e = 0; i < 4, e < 2; i++) {
            if (i > 0 && i % 2 === 0) e++;
            cssRoot.setProperty(
                `--${vCss.modeColors[2]}-${vCss.typeColors[e]}-${vCss.variant[i]}`,
                cssRoot.getPropertyValue(
                    `--${vCss.modeColors[on]}-${vCss.typeColors[e]}-${vCss.variant[i]}`
                )
            );
        }
    };
    referenceTheme.toggleTheme();
    referenceTheme.isDark ? darkModeOnOff(0) : darkModeOnOff(1);

    theme.innerHTML = `${referenceTheme.currentNameProperty} mode`;
};

const menu = document.querySelector('header>button.menu-mobile');
let isMenuOpen = false;

if (menu) {
    menu.onclick = () => {
        const [bars, close] = menu.children;
        const nav = document.querySelector('header>.menu');
        const openWindow = () => {
            bars.style.opacity = 0;
            close.style.opacity = 1;
            nav.style.animation = 'slide 1s linear forwards';
        };
        const closeWindow = () => {
            bars.style.opacity = 1;
            close.style.opacity = 0;
            nav.style.animation = 'slide-out 1s linear forwards';
        };
        isMenuOpen ? closeWindow() : openWindow();
        isMenuOpen = !isMenuOpen;
    };
}

class CardCarrousel {
    constructor(currentCard) {
        this.card = currentCard;
        this.min = 0;
        this.max = 4;
        this.showCards = new Array(this.max + 1).fill(false);
    }
    prevCard() {
        switch (this.card) {
            case this.min:
                this.card = this.max;
                break;
            default:
                this.card--;
                break;
        }
    }
    nextCard() {
        switch (this.card) {
            case this.max:
                this.card = this.min;
                break;
            default:
                this.card++;
                break;
        }
    }
    updatePositionCards(cards) {
        cards.style.translate = `calc(-1 * (80vw) * ${this.card}) 0`;
    }

    updateShowCards(cardPosition) {
        this.showCards[cardPosition] = !this.showCards[cardPosition];
    }
}

const containerCarrousel = document.querySelector(
    '.projects .container-scroll'
);
const [carrousel, buttonPrev, buttonNext, buttonDetails] =
    containerCarrousel.children;
const currentCard = new CardCarrousel(0);

buttonPrev.onclick = () => {
    currentCard.prevCard();
    currentCard.updatePositionCards(carrousel);
};

buttonNext.onclick = () => {
    currentCard.nextCard();
    currentCard.updatePositionCards(carrousel);
};

buttonDetails.onclick = () => {
    const cards = document.querySelectorAll(
        'section.carrousel>article.rep-image>div.info'
    );
    const maxIndex = cards.length;
    if (currentCard.card >= maxIndex) return;
    currentCard.updateShowCards(currentCard.card);
    currentCard.showCards.forEach((boolShow, index) => {
        if (cards[index]) {
            boolShow
                ? (cards[index].style.opacity = 1)
                : (cards[index].style.opacity = 0);
        }
    });
};

const cardsCarrousel = [document.querySelector('.projects .carrousel')];
const links = [
    'https://roaring-gelato-802b57.netlify.app',
    'https://chipper-bombolone-5b3ef8.netlify.app',
    'https://admirable-marigold-c2127c.netlify.app',
    'https://enchanting-creponne-feca9f.netlify.app',
    ''
];

cardsCarrousel.forEach((card, index) => {
    const link = links[index];
    if (link) {
        card.onclick = () => {
            window.open(link);
        };
    }
});

const sendEmail = () => {
    const [inputName, inputPhone, inputEmail, textAreaMessage] =
        formContact.elements;
    const name = inputName.value;
    const phone = inputPhone.value;
    const email = inputEmail.value;
    const message = textAreaMessage.value;
    const data = {
        name,
        phone,
        email,
        message
    };
    let sendEmail = 'mailto: ';
    sendEmail += escape('francoandre.dev@gmail.com');
    sendEmail += `?subject=${escape('Message from contact me')}`;
    sendEmail += `&body=Im ${data.name} - `;
    if (phone) sendEmail += data.phone + ' - ';
    if (email) sendEmail += data.email + ' - ';
    if (message) sendEmail += data.message + '.';

    window.location.href = sendEmail;
};

const formContact = document.querySelector('.contact-me form');

formContact.onsubmit = () => {
    sendEmail();
};
