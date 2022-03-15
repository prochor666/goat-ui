<template>

    <h1
        class="
            mt-2
            text-xl
            font-bold
            leading-7
            sm:text-2xl
            sm:truncate
        "
    >
        <span class="bg-clip-text text-transparent bg-gradient-to-tr from-sky-300 to-sky-600">
            {{ title }}
        </span>
    </h1>

</template>

<script>

export default {

    props: {
        title: {
            type: String,
            default: ''
        }
    },

    setup(props) {

        const title = props.title;

        return {
            title,
        }
    },
};
</script>
