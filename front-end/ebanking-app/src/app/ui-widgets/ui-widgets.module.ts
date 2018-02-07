import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '@app/core/accounts/account.service';
import { AuthGuard } from '@app/core/auth.guard';
import { AuthService } from '@app/core/common/auth.service';
import { ModalService } from '@app/ui-widgets/modal/modal.service';
import { TabsComponent } from '@app/ui-widgets/tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
    imports: [ CommonModule,
        ReactiveFormsModule ],
    declarations: [ TabsComponent, TabComponent, ModalComponent ],
    entryComponents: [ ModalComponent ],
    exports: [ TabsComponent, TabComponent, ModalComponent ]
})
export class UiWidgetsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UiWidgetsModule,
            providers: [ ModalService ]
        };
    }
}
