# Amazon Clone

A front-end clone of Amazon's shopping flow, built while learning modern JavaScript: browse products, manage a cart, pick delivery options, place orders and track them.

## Features

- Product grid rendered from data
- Cart with quantity updates, persisted in localStorage
- Checkout with delivery options, and live order and payment summaries
- Orders and order-tracking pages
- Unit tests for money formatting and the checkout order summary

## What I practiced

- ES modules and organizing code into data, scripts and utilities
- Object-oriented JavaScript (the cart written as both modules and classes)
- Fetching data from a backend and working with dates
- Automated testing with Jasmine

## Tech stack

HTML, CSS, JavaScript (ES modules), Jasmine

## Run it

```bash
git clone https://github.com/aseel332/amazon-clone.git
cd amazon-clone
npx serve .
```

Open `amazon.html`. To run the tests, open `test-jasmine/tests.html` in the browser.
