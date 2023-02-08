import axios from 'axios';

const baseUrl = 'https://my-json-server.typicode.com/gperez-m/db-test-aeromexico/students';


export const getAll = async () => {
    const res = await axios.get(baseUrl);

    return res.data;
}

export const saveStudent = async (values) => {
    const data = {
        name: values.name,
        gender: values.gender,
        dateOfBirth: values.birthday,
        eyeColour: values.eyes,
        hairColour: values.hair,
        hogwartsStudent: true,
        hogwartsStaff: false,
        alive: true,
        image: null
    }
    console.log(data);
    try {
        const res = await axios.post(baseUrl, data);
        return res.data;
    } catch (err) {
        console.error("Error saveStudent", err);
        return 
    }
}