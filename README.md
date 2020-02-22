# ING-Invoicing

## Summary

We need a quick prototype of an intuitive, good-looking **hybrid** app for our invoicing system. I don't expect it to be fully functional, but the more complete the better, so that we can understand if we're going in the right direction. Build off the basic node js app we created that provides a simple JSON API and a way to host your assets. Documentation for the API can be found [HERE](https://ing-invoicing.herokuapp.com/explorer)


## Deliverables

- The default page should be auth-page with two subpages: "Login" and "Register". These pages should allow user to login or register new user according to the `ing-user` model described in the api explorer
- A user cannot access any other pages but the auth page being unauthorized
- The main page - "Invoices" should have a side-menu with the following items:
    - Add customer
    - Add product
    - *delimiter*
    - Logout
- The main page should be a list of existing invoices. This page should have a button for creating a new invoice.
- The "Create Invoice" page described below:
    - The invoice form should support selecting an existing Customer
    - The invoice form should make it easy to browse and add existing Products (you should be able to add any number of products)
    - When a Product is added there should be a way to edit the quantity
    - There should be a place to enter a discount for the invoice (a percentage discount)
    - At the top of the page, you should show a dynamically calculated invoice total. This total should take into account the quantity and price of each product and the invoice discount
    - The following page can be runned in two modes: creation and edit
    - As changes are made on the invoice form they should be automatically saved through the API (don't require the use of a Save button)
- The "Add customer" and "Add product" pages contain forms with fields according to the API schema
- When a user logs out, the app should show auth page

## Submitting your project

- Create a new branch named `dev/{your-id}`
- Commit all changes
- Push to the repository
