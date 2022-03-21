import axios from 'axios';

export const useRecovery = async () => {


    const recover = async function (apiUrl, userStr) {
        const account = {

        };

        const session_id = localStorage.getItem('session_id');
        const data = {
            user: userStr,
        }

        try {

            if (typeof session_id === 'string') {

                const r = await axios.post(`${apiUrl}/api/recover`, data, {
                    headers: {
                        Authorization: session_id,
                        'Content-Type': 'application/json'
                    }
                });

                const auth = await r.data;

                if (typeof (auth) === 'object' && auth.data.user.id && auth.data.user.id > 0) {

                    //console.log('Auto login', auth.data.user);
                }
            }
        } catch (e) {

            console.log('Login error', e);
        }
    };


    return {
        recover,
    };
};

export default useRecovery;
