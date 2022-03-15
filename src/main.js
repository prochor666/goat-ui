import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import dayjs from 'dayjs';
import Notifications from 'notiwind';
import VueHighlightJS from 'vue3-highlightjs';
import App from './App.vue';
import Login from './vue-components/Login.vue';
import Logout from './vue-components/Logout.vue';
import Recover from './vue-components/Recover.vue';
import Dashboard from './vue-components/Dashboard.vue';
import Profile from './vue-components/Profile.vue';
import Users from './vue-components/Users.vue';
import UserDetail from './vue-components/UserDetail.vue';
import Sites from './vue-components/Sites.vue';
import SiteDetail from './vue-components/SiteDetail.vue';
import SiteNavs from './vue-components/SiteNavs.vue';
import SiteNavDetail from './vue-components/SiteNavDetail.vue';
import SitePages from './vue-components/SitePages.vue';
import SitePageDetail from './vue-components/SitePageDetail.vue';
import SitePagePosts from './vue-components/SitePagePosts.vue';
import SitePagePostDetail from './vue-components/SitePagePostDetail.vue';
import SiteFilemanager from './vue-components/SiteFilemanager.vue';
import SiteMeta from './vue-components/SiteMeta.vue';
import SiteMetaDetail from './vue-components/SiteMetaDetail.vue';
import Settings from './vue-components/Settings.vue';
import apiEndpoint from './composables/api-endpoint';
import autoLogin from './composables/auto-login';
import './index.css';

const routes = [
    { path: '/', component: Dashboard, name: 'dashboard' },
    { path: '/sites', component: Sites, name: 'sites' },
    { path: '/users', component: Users, name: 'users' },
    { path: '/users/:userid', component: UserDetail, name: 'user-detail' },
    { path: '/site-detail/:id', component: SiteDetail, name: 'site-detail' },
    { path: '/sites/:id/pages', component: SitePages, name: 'pages' },
    { path: '/sites/:id/pages/:pageid', component: SitePageDetail, name: 'page-detail' },
    { path: '/sites/:id/pages/:pageid/posts', component: SitePagePosts, name: 'posts' },
    { path: '/sites/:id/pages/:pageid/posts/:postid', component: SitePagePostDetail, name: 'post-detail' },
    { path: '/sites/:id/files/:path?', component: SiteFilemanager, name: 'files' },
    { path: '/sites/:id/meta', component: SiteMeta, name: 'meta' },
    { path: '/sites/:id/meta/:metaid', component: SiteMetaDetail, name: 'meta-detail' },
    { path: '/sites/:id/navs', component: SiteNavs, name: 'navs' },
    { path: '/sites/:id/navs/:navid', component: SiteNavDetail, name: 'nav-detail' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/settings', component: Settings, name: 'settings' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/logout', component: Logout, name: 'logout' },
    { path: '/recover', component: Recover, name: 'recover' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from) => {

    //console.log(`Try navigate to ${to.path} from ${from.path}`);
    const apiUrl = await apiEndpoint();

    to.meta.user = await autoLogin(apiUrl);
    to.meta.apiUrl = apiUrl;

    if (!['recover', 'login'].includes(to.name)) {

        if (!to.meta.user.logged) {

            return '/login';
        }

    } else {

        //console.log(`route ${to.path} doesn't require login`);
        return true;
    }
});

const app = createApp(App);

app.config.globalProperties.$dayjs = dayjs;

app.provide('apiUrl');
app.use(router);
app.use(Notifications);
app.use(VueHighlightJS);

app.mount('#app');
