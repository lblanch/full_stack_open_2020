describe('Blog app', function() {
    const baseUrl = 'http://localhost:3000'
    beforeEach(function() {
        cy.request('POST', `${baseUrl}/api/testing/reset`)
        cy.visit(baseUrl)
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
        cy.get('form').should('be.visible')
    })
})