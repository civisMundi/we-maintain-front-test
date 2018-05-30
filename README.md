[![Build Status](https://travis-ci.org/civisMundi/we-maintain-front-test.svg?branch=master)](https://travis-ci.org/civisMundi/we-maintain-front-test)


# A basic chat implementation
Based on the specs described here https://gist.github.com/Esya/24c12b9cfc2e86299ae357ccdbae31ac

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Specs met
- The chat should have the following features :
- One single public channel with every logged-in user displayed on the side
- The main content area should display 25 messages, and should load more if the users scrolls all the way to the top (Like Slack, Hipchat, etc.)
- The user should be able to send messages using an input field below the main content area.

## Requirements
- Node carbon (8.x)

## Run this project
- clone this repo
- `npm i`
- `npm start`
- Navigate to `http://localhost:4200/`

## Optionnals
- travis CI requiring: 
    - tests pass
    - lint pass

## Missing (unexhaustive list)
- codecov included in CI
- snyk included in CI
- tests on providers (yeah the only two ones)
- a better code seperation in the providers
- test helpers (with mocked state data)
