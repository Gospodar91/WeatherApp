import css from './loader.css'
import { LoaderOptionsPlugin } from "webpack";
const spinner = document.querySelector('#spinner');

export default {
    show(){
        spinner.classList.remove('is-hidden');
    },
    hide(){
        spinner.classList.add('is-hidden');
    },
};