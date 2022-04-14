describe('Bloglist app', function() {
  beforeEach( function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Luke Duncan',
      username: 'lkngtn',
      password: 'thisisjustatest'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')

  })
  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('login succeeds with correct credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('lkngtn')
    cy.get('#password').type('thisisjustatest')
    cy.get('#login-button').click()
    cy.contains('logged-in')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'Wrong Credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('html').should('not.contain', 'logged-in')
  })

  it('blogs are ordered by likes', function() {
    cy.login({ username: 'lkngtn', password: 'thisisjustatest' })
    cy.addBlog({ title: 'first added', author: 'author', url: 'www.url.com' })
    cy.addBlog({ title: 'second added', author: 'author', url: 'www.url.com' })
    cy.contains('second added').contains('show').click()
    cy.contains('like').click()
    cy.get('html').find('.blogEntry').first().should('contain', 'second added')
  })

  describe('when logged in', function() {
    beforeEach( function() {
      cy.login({ username: 'lkngtn', password: 'thisisjustatest' })
    })

    it('can add a blog', function() {
      cy.contains('add blog').click()
      cy.get('#add-blog-title').type('this is a test')
      cy.get('#add-blog-author').type('bob ross')
      cy.get('#add-blog-url').type('www.example.com')
      cy.get('#add-blog-submit-button').click()
      cy.contains('this is a test')
    })

    it('can like a blog', function() {
      cy.addBlog({ title: 'title', author: 'author', url: 'www.url.com' })
      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('can delete one of their own blogs', function() {
      cy.addBlog({ title: 'title', author: 'author', url: 'www.url.com' })
      cy.contains('delete').click()
      cy.get('html').should('contain', 'Successfully deleted: \'title\'')
    })

    it('cannot delete other users blogs', function() {
      cy.addBlog({ title: 'title', author: 'author', url: 'www.url.com' })
      const user = {
        name: 'Sam Smith',
        username: 'sammy',
        password: 'thisisjustatest'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.login({ username: 'sammy', password: 'thisisjustatest' })
      cy.get('html').should('contain', 'title')
        .and('not.contain', 'delete')
    })
  })
})