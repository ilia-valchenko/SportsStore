import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestDataSource } from './rest.datasource';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    constructor(private datasource: RestDataSource) {}

    public authenticate(username: string, password: string): Observable<boolean> {
        return this.datasource.authenticate(username, password);
    }

    // Readonly property.
    get authenticated(): boolean {
        return this.datasource.auth_token != null;
    }

    clear() {
        this.datasource.auth_token = null;
    }
}