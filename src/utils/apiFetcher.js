import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

export const getData = async (saveData) => {
    try {
        const res = await axios.get(API_URL);
        saveData(res.data);
    } catch (err) {
        toast.error(err.message, { theme: "colored" });
    }
}