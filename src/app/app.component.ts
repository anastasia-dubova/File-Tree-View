import { Component, OnInit } from '@angular/core';
import { FileList } from './shared/file-list.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(public fileList: FileList, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.fileList.getFileList('/assets/filetree.json').subscribe()

		this.route.queryParams.subscribe(params => {
			this.fileList.selected = params['selected'];
		});
	}
}
