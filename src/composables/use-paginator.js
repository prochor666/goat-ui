import { reactive } from 'vue';

let options = reactive({
    page: 1,
    perPage: 10,
    total: 1,
    items: [],
    result: [],
    to: '/',
});

export const usePaginator = function () {

    const pageize = function (page) {
        options.page = page;
        if (options.items.length > options.perPage) {
            options.result = options.items.slice((options.page - 1) * options.perPage, ((options.page - 1) * options.perPage) + options.perPage);
        } else {
            options.result = options.items;
        }
        return options.result;
    };


    const emulateItems = function (total) {
        let items = [];
        for (let i = 0; i <= total * options.perPage; i++) {
            items[i] = `x${i}`;
        }
        return items;
    };


    const pageizeExt = function (page) {
        options.page = page;
        options.items = emulateItems(options.total);
        if (options.items.length > options.perPage) {
            options.result = options.items.slice((options.page - 1) * options.perPage, ((options.page - 1) * options.perPage) + options.perPage);
        } else {
            options.result = options.items;
        }
        return options.result;
    };


    return {
        options,
        pageize,
        pageizeExt,
    };
};

export default usePaginator;