import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AccountService } from './core/services/account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items: MenuItem[];

    constructor(public appMain: AppMainComponent, private accountService: AccountService,
        private router: Router) { }

    ngOnInit() {}

    logout() {
        this.accountService.removeToken();
        this.router.navigateByUrl('/login');

    }


}
