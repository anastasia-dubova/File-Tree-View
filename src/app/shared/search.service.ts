import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	searchString: string = ''

	constructor() {}

	setSearchString(searchString: string): void {
		this.searchString = searchString
	}
}