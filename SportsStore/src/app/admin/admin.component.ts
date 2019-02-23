import { Component } from '@angular/core';
import { AuthService } from 'app/model/auth.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'admin.component.html'
})
export class AdminComponent {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    public logout(): void {
        this.auth.clear();
        this.router.navigateByUrl('/');
    }
}