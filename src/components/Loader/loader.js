// import './loader.css'

const spinner = document.querySelector('#PreLoaderspinner');
const backgroundImage = document.querySelector('.background-image');

export default {
    show(){
        spinner.classList.remove('is-hidden');

        backgroundImage.style.display = 'none';
        spinner.style.position = 'fixed';
        spinner.style.display = 'flex';
        spinner.style.justifyContent = 'center';
        spinner.style.alignItems = 'center';
        spinner.style.zIndex = '1000000000000';
        spinner.style.width = '100%';
        spinner.style.height = '100vh';
        spinner.style.backgroundColor = 'grey';
    },
    hide(){
        spinner.classList.add('is-hidden');

        backgroundImage.style.display = null;
        spinner.style.position = null;
        spinner.style.display = null;
        spinner.style.justifyContent = null;
        spinner.style.alignItems = null;
        spinner.style.zIndex = null;
        spinner.style.width = null;
        spinner.style.height = null;
        spinner.style.backgroundColor = null;
    },
};  