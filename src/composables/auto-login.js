import axios from 'axios';

export const autoLogin = async (apiUrl) => {

    const loginInfo = {
        logged: false,
        profile: {
            id: 0,
            username: '',
        },
        ip: '',
    };

    const session_id = localStorage.getItem('session_id');

    try {

        if (typeof session_id === 'string') {

            const r = await axios.get(`${apiUrl}/api/login`, {
                headers: {
                    Authorization: session_id,
                    'Content-Type': 'application/json'
                }
            });

            const auth = await r.data;

            //console.log('Auto login', auth);
            if (typeof (auth) === 'object' && auth.data.user.id && auth.data.user.id > 0) {

                loginInfo.logged = true;
                loginInfo.profile = auth.data.user;
                loginInfo.ip = auth.data.ip;
            }
        }
    } catch (e) {

        console.log('Login error', e);
    }



    return loginInfo;
};

export default autoLogin;
