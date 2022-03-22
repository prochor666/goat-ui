import axios from 'axios';
import { notify } from 'notiwind';

export const useLogin = function () {

    const login = async function (saving, login, password, router) {
        saving.status = true;

        const apiUrl = localStorage.getItem('apiUrl') || '';
        const session_id = localStorage.getItem('session_id');
        const data = {
            login: login,
            password: password,
        }

        try {

            const r = await axios.post(`${apiUrl}/api/login`, data, {
                headers: {
                    Authorization: session_id,
                    'Content-Type': 'application/json'
                }
            });

            const auth = await r.data;

            if (typeof (auth) === 'object' && auth.data.user.id && auth.data.user.id > 0) {

                localStorage.setItem('session_id', auth.data.ssid);
                router.push('/');
            } else {

                notify({
                    group: "error",
                    title: "Error",
                    text: "Can not login, check your username and password",
                }, 5000);
            }

            saving.status = false;

        } catch (e) {

            saving.status = false;
            console.log('Login error', e);
        }
    };


    return {
        login,
    };
};

export default useLogin;
