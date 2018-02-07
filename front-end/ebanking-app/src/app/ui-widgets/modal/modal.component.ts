import {
    AfterContentInit, Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, TemplateRef, ViewChild,
    ViewContainerRef
} from '@angular/core';

@Component({
    selector: 'eb-modal',
    templateUrl: './modal.component.html',
    styleUrls: [ './modal.component.scss' ]
})
export class ModalComponent implements OnInit, AfterContentInit, OnDestroy {

    modals: ModalComponent[] = [];
    @ViewChild('container', { read: ViewContainerRef }) modalContentPlaceHolder;

    someText: string;
    displayModal = true;

    @Input() contentTemplate: TemplateRef<any>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
    }

    ngAfterContentInit(): void {
    }

    ngOnDestroy() {
        console.log('Destroyed ..');
    }

    public close() {
        this.displayModal = false;
    }

}
