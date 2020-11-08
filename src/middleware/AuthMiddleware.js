import store from '@/store'

export default function (to, from, next) {
    if(!store.getters['user/getIsSubscribed']) {
        next({ name: 'Payment' });
    }
    next();
}
