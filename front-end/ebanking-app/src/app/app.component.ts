import { Component, OnDestroy, OnInit } from '@angular/core';
import { CSSLoadedAction } from '@app/store/actions/config.actions';
import * as fromRoot from '@app/store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'eb-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
    private configDataSubscription: Subscription;

    constructor(private store: Store<fromRoot.State>) {
        console.log(`Main app component initialised`);
    }

    ngOnInit(): void {
        const configData$ = this.store.select('configDataState')
            .filter(d => d.configStatus === 'LOADED' && !d.cssLoaded)
            .map(t => t.configData);
        // TODO This is never needed as we get the brand name from url, just here temporarily as an alternative approach
        this.configDataSubscription = configData$.subscribe(d => this.addStyleSheetForTheBrand(d.brand));
    }

    ngOnDestroy(): void {
        this.configDataSubscription.unsubscribe();
    }

    private addStyleSheetForTheBrand(brand: string) {
        console.log(`Inserted style link ..`);
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.type = 'text/css';
        link.href = `/assets/${brand}.css`;
        document.head.appendChild(link);
        // perhaps send the CSS loaded action here??
        link.onload = (evt) => {
            console.log(`loaded the css`, evt);
            this.store.dispatch(new CSSLoadedAction());
        };
    }
}
