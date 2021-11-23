import { NgModule } from '@angular/core';

import { DetailComponent } from './detail.component';
import { DetailViewComponent } from './view/detail-view.component';

@NgModule({
    imports: [],
    exports: [DetailComponent],
    declarations: [DetailComponent, DetailViewComponent],
})
export class DetailModule { }
