const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            likes: 30,
            _id: '602d6b44a424c62c13bdea17',
            title: 'Title',
            author: 'Author',
            url: 'url',
            '__v': 0
        }
    ]
    const listWithManyBlogs = [
        {
            likes: 10,
            _id: '602d6b44a424c62c13bdea17',
            title: 'Title',
            author: 'Author',
            url: 'url',
            __v: 0
        },
        {
            likes: 20,
            _id: '602e0ce5e5006e0679d58e5b',
            title: 'Title2',
            author: 'Author2',
            url: 'url2',
            __v: 0
        },
        {
            likes: 30,
            _id: '602e1a288fd1290989c3f2fa',
            title: 'Title3',
            author: 'Author3',
            url: 'url3',
            __v: 0
        },
        {
            likes: 40,
            _id: '602e1b3f2e7c0609c395d1e2',
            title: 'Title4',
            author: 'Author4',
            url: 'url4',
            __v: 0
        }
    ]

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(listWithOneBlog[0].likes)
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(listWithManyBlogs)).toBe(10+20+30+40)
    })
})