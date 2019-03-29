import Vue from 'vue';
import { validationMixin } from 'vuelidate';

const now = new Date();

export default Vue.extend({
    name: 'main-form',
    data: () => ({
        formData: {
            firstName: "",
            surname: ""
        }
    }),
    computed: {
    },
    watch: {
    },
    methods: {
    },
    created() {
    },
    components: {
    },
    mixins: [
        validationMixin
    ]
});