import axios from "axios";

const getDefaultState = () => {
    return {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        isLoggedIn: null,
    }
};

export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState());
        },
        updateId(state, payload) {
            state.id = payload
        },
        updateFirstName(state, payload) {
            state.firstName = payload
        },
        updateLastName(state, payload) {
            state.lastName = payload
        },
        updateEmail(state, payload) {
            state.email = payload
        },
        updateIsLoggedIn(state, payload) {
            state.isLoggedIn = payload
        },
    },
    actions: {
        async fetchUser({commit}) {
             await axios.get('api/user')
                .then(response => {
                    commit('updateId', response.data.data.id);
                    commit('updateFirstName', response.data.data.firstname);
                    commit('updateLastName', response.data.data.lastname);
                    commit('updateEmail', response.data.data.email);
                    commit('updateIsLoggedIn', true);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        async logout({commit}){
            await axios.post('api/logout')
                .then(() => {
                    commit('resetState');
                    localStorage.removeItem('netflix-clone');
                    commit('updateIsLoggedIn', false);
                })
                .catch(error => {
                    console.log(error);
                })
        },
    },
    getters: {
        getUserId: state => state.id,

        getFirstName: state => state.firstName,

        getLastName: state => state.lastName,

        getEmail: state => state.email,

        getIsLoggedIn: state => state.isLoggedIn
    }
}
