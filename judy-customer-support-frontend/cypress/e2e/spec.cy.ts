describe('Basic UI Tests', () => {
  it('Visits the main page', () => {
    cy.visit('/')
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })

  // !! Todo: Replace with valid credentials for a user !!
  const userName = "jeffrey63";
  const password = "1MFz2Iwa&n";

  it('Fails to login on invalid credentials', () => {
    cy.visit('/login')

    // Set the username and password
    cy.get('#username').type('invalidUser');
    cy.get('#password').type('wrongPassword');

    // Click on the login button
    cy.get('#loginBtn').click();

    // Check for "Invalid credentials" message
    cy.contains('Invalid Credentials').should('be.visible');
  })

  it('Logs In successfully with valid credentials', () => {
    cy.visit('/login')

     // Set the username and password
    cy.get('#username').type(userName);
    cy.get('#password').type(password);

    // Click on the login button
    cy.get('#loginBtn').click();

    // Check for "Invalid credentials" message
    cy.contains('Create New Ticket').should('be.visible');
    cy.contains('Logout').should('be.visible');
  })

  it('Logs out after a successful login', () => {
    cy.visit('/login')

     // Set the username and password
    cy.get('#username').type(userName);
    cy.get('#password').type(password);

    // Click on the login button
    cy.get('#loginBtn').click();

    cy.get('#logoutBtn').click();

    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })

  it('Should successfully add a ticket', () => {
    cy.visit('/login')

     // Set the username and password
    cy.get('#username').type(userName);
    cy.get('#password').type(password);

    // Click on the login button
    cy.get('#loginBtn').click();

    cy.get('#createNewTicketBtn').click();

    cy.contains('Add A New Ticket')
    cy.contains('Confirm')
    cy.contains('Cancel')

    // Set the username and password
    cy.get('#title').type('Test Title');
    cy.get('#description').type('Test Description');

    cy.get('#confirmBtn').click();

    cy.contains('Test Title')
    cy.contains('Test Description')
  })
})

