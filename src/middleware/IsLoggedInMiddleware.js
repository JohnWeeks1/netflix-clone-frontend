import store from '@/store'

export default function (to, from, next) {
    if (store.getters['user/getIsLoggedIn']) {
        next({ name: 'Account' });
    }
    next();
}
