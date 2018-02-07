import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'eb-tab',
    templateUrl: './tab.component.html',
    styleUrls: [ './tab.component.scss' ]
})
export class TabComponent implements OnInit {

    constructor() {
    }

    @Input('title') title: string;
    @Input('active') active: boolean;

    ngOnInit() {
    }

}
