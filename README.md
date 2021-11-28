# Ida

Ida is a collection of mini games meant for kids. The games are meant to be slightly challenging, but also fun and quick. There are 26 games representing the 26 letters of the alphabet. Ida is the name of the app/game, but also the name of the main character, who is a smart monkey held captive by an evil scientist. The object of the game is to free Ida the monkey from the evil scientist by completing the 26 mini games and releasing the 26 corresponding locks on Ida's cage.

# Development setup

0. (Optional but recommended) Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) and then run `nvm use` from the project root to install a compatible version of node.
1. (Optional but recommended) Install the [prettier eslint VS Code extension](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint) and set as default formatter following the instructions [here](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint).
2. Install JavaScript dependencies using `yarn`. Note that after completing steps 0-2, you might need to restart VS Code for the prettier eslint extension to work properly.
3. Use `yarn dev` to run the local development server, `yarn test` to run tests, and `yarn lint` to run the linter. You can also run `yarn build` to check that the production build completes successfully.

The production app is built automatically on merge to `main`. All feature work should be done in branches off of `main`, reviewed and approved, and then merged into `main` for release.