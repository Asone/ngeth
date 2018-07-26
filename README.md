# @ngeth

> Angular librairies to build Decentralized Application (Dapp) on Ethereum.

  

![](./docs/img/ngeth-logo.png)

  

@ngeth enables superfast production of Dapp on Ethereum thanks to the Angular front-end framework.

@ngeth allow you to test and run your contract with an Angular oriented syntax, and supports the experimental ABIEncoderV2 of Solidity.

  

## [WARNING] alpha

@ngeth is under heavy development. You should expect breaking changes.

Please do not use @ngeth in production mode.

  

## Packages

  

*  [@ngeth/provider](./libs/provider) - The provider to connect to your node. HTTP and WebSocket are supported.

*  [@ngeth/utils](./libs/utils) - Utils to manipulate BigNumbers and Hex values.

*  [@ngeth/auth](./libs/auth) - An Authentication system to either store accounts on the node or on localStorage.
* [@ngeth/contract](./libs/contract) - The lib to build and manage contracts.

## Documentation

[Documentation](./docs)


## Examples

  

*  [example](./apps) - TODO.

  
  

## Usage Example

  

### Setup

  

Start a traditional Angular app with @angular/cli

```sh

ng new ngeth-dapp

cd ngeth-dapp

```

  

Then add the `provider` and `utils` packages.

```sh

npm install @ngeth/provider @ngeth/utils --save

```

  

### Add the EthModule

  

In the `app.module.ts` file

```sh typescript
import { AppComponent } from './app.component';
import { ProviderModule } from '@ngeth/provider';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		// Connect to an infura node
		ProviderModule.init('https://ropsten.infura.io'),
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule { }

```

  

### Get the current block

  
In the `app.component.ts` file

```sh
import { Component, OnInit } from '@angular/core';
import { Eth } from '@ngeth/provider';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	template: '<p>Current Block: {{ block$ | async }}</p>',
	styles: []
})

export class AppComponent implements OnInit {
	public block$: Observable<string>;
	
	constructor(private eth: Eth) {}
	
	ngOnInit() {
		this.block$ = this.eth.getBlockNumber();
	}
}

```

  

### See the block number

  

```sh

ng serve

```

With any browser (no need to use Mist or MetaMask if you provide a node in `ProviderModule`).

```sh

localhost:4200

```

  

## Meta

  
François Guezengar – francois.guezengar@b2expand.com
Quentin Vaudain - quentin.vaudain@b2expand.com
Gabrielle Huëbra - gabrielle.huebra@b2expand.com

  

Distributed under the MIT license. See ``LICENSE`` for more information.

  

[Github](https://github.com/GrandSchtroumpf)
