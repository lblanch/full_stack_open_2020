const listHelper = require('../utils/list_helper')
const helper = require('./test_blogs_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('of a list with one element equals the likes of that element', () => {
        expect(listHelper.totalLikes([helper.initialBlogs[0]])).toBe(helper.initialBlogs[0].likes)
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(helper.initialBlogs)).toBe(7+5+12+10+2)
    })
})

describe('favorite blog', () => {
    test('of an empty list is undefined', () => {
        expect(listHelper.favoriteBlog([])).toBeUndefined()
    })

    test('of a list with one element is the likes of that element', () => {
        const fav = {
            title: helper.initialBlogs[0].title,
            author: helper.initialBlogs[0].author,
            likes: helper.initialBlogs[0].likes,
        }

        expect(listHelper.favoriteBlog([helper.initialBlogs[0]])).toEqual(fav)
    })

    test('of a bigger list is determined right', () => {
        const fav = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        }
        expect(listHelper.favoriteBlog(helper.initialBlogs)).toEqual(fav)
    })
})

describe('most blogs', () => {
    test('of an empty list is undefined', () => {
        expect(listHelper.mostBlogs([])).toBeUndefined()
    })

    test('of a list with one element is the author of that element with one blog', () => {
        const most = {
            author: helper.initialBlogs[0].author,
            blogs: 1
        }
        expect(listHelper.mostBlogs([helper.initialBlogs[0]])).toEqual(most)
    })

    test('of a bigger list is determined right', () => {
        const most = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        expect(listHelper.mostBlogs(helper.initialBlogs)).toEqual(most)
    })
})

describe('most likes', () => {
    test('of an empty list is undefined', () => {
        expect(listHelper.mostLikes([])).toBeUndefined()
    })

    test('of a list with one element is the author of that element with its likes', () => {
        const most = {
            author: helper.initialBlogs[0].author,
            likes: helper.initialBlogs[0].likes
        }
        expect(listHelper.mostLikes([helper.initialBlogs[0]])).toEqual(most)
    })

    test('of a bigger list is determined right', () => {
        const most = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        expect(listHelper.mostLikes(helper.initialBlogs)).toEqual(most)
    })
})