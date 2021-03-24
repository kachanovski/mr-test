import axios from "axios";

export const api = {
    getData: () => {
        return  axios.get('https://cors-anywhere.herokuapp.com/http://www.mrsoft.by/data.json')
    }
}