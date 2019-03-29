import Vue from 'vue';
import MainForm from './MainForm/MainForm.vue';

export default Vue.extend({
    name: 'app',
    computed: {
        page(): number {
            return this.$store.state.page;
        },
        maxPage(): number {
            return this.$store.state.maxPage;
        },
        percentCompleted(): number {
            if(this.$store.state.submitted || this.$store.state.submitting)
                return 100;
            
            return ((this.page > this.maxPage ? this.page : this.maxPage ) - 1) / 5 * 100;
        },
        submitted() {
            return this.$store.state.submitted;
        },
        submitting() {
            return this.$store.state.submitting;
        }
    },
    methods: {
        navigate (page: number) {
            if(page <= this.page)
                this.$store.commit('navigate', page);
        },
    },
    components: {
        MainForm
    }
});