import Axios from 'axios';


const AxiosClient = Axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    withCredentials: true
});


export default AxiosClient;