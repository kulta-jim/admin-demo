export default {
    list_account: {
        method: 'GET',
        url: '/account/?format=json',
        name: '获取账户列表'
    },
    get_token: {
        method: 'POST',
        url: '/token/',
        name: '获取token'
    }
}