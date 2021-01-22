export default {
    getTop250: {
        method: 'GET',
        url: '/account/?count=30&format=json',
        name: '获取top250电影列表'
    },
}