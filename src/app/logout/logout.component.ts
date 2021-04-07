import { Component, OnInit } from '@angular/core';
import { SessionService } from '../core/service/session.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

	constructor(
		public sessService: SessionService,
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			this.sessService.logOut();
		}, 200);
	}

}
