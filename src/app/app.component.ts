import { Component, OnInit } from '@angular/core';
import { FileList } from './shared/file-list.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(public fileList: FileList) {}

	ngOnInit(): void {
		this.fileList.getFileList('').subscribe()
	}
}
