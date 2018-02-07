import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '@app/ui-widgets/tab/tab.component';

@Component({
    selector: 'eb-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: [ './tabs.component.scss' ]
})
export class TabsComponent implements AfterContentInit {

    constructor() {
    }

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    ngAfterContentInit(): void {
        console.log(`The tabs ${this.tabs}`);
    }

    select(tab: TabComponent) {
        tab.active = true;
        this.tabs.filter(t => t !== tab).forEach(t => t.active = false);
    }
}
