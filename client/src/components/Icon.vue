<template>
    <inline-svg
        :src="svg"
        class="icon"
        :class="`icon__${name}`"
    />
</template>

<script>
import InlineSvg from 'vue-inline-svg';

export default {
    name: 'Icon',
    props: {
        name: {
            type: String,
            required: true,
        }
    },
    components: {
        InlineSvg,
    },
    computed: {
        svg() {
            // eslint-disable-next-line
            return require(`@/assets/icons/${this.name}.svg`);
        },
    },
};
</script>