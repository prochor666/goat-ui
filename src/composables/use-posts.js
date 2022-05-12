import { defineCustomElement, reactive } from 'vue';
import axios from 'axios';
import { notify } from 'notiwind';
import utils from '../composables/utils';

let post = reactive(new Set());
const saving = reactive({
    status: false
});

export const usePosts = function () {

    const save = async function (saving, post, router) {

        try {
            console.log(post);

            const apiUrl = localStorage.getItem("apiUrl") || '';
            let modPost = JSON.parse(JSON.stringify(post));

            let requestMethod = 'post';
            let requestPath = `posts`;
            let searchKey = 'created';

            modPost.public = modPost.public ? 1 : 0;
            modPost.pages_id = parseInt(modPost.pages_id);
            modPost.order = parseInt(modPost.order);

            if (modPost.id > 0) {

                requestMethod = 'put';
                requestPath = `posts/${modPost.id}`;
                searchKey = 'updated';
                delete (modPost.created_at);

            } else {

                delete (modPost.id);
            }

            console.log('Nav data', modPost, requestMethod);

            saving.status = true;
            let x = await utils().sleep(400);

            const result = await axios[requestMethod](`${apiUrl}/api/${requestPath}`, modPost, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
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
                text: state.data[searchKey] > 0 ? "Post saved successfully" : "Error saving post data",
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


    const load = async function (id, pages_id) {

        let post = reactive({
            id: 0,
            title: '',
            annotation: '',
            content: '', //'<h1>Get started with Tailwind CSS</h1>',
            slug: '',
            image: '',
            order: 0,
            pages_id: pages_id,
            public: false,
            date_publish: '',
        });

        const apiUrl = localStorage.getItem("apiUrl") || '';

        const r = await axios.get(`${apiUrl}/api/posts/${id}`, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });
        let data = await r.data.data;

        if (Object.keys(data).length > 0 && data.id > 0) {

            post = data;
            post.public = post.public == 1 ? true : false;
        }

        return post;
    };


    return {
        post,
        saving,
        save,
        load,
    }
}

export default usePosts;
