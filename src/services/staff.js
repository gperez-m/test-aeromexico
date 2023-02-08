import axios from 'axios';

const baseUrl = "https://my-json-server.typicode.com/gperez-m/db-test-aeromexico/staff"; //'http://localhost:3001/staff';


export const getAll = async () => {
    const res = await axios.get(baseUrl);

    return res.data;
}