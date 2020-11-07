import store from '@/store'

export default function (to, from, next) {
    if ((store.getters['user/getIsLoggedIn'] === true) && (store.getters['user/getIsSubscribed'] === true)) {
        next({ name: 'MovieLibrary' });
    }
    next();
}
