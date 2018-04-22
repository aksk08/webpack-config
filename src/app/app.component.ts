import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import '../styles.scss'

@Component({
	selector: 'test-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public isCollapsed = true;
	plus = faPlus;
}