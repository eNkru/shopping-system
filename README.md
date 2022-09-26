# Shopping System
A shopping system

## Technical Stack
* Node
* Typescript
* Jest
* eslint
* Yarn

## Environment
The `CheckoutService` can be tested in Unit test.
Run following command to preform the tests
```
yarn
yarn test
```

## Design Pattern
* OOP
* Singleton
* Factory
* Builder
* IoC
* TDD

## Database Design
![ERD](https://raw.githubusercontent.com/eNkru/shopping-system/main/assets/Database%20ER%20diagram.png)

## Class Design
![Class Diagram](https://raw.githubusercontent.com/eNkru/shopping-system/main/assets/Class%20diagram.png)

## Improvement
1. Only key logics are tested. Not write unit testing for models and helpers.
2. Didn't use any framework, so the service injection is manually done in constructor.
3. Only had a design for database layer, no actual implementation.
4. Promotions are manually loaded in `StrategyService`, not configurable so far.