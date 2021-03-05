import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { SessionService } from "../service/session.service";

@Injectable()
export class NotLoggedInGuard implements CanActivate {
	constructor(
		protected router: Router,
		protected sessService: SessionService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		if (this.sessService.isLoggedIn()) {
			this.router.navigate(['/']);
			return false;
		}
		return true;
	}
}