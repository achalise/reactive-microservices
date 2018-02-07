import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '@app/ui-widgets/modal/modal.component';

@Injectable()
export class ModalService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    openModal(content: any, viewContainerRef: ViewContainerRef) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
        const componentRef = viewContainerRef.createComponent(componentFactory);
        console.log(componentRef);
    }
}
