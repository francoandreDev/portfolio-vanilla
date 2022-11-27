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

const [theme] = document.getElementsByClassName('theme');
let referenceTheme = new Theme();

theme.onclick = () => {
    const cssRoot = document.styleSheets[6]['cssRules'][0].style;
    const darkModeOn = () => {
        cssRoot.setProperty(
            '--current-bg-1',
            cssRoot.getPropertyValue('--dark-bg-1')
        );
        cssRoot.setProperty(
            '--current-bg-2',
            cssRoot.getPropertyValue('--dark-bg-2')
        );
        cssRoot.setProperty(
            '--current-color-main',
            cssRoot.getPropertyValue('--dark-color-main')
        );
        cssRoot.setProperty(
            '--current-color-secondary',
            cssRoot.getPropertyValue('--dark-color-secondary')
        );
    };
    const lightModeOn = () => {
        cssRoot.setProperty(
            '--current-bg-1',
            cssRoot.getPropertyValue('--light-bg-1')
        );
        cssRoot.setProperty(
            '--current-bg-2',
            cssRoot.getPropertyValue('--light-bg-2')
        );
        cssRoot.setProperty(
            '--current-color-main',
            cssRoot.getPropertyValue('--light-color-main')
        );
        cssRoot.setProperty(
            '--current-color-secondary',
            cssRoot.getPropertyValue('--light-color-secondary')
        );
    };
    referenceTheme.toggleTheme();
    referenceTheme.isDark ? darkModeOn() : lightModeOn();

    theme.innerHTML = `${referenceTheme.currentNameProperty} mode`;
};
