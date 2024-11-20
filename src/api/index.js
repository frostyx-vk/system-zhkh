import axios from 'axios';
import {
    serverBaseUrl,
    ABOUT_PORTAL_LIST,
    CONTACT_LIST,
    NEWS_LIST,
    SERVICE_LIST
} from '../api/urls'

const headers = { headers: {"Authorization" : 'Token ' + localStorage.accessToken}}
export const newsList = await axios.get(`${serverBaseUrl}${NEWS_LIST}`, headers).then(res => res.data).catch(err => console.log(err));
export const serviceList = await axios.get(`${serverBaseUrl}${SERVICE_LIST}`, headers).then(res => res.data).catch(err => console.log(err));
export const aboutPortalList = await axios.get(`${serverBaseUrl}${ABOUT_PORTAL_LIST}`, headers).then(res => res.data).catch(err => console.log(err));
export const contactList = await axios.get(`${serverBaseUrl}${CONTACT_LIST}`, headers).then(res => res.data).catch(err => console.log(err));
