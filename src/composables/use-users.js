import { defineCustomElement, reactive } from 'vue';
import axios from 'axios';
import { notify } from 'notiwind';
import utils from '../composables/utils';
import serverResponse from '../composables/use-server-response';

let user = reactive(new Set());
let saving = reactive(new Set());

export const useUsers = function () {

    let save = async function (saving, user, router) {

        try {

            const session_id = localStorage.getItem('session_id');
            const apiUrl = localStorage.getItem("apiUrl") || '';
            let modUser = { ...user };

            console.log('User data', modUser);

            let requestMethod = 'patch';
            let searchKey = 'patched';

            if (modUser.password.length > 0 && modUser.confirm_password.length > 0) {

                requestMethod = 'put';
                searchKey = 'updated';
            }

            saving.status = true;
            let x = await utils().sleep(400);

            if (requestMethod === 'patch') {

                delete (modUser.password);
                delete (modUser.confirm_password);

            } else {

                delete (modUser.confirm_password);
            }

            const result = await axios[requestMethod](`${apiUrl}/api/users/${modUser.id}`, modUser, {
                headers: {
                    Authorization: session_id,
                    'Content-Type': 'application/json'
                }
            });

            let state = await result.data;

            console.log('Save result state', state);

            saving.status = false;

            if (state.data.input) {

                saving.result.required = serverResponse().parse(state.data.input);
            }

            notify({
                group: state.data[searchKey] > 0 ? "success" : "error",
                title: state.data[searchKey] > 0 ? "Done" : "Error",
                text: state.data[searchKey] > 0 ? "Profile saved successfully" : "Error saving user data",
            }, 5000);

            if (router && state.data[searchKey] > 0) {

                //router.go(-1);
                //router.push('/users');
            }

        } catch (e) {
            console.log(e);
            saving.status = false;
            return '';
        }
    };


    let load = async function (id) {

        let user = {
            id: 0,
            username: '',
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            role: 'user',
            token: '',
            auth2: '000000',
            active: false,
        };

        const apiUrl = localStorage.getItem("apiUrl") || '';

        const r = await axios.get(`${apiUrl}/api/users/${id}`, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });
        let data = await r.data.data;

        if (Object.keys(data).length > 1 && data.id > 0) {

            user = data;
            user.active = parseInt(user.active) === 1 ? true : false;
        }

        return user;
    };


    return {
        user,
        saving,
        save,
        load,
    }
}

export default useUsers;
