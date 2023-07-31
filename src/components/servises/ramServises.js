import axios from 'axios';

const apiBase = 'https://rickandmortyapi.com/api';
export async function getResource(url) {

    const res = await axios.get(`${apiBase}${url}`);

    if (res.status !== 200) {
        throw new Error(`${res.status} Failed Fetch`);
    }

    return res.data;
}

export const getCharacters = (page) => {
    return getResource(`/character/?page=${page}`);
}

export const getEpisode = async (url) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw new Error(`${error.response.status} Failed Fetch`);
    }
}
