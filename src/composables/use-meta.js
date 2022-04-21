import { reactive } from 'vue';
import axios from 'axios';
import { notify } from 'notiwind';
import utils from '../composables/utils';

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
            modMeta.required = modMeta.required ? 1 : 0;
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

            //console.log('Meta data send', modMeta, requestMethod);

            saving.status = true;
            let x = await utils().sleep(400);

            const result = await axios[requestMethod](`${apiUrl}/api/${requestPath}`, modMeta, {
                headers: {
                    Authorization: session_id,
                    'Content-Type': 'application/json'
                }
            });

            let state = await result.data;

            //console.log('Save result state', state);

            saving.status = false;
            saving.result = state;

            notify({
                group: state.data[searchKey] > 0 ? "success" : "error",
                title: state.data[searchKey] > 0 ? "Done" : "Error",
                text: state.data[searchKey] > 0 ? "Meta saved successfully" : state.data['error'] || "Error saving meta data",
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

            return parseInt(data[0].order) + 1;
        }

        return 0;
    };


    const patchMetaOrder = async function (saving, domains_id, metas) {

        saving.status = true;
        const apiUrl = localStorage.getItem("apiUrl") || '';
        let summary = [];
        let orderData = {
            domains_id: domains_id,
            type: 'meta',
            collection: [],
        };

        for (let i in metas) {

            orderData.collection.push({
                id: parseInt(metas[i].id),
                order: parseInt(i),
            });
        }

        const result = await axios.patch(`${apiUrl}/api/order_patch`, orderData, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });

        let state = await result.data;
        summary.push(state);

        saving.status = false;
        console.log('Meta patch summary', summary);

        return summary;
    };


    const removedDefaultValue = function (meta, removeIndex) {

        meta.default.values = meta.default.values.filter(function (value, index, arr) {
            return removeIndex != index;
        });

        return meta;
    };


    const addDefaultValue = function (meta, langs, default_value = '') {

        let valueNames = {};

        for (let i in langs) {

            valueNames[langs[i].alpha2] = '';
        }

        meta.default.values.push({
            value: default_value,
            names: valueNames,
        });

        //console.log('addLangValue', meta.default);

        return meta;
    };


    const createDefault = function (meta, langs, default_value = '') {

        for (let i in langs) {

            //console.log('add title', meta.default);
            meta.default.titles[langs[i].alpha2] = '';
        }

        meta = addDefaultValue(meta, langs, default_value);

        return meta;
    };


    const reset = function (meta, langs, default_value = '') {

        meta.default = {
            titles: {},
            values: [],
        };

        meta.widget = types()[meta.type].widgets[0];

        meta = createDefault(meta, langs, default_value);

        return meta;
    };


    const applicables = function () {

        return {
            users: 'Users',
            posts: 'Posts',
            pages: 'Pages',
            navs: 'Navs',
            //groups: 'Groups',
            //sites: 'Sites',
        }
    };


    const types = function () {

        return {
            text: {
                name: 'Text input',
                widgets: ['text'],
                default: '',
            },
            blob: {
                name: 'Multiline input',
                widgets: ['textarea'],
                default: '',
            },
            color: {
                name: 'Color picker',
                widgets: ['color'],
                default: 'rgba(0,0,0,1)',
            },
            selection: {
                name: 'Single selection',
                widgets: ['radio', 'select'],
                default: [],
            },
            multiple: {
                name: 'Multiple selection',
                widgets: ['checkbox'],
                default: [],
            },
            files: {
                name: 'Files (uploader)',
                widgets: ['files'],
                default: false,
            },
        };
    };


    const attach = async function (id, site, target) {

        const apiUrl = localStorage.getItem("apiUrl") || '';

        const r = await axios.get(`${apiUrl}/api/meta/?_wfilter=domains_id|${site.id}&_wfilter=target|${target}&_worder[]=order|ASC&_worder[]=tag|ASC&extract=1`, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });

        let cache = await r.data.data,
            data = [];

        if (r.data.data) {

            console.log('Ok', cache);
            data = cache;
        } else {

            console.log('Failed to load result', r);
        }

        return data;
    };


    const load = async function (id, domains_id, langs) {

        let meta = {
            id: 0,
            tag: '',
            order: 0,
            type: 'text',
            widget: 'text',
            target: 'users',
            validate_as: 'text',
            required: false,
            default: {
                titles: {},
                values: [],
            },
            domains_id: domains_id,
            public: false,
        };

        meta = createDefault(meta, langs, '');

        const apiUrl = localStorage.getItem("apiUrl") || '';

        const r = await axios.get(`${apiUrl}/api/meta/${id}`, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });
        let data = await r.data.data;

        //console.log('Meta loaded', data);

        if (Object.keys(data).length > 1 && data.id > 0) {

            meta = data;
            meta.public = meta.public == 1 ? true : false;
            meta.required = meta.required == 1 ? true : false;
        }

        meta = reactive(meta);

        return meta;
    };


    return {
        saving,
        save,
        load,
        attach,
        reset,
        types,
        applicables,
        createDefault,
        addDefaultValue,
        removedDefaultValue,
        patchMetaOrder,
    }
}

export default useMeta;
