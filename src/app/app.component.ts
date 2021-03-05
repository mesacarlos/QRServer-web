import { Component } from '@angular/core';
import { SessionService } from './core/service/session.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'qrcodes-web';

	constructor(
		public sessService: SessionService,
	) { }
}
