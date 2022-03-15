import { reactive } from 'vue';
import axios from 'axios';
import { notify } from 'notiwind';
import utils from '../composables/utils';

const dirList = reactive({
    status: false,
    dirs: [],
    files: [],
    filesTotal: 0,
    filesTotalSize: 0,
    statusBarPath: []
});
const saving = reactive({
    status: false,
    result: false,
});
const loading = reactive({
    status: false,
    text: 'Loading...',
});
const selection = reactive({
    files: [],
    dirs: [],
});
export const useFiles = function () {

    const createDir = async function (domains_id, path) {

        try {

            saving.status = true;

            const apiUrl = localStorage.getItem("apiUrl") || '';

            let modDir = {
                path: path.replace(/^\/+|\/+$/g, ''), // trim path slashes
                domains_id: parseInt(domains_id)
            };

            const result = await axios.post(`${apiUrl}/api/directory`, modDir, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });

            let state = await result.data;

            //console.log('Save result state', state);

            saving.status = false;
            saving.result = state;

            return state;

        } catch (e) {
            console.log(e);
            saving.status = false;
            return '';
        }
    };


    const deleteDir = async function (domains_id, path) {

        try {

            saving.status = true;

            const apiUrl = localStorage.getItem("apiUrl") || '';

            let modDir = {
                path: path.replace(/^\/+|\/+$/g, ''), // trim path slashes
                domains_id: parseInt(domains_id)
            };

            const result = await axios.delete(`${apiUrl}/api/directory/?path=${modDir.path}&domains_id=${modDir.domains_id}`, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });

            let state = await result.data;

            //console.log('Save result state', state);

            saving.status = false;
            saving.result = state;

            return state;

        } catch (e) {
            console.log(e);
            saving.status = false;
            return '';
        }
    };


    const bulkActionRequest = async function (action, domains_id, source, target = '') {

        try {

            saving.status = true;

            const apiUrl = localStorage.getItem("apiUrl") || '';

            let modDir = {
                dirs: source.dirs || [],
                files: source.files || [],
                target: target.replace(/^\/+|\/+$/g, ''), // trim path slashes
                action: action,
            };

            const result = await axios.put(`${apiUrl}/api/directory/${domains_id}`, modDir, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });

            let state = await result.data;

            console.log('Save result state', state);

            saving.status = false;
            saving.result = state;

            return state;

        } catch (e) {
            console.log(e);
            saving.status = false;
            return '';
        }
    };



    const bulkAction = function (action, domains_id, targetDir = '') {

        const selection = utils().keeper('filemanager');
        let allow = true;
        let parent = '';
        let messageRoot = targetDir.length === 0 ? 'root directory' : targetDir;

        for (let i in selection.dirs) {

            parent = getTargetParentDir(selection.dirs[i]);
            console.log(`${action} ${selection.dirs[i]} to the ${messageRoot}`);

            if (action === 'copy' && (targetDir === parent)) {

                allow = false;
                notify({
                    group: "error",
                    title: "Error",
                    text: `Can not ${action} ${selection.dirs[i]} to the ${messageRoot}`,
                }, 5000);

                console.log(`Conflict, can not ${action} ${selection.dirs[i]} to the ${messageRoot}`);
            }

            if (action === 'move' && (targetDir === parent || isSourceParentOfTarget(selection.dirs[i], targetDir))) {

                allow = false;
                notify({
                    group: "error",
                    title: "Error",
                    text: `Can not ${action} ${selection.dirs[i]} to the ${messageRoot}`,
                }, 5000);

                console.log(`Conflict, can not ${action} ${selection.dirs[i]} to the ${messageRoot}`);
            }
        }

        if (allow === true) {

            console.log('Bulk action allowed', selection, domains_id, targetDir, action);
            bulkActionRequest(action, domains_id, selection, targetDir);
        }
    };


    const getTargetParentDir = function (dir) {

        let arr = dir.split('/');
        arr.pop();
        return arr.join('/');
    }

    const isSourceParentOfTarget = function (source, target) {

        return target.startsWith(source);
    };

    const parsePath = function (domains_id, path) {

        let parsed = path.split('/');
        let _statusBarPath = [];
        let index = parsed.length;

        for (let i in parsed) {

            if (parsed[i].length > 0) {

                let working = JSON.parse(JSON.stringify(parsed));
                let del = index - (parseInt(i) + 1);
                working.splice(-(del), del);
                //console.log('Partial', del, parsed[i], working);

                _statusBarPath.push({
                    name: parsed[i],
                    params: {
                        id: domains_id,
                        path: working.join('|')
                    }
                });
            }
        }
        //console.log('Route obj', _statusBarPath);

        return _statusBarPath;
    };


    const requestDirData = async function (domains_id, path, check = false) {

        const apiUrl = localStorage.getItem("apiUrl") || '';
        const checkThumbs = check === true ? 1 : 0;

        const r = await axios.get(`${apiUrl}/api/directory/${domains_id}/?path=${path}&check=${checkThumbs}`, {
            headers: {
                Authorization: localStorage.getItem('session_id'),
                'Content-Type': 'application/json'
            }
        });

        let result = await r;

        if (result.data && result.data.data) {

            return result.data.data;
        }

        return {};
    }


    const list = async function (domains_id, path, check = false) {

        loading.status = true;

        let data = await requestDirData(domains_id, path, check);

        if (typeof data === 'object' && Object.keys(data).length > 0 && data.status) {

            //console.log('Loading', loading);
            dirList.status = data.status;
            dirList.dirs = data.dirs;
            dirList.files = data.files;

            dirList.filesTotal = dirList.files.length;
            dirList.filesTotalSize = 0;

            if (dirList.filesTotal > 0) {

                dirList.files.forEach((element) => {

                    dirList.filesTotalSize += element.info.size
                });
            }

            dirList.statusBarPath = parsePath(domains_id, path);

            loading.status = false;

            return dirList;
        }

        loading.status = false;

        return false;
    };


    return {
        saving,
        loading,
        selection,
        createDir,
        deleteDir,
        requestDirData,
        list,
        dirList,
        bulkAction,
    }
}

export default useFiles;
