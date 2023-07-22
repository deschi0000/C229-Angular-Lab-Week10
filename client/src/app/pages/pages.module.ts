import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { ServicesComponent } from "./services/services.component";
import { FormsModule } from "@angular/forms";

import { PartialsModule } from "../partials/partials.module";   // The fix from the previous video!! -> see below


@NgModule({
    imports: [BrowserModule, FormsModule, PartialsModule],
    declarations: [
        AboutComponent, 
        ContactComponent, 
        HomeComponent,
        ProductsComponent,
        ServicesComponent 
    ],
    exports: [
        AboutComponent, 
        ContactComponent, 
        HomeComponent,
        ProductsComponent,
        ServicesComponent,
        PartialsModule // The next change is to export them here, but don't need to import in app.module.ts, they are part of this module
    ]
})

export class PagesModule {}



//==================================================================================================
// Based on the provided code and project structure, it seems that you have declared the
// BasePageComponent in the PartialsModule. However, you are trying to use it in the 
// components that are declared in the PagesModule. Since these modules are separate, 
// Angular does not recognize the BasePageComponent in the PagesModule.
// To resolve this issue, you need to make sure that the PartialsModule is imported into the 
// PagesModule. This way, Angular will have access to the BasePageComponent.

// With this modification, the PagesModule will have access to the BasePageComponent 
// declared in the PartialsModule, and the errors related to 'app-base-page' is not 
// a known element should be resolved.
//==================================================================================================