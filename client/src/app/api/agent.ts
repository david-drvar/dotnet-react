import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

axios.defaults.baseURL = 'https://localhost:5001/api/';
const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise(resolve => setTimeout(resolve, 100));

axios.interceptors.response.use( async response => {
    await sleep();
    return response;
}, (error: AxiosError) => {
    //console.log('caught by inteceptor');
    // console.log(error.response);
    //console.log(error.response!.data);
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            toast.error(status);
            break;
        case 401:
            toast.error(status);
            break;
        case 404:
            //toast.error(status);
            //history.push('/not-found-error');
            break;
        case 500:
            //toast.error(status);
            history.push('/server-error', { state: error.response!.data });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
});

// isto sto i ovo gore
// function responseBodyFn(response: AxiosResponse) {
//     return response.data;
// }

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;