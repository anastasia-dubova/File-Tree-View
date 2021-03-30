import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class PreviewService {

	previewName: string = ''

	constructor(private http: HttpClient) {}

	setPreview(name: string, path: string): void {
		this.previewName = name
	}
}