import Vuex from 'vuex';
import Vue from 'vue';
import { sp } from '@pnp/sp';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        main: {},
        hardware: {},
        oracle: {},
        projectDetails: {},
        summary: {},
        access: [],
        page: 1,
        maxPage: 1,
        submitting: false,
        submitted: false,
        cost: "0",
        userInformation: {}
    },
    mutations: {
        mainForm(state, values) {
            state.main = values;
        },
        navigate(state, page) {
            state.page = page;
            if(page > state.maxPage) state.maxPage = page; 
            router.push(`/${page}`);
        },
        formSubmitting(state) {
            window.scrollTo (0,0);
            state.submitting = true;
        },
        formSubmitFailed(state) {
            console.log(state);
            var requestJSON = JSON.stringify(state);
            sp.web.lists.getByTitle("FailedSubmissions").items.add({
                Title: "Failed submission",
                FormJSON: requestJSON
            }).then(i => {
                state.submitting = false;
                state.submitted = false;
                alert("Your submission failed, the data you entered has been saved and a ticket has been raised for this error. You will receive an email with a ticket number soon.");
                window.location.href='http://myservicedesk/portal.php';
            }).catch(e => {
                console.log(e);
            });
        },
        formSubmitted(state) {
            state.submitted = true;
            state.submitting = false;
        },
        setCost(state, cost) {
            state.cost = cost;
        }
    },
    actions: {
        submitForm({ commit, state }) {
            commit('formSubmitting');
            const main: any = state.main;
            sp.web.lists.getByTitle("NewStarterSubmissions").items.add({
                // main page
                NSSFirstName: main.firstName.trim(),
                NSSSurname: main.surname.trim(),
            }).then(i => {
                commit('formSubmitted');
            }).catch(e => {
                commit('formSubmitFailed'); 
            });
        }
    }
});