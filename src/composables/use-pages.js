import { defineCustomElement, reactive } from 'vue';
import axios from 'axios';
import { notify } from 'notiwind';
import utils from '../composables/utils';
import serverResponse from '../composables/use-server-response';

let page = reactive(new Set());
let structNavs = reactive(new Set());
const saving = reactive({
    status: false
});

export const usePages = function () {

    const save = async function (saving, page, router) {

        try {

            const apiUrl = localStorage.getItem("apiUrl") || '';
            let modPage = JSON.parse(JSON.stringify(page));

            let requestMethod = 'post';
            let requestPath = `pages`;
            let searchKey = 'created';

            modPage.public = modPage.public ? 1 : 0;
            modPage.visible = modPage.visible ? 1 : 0;
            modPage.domains_id = parseInt(modPage.domains_id);
            modPage.navs_id = parseInt(modPage.navs_id);
            modPage.order = parseInt(modPage.order);
            modPage.posts_page_count = parseInt(modPage.posts_page_count);

            if (modPage.id > 0) {

                requestMethod = 'put';
                requestPath = `pages/${modPage.id}`;
                searchKey = 'updated';
                delete (modPage.created_at);

            } else {

                modPage.order = await getMaxOrder(modPage.navs_id);
                console.log(modPage.order);

                delete (modPage.id);
            }


            console.log('Nav data', modPage, requestMethod);

            saving.status = true;
            let x = await utils().sleep(400);

            const result = await axios[requestMethod](`${apiUrl}/api/${requestPath}`, modPage, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });

            let state = await result.data;

            console.log('Save result state', state);

            saving.status = false;

            if (state.data.input) {

                saving.result.required = serverResponse().parse(state.data.input);
                console.log(saving.result.required);
            }

            notify({
                group: state.data[searchKey] > 0 ? "success" : "error",
                title: state.data[searchKey] > 0 ? "Done" : "Error",
                text: state.data[searchKey] > 0 ? "Page saved successfully" : "Error saving page data",
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


    const getMaxOrder = async function (navs_id)
    {
        const apiUrl = localStorage.getItem("apiUrl") || '';

        const r = await axios.get(`${apiUrl}/api/pages/?_wfilter[]=navs_id|${navs_id}&_worder[]=order|DESC&_wlimit=1`, {
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


    const patchSiteOrder = async function (saving, domains_id, structNavs)
    {
        saving.status = true;
        const apiUrl = localStorage.getItem("apiUrl") || '';
        let summary = [];
        let orderData = {
            domains_id: domains_id,
            type: 'pages',
            collection: [],
        };

        for (let nav in structNavs) {

            if (structNavs[nav].pages.length > 0) {

                for (let i in structNavs[nav].pages) {

                    orderData.collection.push({
                        id: parseInt(structNavs[nav].pages[i].id),
                        navs_id: parseInt(structNavs[nav].id),
                        order: parseInt(i),
                    });
                }
            }
        }

        //console.log('Sending data', orderData);

        const result = await axios.patch(`${apiUrl}/api/order_patch`, orderData, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });

        let state = await result.data;
        summary.push(state);

        //let x = await utils().sleep(4000);
        saving.status = false;
        //console.log('Site patch summary', summary);

        return summary;
    };

    const postsOrder = function ()
    {
        let posts_order = [
            {
                order: 'id DESC',
                name: 'From newest id [9-0]',
            },
            {
                order: 'id ASC',
                name: 'From oldest id [0-9]',
            },
            {
                order: 'date_publish DESC, id DESC',
                name: 'From newest publishing date [9-0]',
            },
            {
                order: 'date_publish ASC, id ASC',
                name: 'From oldest publishing date [0-9]',
            },
            {
                order: 'name ASC',
                name: 'Order by name [aA-zZ]',
            },
            {
                order: 'name DESC',
                name: 'Order by name [Zz-Aa]',
            },
        ];

        return posts_order;
    };


    const load = async function (id, domains_id) {

        let page = {
            id: 0,
            name: '',
            title: '',
            description: '',
            slug: '',
            order: 0,
            posts_order: '',
            posts_page_count: 0,
            domains_id: domains_id,
            navs_id: 0,
            public: false,
            visible: false,
        };

        const apiUrl = localStorage.getItem("apiUrl") || '';

        const r = await axios.get(`${apiUrl}/api/pages/${id}/?_wfilter[]=domains_id|${domains_id
}`, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });
        let data = await r.data.data;

        if (Object.keys(data).length > 0 && data.id > 0) {

            page = data;
            //console.log(Object.keys(data).length, Object.keys(data)[0], page);
            page.public = page.public == 1 ? true : false;
            page.visible = page.visible == 1 ? true : false;
        }

        return page;
    };


    return {
        page,
        saving,
        save,
        load,
        postsOrder,
        patchSiteOrder,
    }
}

export default usePages;
