import store from '@/store'

export default function (to, from, next) {
    console.log(store.getters['user/getIsSubscribed']);
    if ((store.getters['user/getIsLoggedIn'] === true) && (store.getters['user/getIsSubscribed'] === true)) {
        next({ name: 'MovieLibrary' });
    }
    next();
}
