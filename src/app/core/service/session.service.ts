import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../model/user.model";
import { UserService } from "./user.service";

@Injectable({
	providedIn: "root"
})
export class SessionService {
	public lastIsLoggedInResponse: boolean = this.isLoggedIn();
	constructor(
		private userService: UserService,
	) { }

	public startSession(api_token: string): Observable<any> {
		localStorage.setItem("api_token", api_token);

		const resultObservable = new Observable((observer) => {
			this.userService.getLoggedUser().subscribe({
				next: (r) => {
					observer.next(r);
					this.lastIsLoggedInResponse = true;
				},
				error: (err) => {
					observer.error(err);
				}
			});
		});
		return resultObservable;
	}

	public isLoggedIn(): boolean {
		let result: boolean = localStorage.getItem("api_token") ? true : false;
		this.lastIsLoggedInResponse = result;
		return result;
		//TODO Si en algun momento la aplicacion recibe un 401, hay que llamar aqui a logOutLocally!
	}

	public logOutLocally() {
		this.lastIsLoggedInResponse = false;
		localStorage.removeItem("api_token");
	}

	public logOut(): void {
		this.userService.logOut().subscribe({
			next: (r) => {
				this.lastIsLoggedInResponse = false;
				localStorage.removeItem("api_token");
				console.log(r);
			},
			error: (err) => {
				//Vacio...
			}
		});
	}

}