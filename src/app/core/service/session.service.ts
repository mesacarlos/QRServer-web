import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { UserService } from "./user.service";

@Injectable({
	providedIn: "root"
})
export class SessionService {
	constructor(
		private userService: UserService,
	) { }

	public startSession(api_token: string) {
		localStorage.setItem("api_token", api_token);
		this.userService.getLoggedUser().subscribe(r => {
			r.api_token = api_token;
			localStorage.setItem("user_object", JSON.stringify(r));
		});
	}

	public isLoggedIn() {
		let user: User = JSON.parse(localStorage.getItem("user_object"));
		return user.api_token === localStorage.getItem("api_token");
	}

	public logOut() {
		localStorage.removeItem("api_token");
		localStorage.removeItem("user_object");
	}

}