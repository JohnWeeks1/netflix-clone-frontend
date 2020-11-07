import store from '@/store'

export default function (to, from, next) {
    if (store.getters['user/getIsSubscribed'] === 1) {
        next({ name: 'MovieLibrary' });
    }
    next();
}
