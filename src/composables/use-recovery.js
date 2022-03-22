import axios from 'axios';
import { notify } from 'notiwind';

export const useRecovery = function() {

    const recover = async function (saving, userStr) {
        saving.status = true;

        const apiUrl = localStorage.getItem('apiUrl') || '';
        const session_id = localStorage.getItem('session_id');
        const searchKey = 'recover';
        const data = {
            user: userStr,
        }

        try {

            console.log('Recovery data', data, session_id);

            const r = await axios.post(`${apiUrl}/api/recover`, data, {
                headers: {
                    Authorization: session_id,
                    'Content-Type': 'application/json'
                }
            });

            const auth = await r.data;

            notify({
                group: auth.data[searchKey] ? "success" : "error",
                title: auth.data[searchKey] ? "Done" : "Error",
                text: auth.data[searchKey] ? "Password recovery initiaded, check your email" : "Error finding user",
            }, 5000);

            saving.status = false;

        } catch (e) {

            saving.status = false;
            console.log('Login error', e);
        }
    };


    return {
        recover,
    };
};

export default useRecovery;
