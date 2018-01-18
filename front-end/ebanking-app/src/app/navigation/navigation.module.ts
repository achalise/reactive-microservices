import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppNavbarComponent } from "./app-navbar/app-navbar.component";
import { NavSearchComponent } from "./app-navbar/nav-search/nav-search.component";
import { HomeLayoutComponent } from "./home-layout/home-layout.component";
import { LoginLayoutComponent } from "./login-layout/login-layout.component";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, RouterModule.forChild([]), ReactiveFormsModule, FormsModule],
    declarations: [AppNavbarComponent, NavSearchComponent, HomeLayoutComponent, LoginLayoutComponent, LoginComponent]
})
export class NavigationModule {
}