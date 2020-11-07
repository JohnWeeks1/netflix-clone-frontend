import store from '@/store'

export default function (to, from, next) {
    if ((store.getters['user/getIsLoggedIn'] && store.getters['user/getIsSubscribed'])) {
        next({ name: 'MovieLibrary' });
    }
    next();
}
