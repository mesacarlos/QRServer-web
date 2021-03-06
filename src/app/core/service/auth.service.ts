import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "../model/token.model";
import { environment } from "src/environments/environment";
import { User } from "../model/user.model";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private env = environment;

	constructor(private http: HttpClient) {
	}

	public login(email: string, password: string): Observable<Token> {
		let jsonHeader = new HttpHeaders().set('Content-Type', 'aplication/json');
		return this.http.post<Token>(this.env.API_BASE_URL + "/login", {
			"email": email,
			"password": password
		}, {
			headers: jsonHeader
		});
	}

	public register(username: string, email: string, password: string): Observable<User>{
		let jsonHeader = new HttpHeaders().set('Content-Type', 'aplication/json');
		return this.http.post<User>(this.env.API_BASE_URL + "/register", {
			"username": username,
			"email": email,
			"password": password
		}, {
			headers: jsonHeader
		});
	}

	public verifyEmail(idToken: string): Observable<boolean> {
		let jsonHeader = new HttpHeaders().set('Content-Type', 'aplication/json');
		return this.http.post<boolean>(this.env.API_BASE_URL + "/emailverify/" + idToken, {}, {
			headers: jsonHeader
		});
	}

	public forgotPasswordSend(email: string): Observable<boolean>{
		let jsonHeader = new HttpHeaders().set('Content-Type', 'aplication/json');
		return this.http.post<boolean>(this.env.API_BASE_URL + "/forgotpassword/sendtoken", {
			"email": email,
		}, {
			headers: jsonHeader
		});
	}

	public forgotPasswordVerify(idToken: string, newPassword: string): Observable<boolean>{
		let jsonHeader = new HttpHeaders().set('Content-Type', 'aplication/json');
		return this.http.post<boolean>(this.env.API_BASE_URL + "/forgotpassword/verify", {
			"id": idToken,
			"password": newPassword,
		}, {
			headers: jsonHeader
		});
	}

}