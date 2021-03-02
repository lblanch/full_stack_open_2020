describe('Blog app', function() {
    const rootUser = {
        username: 'root',
        name: 'Mr Root McRooter',
        password: '123456'
    }

    beforeEach(function() {
        cy.request('POST', '/api/testing/reset')
        cy.insertUser(rootUser)
        cy.visit('/')
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
        cy.get('form').should('be.visible')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('input[name="Username"]').type(rootUser.username)
            cy.get('input[name="Password"]').type(rootUser.password)
            cy.get('button').contains('login').click()

            cy.get('.info').should('has.css', 'color', 'rgb(0, 128, 0)')
            cy.get('form').should('not.be.visible')
            cy.contains(`${rootUser.name} is logged in`)
            cy.get('button').contains('logout')
        })

        it('fails with wrong credentials', function() {
            cy.get('input[name="Username"]').type(rootUser.username)
            cy.get('input[name="Password"]').type('wrongpassword')
            cy.get('button').contains('login').click()

            cy.get('.error').should('has.css', 'color', 'rgb(255, 0, 0)')
            cy.get('.error').contains('Error: invalid username or password')
            cy.get('form').should('be.visible')
        })
    })

    describe('When logged in', function() {
        const newBlogs = [
            {
                title: "Title for a new test blog",
                author: "Cypress McTest",
                url: "www.cypress.wordpress.com",
                likes: 5
            },
            {
                title: "Another blog about testing tests",
                author: "Test Cypress",
                url: "www.myblog.com/mypost",
                likes: 22
            },
            {
                title: "Title for a new test blog: part 2",
                author: "Cypress McTest",
                url: "www.cypress.wordpress.com/part2",
                likes: 0
            },
            {
                title: "Teh comeback blog, attention!",
                author: "Test Cypress",
                url: "www.myblog.com/myotherpost",
                likes: 12
            }
        ]

        beforeEach(function() {
            cy.loginUser(rootUser.username, rootUser.password)
        })

        it('A blog can be created', function() {
            cy.get('form').should('not.be.visible')

            cy.get('button').contains('new note').click()
            
            cy.get('form').should('be.visible')
            
            cy.get('input[aria-label="Title"]').type(newBlogs[0].title)
            cy.get('input[aria-label="Author"]').type(newBlogs[0].author)
            cy.get('input[aria-label="URL"]').type(newBlogs[0].url)
            cy.get('button').contains('create').click()

            cy.get('form').should('not.be.visible')

            cy.get('.blog').contains(`"${newBlogs[0].title}" by ${newBlogs[0].author}`)
        })

        describe('Several blogs have been created', function() {
            beforeEach(function() {
                for (let blog of newBlogs) {
                    cy.createBlog(blog)
                }
            })

            it('A logged in user can like a blog', function() {
                cy.get('.blog')
                    .contains(`"${newBlogs[1].title}" by ${newBlogs[1].author}`)
                    .as('myBlog')
                    .contains('view')
                    .click()
                cy.get('@myBlog').contains('like').click()
                cy.get('@myBlog').contains(`likes ${newBlogs[1].likes + 1}`)
            })

            it('A logged in user can delete their own blog', function() {
                cy.get('.blog')
                    .contains(`"${newBlogs[1].title}" by ${newBlogs[1].author}`)
                    .as('myBlog')
                    .contains('view')
                    .click()
                cy.get('@myBlog').contains('remove').click()
                cy.get('@myBlog').should('not.exist')
            })

            it('A logged in user cannot delete other user\'s blogs', function() {
                const alternativeUser = {
                    username: 'another',
                    name: 'Another User',
                    password: '654321'
                }
                cy.insertUser(alternativeUser)
                cy.loginUser(alternativeUser.username, alternativeUser.password)

                cy.get('button').contains('remove').should('not.exist')
            })

            it('Blogs are ordered accoding their amount of likes', function() {
                cy.get('.blog').should(($blogArray) => {
                    const sortedNewBlogs = newBlogs.sort((a, b) => Number(b.likes) > Number(a.likes)).map(b => `"${b.title}" by ${b.author}`)
                    const blogsText = $blogArray.toArray().map(el => el.innerText.substr(0, el.innerText.length - 5))
                    expect(blogsText).to.deep.eq(sortedNewBlogs)
                })
            })
        })
    })
})