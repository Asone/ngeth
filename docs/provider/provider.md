# Provider
## Initialization

#### Set up a provider

In AppModule
```sh typescript
import { AppComponent } from './app.component';
import { ProviderModule } from '@ngeth/provider';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		ProviderModule.init('/* address of the node */'),
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule { }
```
The `init` accepts an url, that can have a ws protocol or not. If web3 is present in your browser, the provider will use it to connect to its node, else it will use the given url.