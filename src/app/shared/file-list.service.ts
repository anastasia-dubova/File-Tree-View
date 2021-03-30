import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export type FileType = {
	name: string,
	path?: string
}

export type DirectoryType<FileType> = {
	name: string,
	path?: string,
	opened?: boolean,
	files: Array<FileType | DirectoryType<FileType>>
}

@Injectable({
	providedIn: 'root'
})
export class FileList {

	public srcList: DirectoryType<FileType>
	public list: DirectoryType<FileType>

	constructor(private http: HttpClient) {}

	getFileList(path: string): Observable<DirectoryType<FileType>> {

		return this.http.get<DirectoryType<FileType>>(`./assets/filetree.json`)
			.pipe(tap(data => {
						try {
							this.list = data
							this.srcList = data
						} catch(e) {
							console.log('e', e)
						}
					},
					data => {
						console.log(`${data.error.cod} ${data.error.message}`)
					}
				)
			)
			
	}

	filterList(filterString: string): void {
		this.list = this.getFilteredList(this.srcList, filterString)
	}

	private getFilteredList(src: DirectoryType<FileType>, filterString: string): DirectoryType<FileType> {
		if(!filterString) return src
		if(src.files) {
			let newArray = []
			src.files.forEach(value => {
				if(value["files"]) {
					newArray = [...newArray, this.getFilteredList(value as DirectoryType<FileType>, filterString)]
				} else {
					if(value.name){
						let fls = value.name.toString().toLowerCase().indexOf(filterString.toLowerCase()) !== -1 ? value : null
						if(fls) {
							newArray = [...newArray, fls]
						}
					}else{
						console.log('error', value)
					}
				}
			})
			return {...src, files: newArray}
		}
	}
}