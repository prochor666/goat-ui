import axios from 'axios';

export const apiEndpoint = async () => {

    try {
        const apiUrl = localStorage.getItem('apiUrl');

        if (apiUrl !== null) {
            return apiUrl;
        }

        const res = await axios.get('/api-endpoint.json');
        const e = await res.data;

        if (typeof (e) === 'object') {

            const url = e.url || '';
            localStorage.setItem('apiUrl', url);
            console.log(`Setup new API url ${url}`);

            return url;
        }
        return '';

    } catch (e) {

        console.log(e);
        return '';
    }
};

export default apiEndpoint;
