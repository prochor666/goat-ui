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
    { path: '/', component: Dashboard, name: 'dashboard', meta: { requiredRoles: ['restricted', 'user', 'admin'] } },
    { path: '/sites', component: Sites, name: 'sites', meta: { requiredRoles: ['user', 'admin'] } },
    { path: '/users', component: Users, name: 'users', meta: { requiredRoles: ['admin'] } },
    { path: '/users/:userid', component: UserDetail, name: 'user-detail', meta: { requiredRoles: ['admin'] } },
    { path: '/site-detail/:id', component: SiteDetail, name: 'site-detail', meta: { requiredRoles: ['admin'] } },
    { path: '/sites/:id/:lang/pages', component: SitePages, name: 'pages', meta: { requiredRoles: ['user', 'admin'] } },
    { path: '/sites/:id/:lang/pages/:pageid', component: SitePageDetail, name: 'page-detail', meta: { requiredRoles: ['user', 'admin'] } },
    { path: '/sites/:id/:lang/pages/:pageid/posts', component: SitePagePosts, name: 'posts', meta: { requiredRoles: ['user', 'admin'] } },
    { path: '/sites/:id/:lang/pages/:pageid/posts/:postid', component: SitePagePostDetail, name: 'post-detail', meta: { requiredRoles: ['user', 'admin'] }},
    { path: '/sites/:id/:lang/files/:path?', component: SiteFilemanager, name: 'files', meta: { requiredRoles: ['user', 'admin'] } },
    { path: '/sites/:id/:lang/meta', component: SiteMeta, name: 'meta', meta: { requiredRoles: ['user', 'admin'] } },
    { path: '/sites/:id/:lang/meta/:metaid', component: SiteMetaDetail, name: 'meta-detail', meta: { requiredRoles: ['user', 'admin'] } },
    { path: '/sites/:id/:lang/navs', component: SiteNavs, name: 'navs', meta: { requiredRoles: ['user', 'admin'] } },
    { path: '/sites/:id/:lang/navs/:navid', component: SiteNavDetail, name: 'nav-detail', meta: { requiredRoles: ['user', 'admin'] } },
    { path: '/profile', component: Profile, name: 'profile', meta: { requiredRoles: ['restricted', 'user', 'admin'] } },
    { path: '/settings', component: Settings, name: 'settings', meta: { requiredRoles: ['restricted', 'user', 'admin'] } },
    { path: '/login', component: Login, name: 'login', meta: { requiredRoles: ['notlogged', 'restricted', 'user', 'admin'] } },
    { path: '/logout', component: Logout, name: 'logout', meta: { requiredRoles: ['restricted', 'user', 'admin'] } },
    { path: '/recover', component: Recover, name: 'recover', meta: { requiredRoles: ['notlogged', 'restricted', 'user', 'admin'] } },
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

    console.log(`Try navigate to ${to.path} with role ${to.meta.user.profile.role}`);

    console.log(to.meta.requiredRoles);

    if (to.meta.requiredRoles.includes(to.meta.user.profile.role)) {

        console.log(`I am ${to.meta.user.profile.role} at ${to.path} , it's allowed, required`, to.meta.requiredRoles);
        return true;
    } else {

        console.log(`I am ${to.meta.user.profile.role} at ${to.path} , it's not allowed, required`, to.meta.requiredRoles);
        return '/login';
    }
});

const app = createApp(App);

app.config.globalProperties.$dayjs = dayjs;

app.provide('apiUrl');
app.use(router);
app.use(Notifications);
app.use(VueHighlightJS);

app.mount('#app');
