import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export type DirectoryType = {
	name: string,
	path?: string,
	opened?: boolean,
	files?: Array<DirectoryType>
}

@Injectable({
	providedIn: 'root'
})
export class FileList {

	public srcList: DirectoryType
	public list: DirectoryType
	public selected: string

	constructor(private http: HttpClient) {}

	getFileList(path: string): Observable<DirectoryType> {

		return this.http.get<DirectoryType>(`./assets/filetree.json?search=${path}`)
			.pipe(
				map(data => {
					let n = this.transformData({...data}, '')
					this.list = {...n}
					this.srcList = {...n}
					return n
				})
			)
			
	}

	filterList(filterString: string): void {
		this.list = this.getFilteredList(this.srcList, filterString)
	}

	isFolder(data: DirectoryType) {
		return data && data.files
	}

	isFile(data: DirectoryType) {
		return data && !data.files
	}

	private transformData(data: DirectoryType, path: string): DirectoryType {
		data.path = `${path}/${data.name}`
		if(this.isFolder(data)) {
			let newArray = data.files.map(value => {
				if(value.files) {
					this.transformData(value as DirectoryType, data.path)
				} else {
					value.path = `${data.path}/${value.name}`
				}
			})
		} else {
			data.path = `${data.path}/${data.name}`
		}
		return data
	}

		private getFilteredList(src: DirectoryType, filterString: string): DirectoryType {
		if(!filterString) return src
		if(this.isFolder(src)) {
			let newArray = []
			src.files.forEach(value => {
				if(value.files) {
					let fls = this.getFilteredList(value as DirectoryType, filterString)
					if(fls) {
						newArray = [...newArray, fls]
					}
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
			if(src.name.toString().toLowerCase().indexOf(filterString.toLowerCase()) !== -1 || newArray.length) {
				return {...src, files: newArray}
			} else {
				return 
			}
		}
	}
}