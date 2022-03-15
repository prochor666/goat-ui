<template>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
    components: {
    },
    setup() {

        const route = useRoute();
        const router = useRouter();

        const logout = async () => {

            const apiUrl = localStorage.getItem('apiUrl') || '';
            const session_id = localStorage.getItem('session_id');

            if (typeof session_id === 'string') {

                const res = await axios.delete(
                    `${apiUrl}/api/login`, {
                    headers: {
                        Authorization: session_id,
                        'Content-Type': 'application/json'
                    },
                });

                const auth = await res.data;

                if (typeof (auth) === 'object' && auth.data.user && auth.data.user.id === 0) {

                    localStorage.removeItem('session_id');
                    router.push('/login');
                }
            }
        };

        logout();

        return {
        };
    },
};
</script>
