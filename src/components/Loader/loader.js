import css from './loader.css'

const spinner = document.querySelector('#PreLoaderspinner');

export default {
    show(){
        spinner.classList.remove('is-hidden');
    },
    hide(){
        spinner.classList.add('is-hidden');
    },
};