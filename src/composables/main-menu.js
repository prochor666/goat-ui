const mainMenu = function () {

    const currentRouteMatch = function (item, route)
    {
        for (let m in item.match) {

            if (route.name === item.match[m]) {

                return true;
            }
        }

        return false;
    };

    const navigation = [
        { name: 'Dashboard', href: 'dashboard', match: ['dashboard'] },
        { name: 'Sites', href: 'sites', match: ['sites', 'site-detail', 'navs', 'pages', 'page-detail', 'nav-detail', 'files', 'meta', 'meta-detail'] },
        { name: 'Users', href: 'users' },
    ];
    const userNavigation = [
        { name: 'Your Profile', href: 'profile', match: ['profile'] },
        { name: 'Settings', href: 'settings', match: ['settings'] },
        { name: 'Logout', href: 'logout', match: ['logout'] },
    ];

    const userNavigationNotLogged = [
        { name: 'Recover', href: 'recover', match: ['recover'] },
        { name: 'Login', href: 'login', match: ['login'] },
    ];

    return {
        currentRouteMatch,
        logged: {
            left: navigation,
            search: true,
            notify: true,
            right: userNavigation,
        },
        notLogged: {
            left: [],
            search: false,
            notify: false,
            right: userNavigationNotLogged,
        }
    }
};

export default mainMenu;
