import { defineCustomElement, reactive } from 'vue';
import axios from 'axios';
import { notify } from 'notiwind';
import utils from '../composables/utils';
import serverResponse from '../composables/use-server-response';

let site = reactive(new Set());
let saving = reactive(new Set());

export const useSites = function () {

    let save = async function (saving, site, router) {

        try {

            const session_id = localStorage.getItem('session_id');
            const apiUrl = localStorage.getItem("apiUrl") || '';
            let modSite = JSON.parse(JSON.stringify(site));

            let requestMethod = 'post';
            let requestPath = `domains`;
            let searchKey = 'created';

            modSite.public = modSite.public ? 1 : 0;

            if (modSite.id > 0) {

                requestMethod = 'put';
                requestPath = `domains/${modSite.id}`;
                searchKey = 'updated';
                delete (modSite.created_at);

            } else {

                delete (modSite.id);
            }

            if (modSite.aliases.length > 0) {

                modSite.aliases = modSite.aliases.trim().split('\n');
            } else {

                modSite.aliases = [];
            }

            modSite.langs.map( function(element){

                if (element.selected) {

                    delete (element.selected);
                }
                if (element['alpha3-b']) {

                    delete (element['alpha3-b']);
                }
                if (element['id']) {

                    delete (element['id']);
                }
                if (element['domains_id']) {

                    delete (element['domains_id']);
                }
                return element;
            });

            console.log(`Site data mod ${requestMethod}`, modSite, );

            saving.status = true;
            let x = await utils().sleep(400);

            const result = await axios[requestMethod](`${apiUrl}/api/${requestPath}`, modSite, {
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
                text: state.data[searchKey] > 0 ? "Site saved successfully" : `Error saving site data`,
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

        let site = {
            id: 0,
            host: '',
            name: '',
            public: false,
            aliases: '',
            langs: [],
            lang_default: 'en',
        };

        const apiUrl = localStorage.getItem("apiUrl") || '';

        const r = await axios.get(`${apiUrl}/api/domains/${id}`, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });
        let data = await r.data.data;

        if (Object.keys(data).length > 1 && data.id > 0) {

            site = data;
            site.public = site.public == 1 ? true : false;

            let newAliases = [];

            if (typeof site.aliases === 'object') {

                for (let i in site.aliases) {

                    newAliases.push(site.aliases[i].host);
                }

                site.aliases = newAliases.join('\n');
            }
        }

        return site;
    };

    return {
        site,
        saving,
        save,
        load,
    }
}

export default useSites;
