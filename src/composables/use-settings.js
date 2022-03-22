import { reactive } from 'vue';
import axios from 'axios';
import { notify } from 'notiwind';
import utils from '../composables/utils';

let userSettings = reactive(new Set());
let saving = reactive(new Set());

export const useSettings = function () {

    let save = async function (saving, userSettings) {
        try {
            saving.status = true;
            let x = await utils().sleep(500);

            const apiUrl = localStorage.getItem("apiUrl") || '';
            const modSettings = JSON.parse(JSON.stringify(userSettings));

            for (let key in modSettings.server) {

                modSettings.server[key] = modSettings.server[key] ? 1: 0;
            }

            console.log('Settings mod', modSettings.server);

            localStorage.setItem('darkTheme', modSettings.client.darkTheme);
            localStorage.setItem('codeEditorTheme', modSettings.client.codeEditorTheme);

            const result = await axios.put(`${apiUrl}/api/settings/${modSettings.id}`, modSettings.server, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });

            let state = await result.data;
            console.log('Save state', state);

            if (modSettings.client.darkTheme === true) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            saving.status = false;

            if (state.data.input) {

                saving.result.required = serverResponse().parse(state.data.input);
            }

            let searchKey = 'error';

            notify({
                group: !state.data[searchKey] ? "success" : "error",
                title: !state.data[searchKey] ? "Done" : "Error",
                text:  !state.data[searchKey] ? "Settings saved successfully" : "Error saving settings data",
            }, 5000);

            console.log('Settings origin', userSettings);

        } catch (e) {
            console.log(e);
            saving.status = false;
            return '';
        }
    }

    const load = async function (id)
    {
        userSettings = {
            id: id,
            server: {
                notify_user_change: false,
                notify_domain_change: false,
                notify_page_change: false,
                notify_post_change: false,
                notify_errors: false,
            },
            client: {
                darkTheme: JSON.parse(localStorage.getItem('darkTheme')) || false,
                codeEditorTheme: localStorage.getItem('codeEditorTheme') || 'night',
            }
        };
        const apiUrl = localStorage.getItem("apiUrl") || '';
        const r = await axios.get(`${apiUrl}/api/settings/${id}`, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });

        const data = await r.data.data;

        if (Object.keys(data).length > 0) {

            for (let s in data) {

                if (data[s].setting && data[s].setting in userSettings.server) {

                    userSettings.server[data[s].setting] = data[s].value == 1 ? true : false;
                }
            }
        }

        return userSettings;
    }

    return {
        load,
        userSettings,
        saving,
        save,
    }
}

export default useSettings;
