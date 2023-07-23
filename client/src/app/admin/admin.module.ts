import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { AdminComponent } from "./admin.component";

const routing = RouterModule.forChild([
    {path: 'auth', component: AuthComponent},
    {path: 'main', component: AdminComponent, canActivate: [AuthGuard],
        // children: [
        //     { path: '**', redirectTo: 'book-list' }]
    },
    {path: '**', redirectTo: 'auth'},
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing],
    providers: [AuthGuard],
    declarations: [AuthComponent, AdminComponent]
})
export class AdminModule {}