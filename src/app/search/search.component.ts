import { Component } from '@angular/core';
import { SearchService } from '../shared/search.service';
import { FileList } from '../shared/file-list.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent {

	constructor(public searchService: SearchService, public fileList: FileList) { }

	searchFile(e) {
		e.preventDefault()
		this.fileList.filterList(this.searchService.searchString)
	}

}
