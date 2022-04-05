import { reactive } from 'vue';
import axios from 'axios';
import { notify } from 'notiwind';
import utils from '../composables/utils';

let meta = reactive(new Set());
let metas = reactive(new Set());
let saving = reactive({
    status: false,
    result: {},
});

export const useMeta = function () {

    let save = async function (saving, meta, router) {

        try {

            const session_id = localStorage.getItem('session_id');
            const apiUrl = localStorage.getItem("apiUrl") || '';
            let modMeta = JSON.parse(JSON.stringify(meta));

            let requestMethod = 'post';
            let requestPath = `meta`;
            let searchKey = 'created';

            modMeta.public = modMeta.public ? 1 : 0;
            modMeta.domains_id = parseInt(modMeta.domains_id);
            modMeta.order = parseInt(modMeta.order);

            if (modMeta.id > 0) {

                requestMethod = 'put';
                requestPath = `meta/${modMeta.id}`;
                searchKey = 'updated';
                delete (modMeta.created_at);

            } else {

                modMeta.order = await getMaxOrder(modMeta.domains_id);

                delete (modMeta.id);
            }

            console.log('Nav data', modMeta, requestMethod);

            saving.status = true;
            let x = await utils().sleep(400);

            const result = await axios[requestMethod](`${apiUrl}/api/${requestPath}`, modMeta, {
                headers: {
                    Authorization: session_id,
                    'Content-Type': 'application/json'
                }
            });

            let state = await result.data;

            console.log('Save result state', state);

            saving.status = false;
            saving.result = state;

            notify({
                group: state.data[searchKey] > 0 ? "success" : "error",
                title: state.data[searchKey] > 0 ? "Done" : "Error",
                text: state.data[searchKey] > 0 ? "Meta saved successfully" : "Error saving meta data",
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

        const r = await axios.get(`${apiUrl}/api/meta/?_wfilter[]=domains_id|${domains_id}&_worder[]=order|DESC&_wlimit=1`, {
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


    const patchMetaOrder = async function (saving, metas) {

        saving.status = true;
        const apiUrl = localStorage.getItem("apiUrl") || '';
        let summary = [];

        for (let i in metas) {

            let patchMeta = {
                order: parseInt(i),
            }
            //console.log('Patch meta data', patchMeta);

            let patchID = metas[i].id;
            const result = await axios.patch(`${apiUrl}/api/meta/${patchID}`, patchMeta, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });

            let state = await result.data;
            summary.push(state);
        }

        saving.status = false;
        console.log('Meta patch summary', summary);

        return summary;
    };


    const reset = function (meta, langs, default_value = '') {

        meta.options = [];

        if (meta.type === 'color') {

            default_value = 'rgba(0,0,0,1)';
        }


        for (let i in langs) {

            meta.options.push({
                name: '',
                alpha2: langs[i].alpha2,
                lang: langs[i].name,
                defaults: [{
                    value: default_value,
                    title: '',
                    default: true,
                }],
                data: [],
            });
        }

        return meta;
    };


    const load = async function (id, domains_id, langs) {

        let meta = {
            id: 0,
            tag: '',
            order: 0,
            type: 'text',
            validate_as: 'text',
            required: false,
            options: [],
            domains_id: domains_id,
            public: false,
        };

        for (let i in langs) {

            meta.options.push({
                name: '',
                alpha2: langs[i].alpha2,
                lang: langs[i].name,
                defaults: [{
                    value: '',
                    title: '',
                    default: true,
                }],
                data: [],
            });
        }

        const apiUrl = localStorage.getItem("apiUrl") || '';

        const r = await axios.get(`${apiUrl}/api/meta/${id}`, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });
        let data = await r.data.data;

        if (Object.keys(data).length > 1 && data.id > 0) {

            meta = data;
            meta.public = meta.public == 1 ? true : false;
        }

        return meta;
    };


    return {
        meta,
        saving,
        save,
        load,
        reset,
        patchMetaOrder,
    }
}

export default useMeta;
