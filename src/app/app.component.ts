import { Component } from '@angular/core';

import '../styles.scss'

@Component({
	selector: 'test-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public isCollapsed = true;
}