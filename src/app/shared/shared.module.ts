import { NgModule } from "@angular/core";
import { MaterialModule } from "@shared-modules/material.module";
@NgModule({
    imports: [
        MaterialModule
    ],
    exports: [
        MaterialModule
    ],
    providers: []
})
export class SharedModule { } 