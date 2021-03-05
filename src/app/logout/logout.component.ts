import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { SessionService } from '../core/service/session.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements AfterViewChecked {

	constructor(
		public sessService: SessionService,
	) { }

	ngAfterViewChecked(): void {
		setTimeout(()=> {
			this.sessService.logOut();
		}, 100);
	}

}
