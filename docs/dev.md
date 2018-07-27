## Cloning the repo

After cloning this project, you need to do some extras steps in order to use/dev it.

First, in `package.json`, you need to remove **temporarily** the @ngeth modules from the dependencies :
```
"dependencies": {
    ...
    //all these lines should be removed
    "@ngeth/contract": "./@ngeth/contract",
    "@ngeth/provider": "./@ngeth/provider",
    "@ngeth/utils": "./@ngeth/utils",
    "@ngeth/auth": "./@ngeth/auth",
    ...
```
Then you can install the node_modules by running `npm install` or `yarn add`. Now, you can **add these lines again**.

Now you can use `@ngeth/utils`, but you need to [build the libraries](#build-the-libraries) to use the others.

## Build the libraries
There is a specific order in the build libraries :

utils → provider → auth → contract

For each of them, run `yarn build:libs:<lib-name>`, where `<lib-name>` is the lib you are building. A @ngeth folder should appear at the root of your project. Put this folder in your node_modules folder, and repeat.