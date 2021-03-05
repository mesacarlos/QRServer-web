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
					r.api_token = api_token; //Metemos aqui el api_token pa guardarlo con el usuario
					localStorage.setItem("user_object", JSON.stringify(r));
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
		let user: User = JSON.parse(localStorage.getItem("user_object"));
		let result: boolean = user != null && user.api_token === localStorage.getItem("api_token");
		this.lastIsLoggedInResponse = result;
		return result;
		//TODO Si en algun momento la aplicacion recibe un 401, hay que llamar aqui a logOut!
	}

	public logOut(): void {
		this.userService.logOut().subscribe({
			next: (r) => {
				this.lastIsLoggedInResponse = false;
				localStorage.removeItem("api_token");
				localStorage.removeItem("user_object");
				console.log(r);
			},
			error: (err) => {
				//Vacio...
			}
		});
	}

}