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

    const mainNavigationAdmin = [
        { name: 'Dashboard', href: 'dashboard', match: ['dashboard'] },
        { name: 'Sites', href: 'sites', match: ['sites', 'site-detail', 'navs', 'pages', 'page-detail', 'nav-detail', 'files', 'meta', 'meta-detail'] },
        { name: 'Users', href: 'users', match: ['users', 'user-detail'] },
    ];
    const mainNavigationUser = [
        { name: 'Dashboard', href: 'dashboard', match: ['dashboard'] },
        { name: 'Sites', href: 'sites', match: ['sites', 'site-detail', 'navs', 'pages', 'page-detail', 'nav-detail', 'files', 'meta', 'meta-detail'] },
    ];
    const mainNavigationRestricted = [
        { name: 'Dashboard', href: 'dashboard', match: ['dashboard'] },
    ];
    const sideNavigation = [
        { name: 'Your Profile', href: 'profile', match: ['profile'] },
        { name: 'Settings', href: 'settings', match: ['settings'] },
        { name: 'Logout', href: 'logout', match: ['logout'] },
    ];
    const sideNavigationRestricted = [
        { name: 'Your Profile', href: 'profile', match: ['profile'] },
        { name: 'Settings', href: 'settings', match: ['settings'] },
        { name: 'Logout', href: 'logout', match: ['logout'] },
    ];
    const sideNavigationNotLogged = [
        { name: 'Login', href: 'login', match: ['login'] },
        { name: 'Recover (lost password)', href: 'recover', match: ['recover'] },
    ];

    return {
        currentRouteMatch,

        navs: {
            admin: {
                left: mainNavigationAdmin,
                search: true,
                notify: true,
                right: sideNavigation,
            },
            user: {
                left: mainNavigationUser,
                search: true,
                notify: true,
                right: sideNavigation,
            },
            restricted: {
                left: mainNavigationRestricted,
                search: true,
                notify: true,
                right: sideNavigationRestricted,
            },
            notLoggedIn: {
                left: [],
                search: false,
                notify: false,
                right: sideNavigationNotLogged,
            }
        }
    }
};

export default mainMenu;
