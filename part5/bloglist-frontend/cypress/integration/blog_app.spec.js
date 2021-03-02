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
        const newBlog = {
            title: "Title for a new test blog",
            author: "Cypress McTest",
            url: "www.cypress.wordpress.com"
        }

        beforeEach(function() {
            cy.loginUser(rootUser.username, rootUser.password)
        })

        it('A blog can be created', function() {
            cy.get('form').should('not.be.visible')

            cy.get('button').contains('new note').click()
            
            cy.get('form').should('be.visible')
            
            cy.get('input[aria-label="Title"]').type(newBlog.title)
            cy.get('input[aria-label="Author"]').type(newBlog.author)
            cy.get('input[aria-label="URL"]').type(newBlog.url)
            cy.get('button').contains('create').click()

            cy.get('form').should('not.be.visible')

            cy.get('.blog').contains(`"${newBlog.title}" by ${newBlog.author}`)
        })
    })
})