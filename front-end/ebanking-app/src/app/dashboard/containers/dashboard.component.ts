import {
    AfterViewInit,
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { Account } from '@app/core/accounts/account';
import * as fromAccounts from '@app/dashboard/store';
import { AppCurrentStateAccountSelectedAction } from '@app/store';
import { ModalComponent } from '@app/ui-widgets/modal/modal.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RequestAccounts } from '../store';

@Component({
    selector: 'eb-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
    accounts$: Observable<Account[]>;

    @ViewChild('editAccount', { read: ViewContainerRef }) editAccount;
    componentRef: ComponentRef<ModalComponent>;

    @ViewChild('msg') private msgRef: TemplateRef<any>;

    constructor(private store: Store<fromAccounts.State>, private cfResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.store.dispatch(new RequestAccounts());
        this.accounts$ = this.store.select(fromAccounts.getAccounts);
    }

    ngAfterViewInit(): void {
        console.log(`The edit template `);
        console.log(this.editAccount);
    }

    openAccountDetails(account: Account) {
        console.log(`Opening account details`);
        this.store.dispatch(new AppCurrentStateAccountSelectedAction(account));
    }

    // TODO implemet dynamic component
    openAccountDetailsModal(account: Account) {
        this.editAccount.clear();
        console.log('Opening details for account ', account);
        const factory: ComponentFactory<ModalComponent> = this.cfResolver.resolveComponentFactory(ModalComponent);
        this.componentRef = this.editAccount.createComponent(factory);
        this.componentRef.instance.someText = account.accountName;
        this.editAccount.createEmbeddedView(this.msgRef, account);
    }

    clickedClose() {
        console.log('Clicked close ');
    }

    private openModal(content: any, options: any) {
        const factory: ComponentFactory<ModalComponent> = this.cfResolver.resolveComponentFactory(ModalComponent);
        const containerSelector = options && options.container || 'body';
        const containerEl = document.querySelector(containerSelector);

    }

}

