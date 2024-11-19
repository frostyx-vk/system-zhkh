import axios from 'axios';
import {
    serverBaseUrl,
    NEWS_LIST
} from '../api/urls'


export const newsList = await axios.get(`${serverBaseUrl}${NEWS_LIST}`, {
    headers: { "Authorization": 'Token ' + localStorage.accessToken }
})
    .then(res => res.data)
    .catch(err => console.log(err));
