import axios from 'axios';

const baseUrl = 'http://localhost:3001/staff';


export const getAll = async () => {
    const res = await axios.get(baseUrl);

    return res.data;
}