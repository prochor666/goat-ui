import { defineCustomElement, reactive } from 'vue';
import axios from 'axios';
import { notify } from 'notiwind';
import utils from '../composables/utils';
import serverResponse from '../composables/use-server-response';

let nav = reactive(new Set());
let navs = reactive(new Set());
let saving = reactive({
    status: false,
    result: {},
});

export const useNavs = function () {

    let save = async function (saving, nav, router) {

        try {

            const session_id = localStorage.getItem('session_id');
            const apiUrl = localStorage.getItem("apiUrl") || '';
            let modNav = JSON.parse(JSON.stringify(nav));

            let requestMethod = 'post';
            let requestPath = `navs`;
            let searchKey = 'created';

            modNav.public = modNav.public ? 1 : 0;
            modNav.domains_id = parseInt(modNav.domains_id);
            modNav.order = parseInt(modNav.order);

            if (modNav.id > 0) {

                requestMethod = 'put';
                requestPath = `navs/${modNav.id}`;
                searchKey = 'updated';
                delete (modNav.created_at);

            } else {

                modNav.order = await getMaxOrder(modNav.domains_id);

                delete (modNav.id);
            }

            console.log('Nav data', modNav, requestMethod);

            saving.status = true;
            let x = await utils().sleep(400);

            const result = await axios[requestMethod](`${apiUrl}/api/${requestPath}`, modNav, {
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
                text: state.data[searchKey] > 0 ? "Nav saved successfully" : "Error saving nav data",
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


    const getMaxOrder = async function (domains_id) {
        const apiUrl = localStorage.getItem("apiUrl") || '';

        const r = await axios.get(`${apiUrl}/api/navs/?_wfilter[]=domains_id|${domains_id}&_worder[]=order|DESC&_wlimit=1`, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });
        let data = await r.data.data;

        if (data.length > 0 && data[0].id > 0) {

            console.log(data);
            return parseInt(data[0].order) + 1;
        }

        return 0;
    };


    const patchNavOrder = async function (saving, navs) {

        saving.status = true;
        const apiUrl = localStorage.getItem("apiUrl") || '';
        let summary = [];

        for (let i in navs) {

            let patchNav = {
                order: parseInt(i),
            }
            //console.log('Patch nav data', patchNav);

            let patchID = navs[i].id;
            const result = await axios.patch(`${apiUrl}/api/navs/${patchID}`, patchNav, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });

            let state = await result.data;
            summary.push(state);
        }

        saving.status = false;
        //console.log('Site patch summary', summary);

        return summary;
    };


    let load = async function (id, domains_id) {

        let nav = {
            id: 0,
            name: '',
            order: 0,
            domains_id: domains_id,
            public: false,
        };

        const apiUrl = localStorage.getItem("apiUrl") || '';

        const r = await axios.get(`${apiUrl}/api/navs/${id}`, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });
        let data = await r.data.data;

        if (Object.keys(data).length > 1 && data.id > 0) {

            nav = data;
            nav.public = nav.public == 1 ? true : false;
        }

        return nav;
    };


    return {
        nav,
        saving,
        save,
        load,
        patchNavOrder,
    }
}

export default useNavs;
