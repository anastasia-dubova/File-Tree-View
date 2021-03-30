import { Pipe, PipeTransform } from '@angular/core';
import { FileType, DirectoryType } from '../shared/file-list.service';


@Pipe({
	name: 'filesFilter'
})
export class FilesFilterPipe implements PipeTransform {
	transform(src: DirectoryType<FileType>, search: string = ''): DirectoryType<FileType> {

		if(!search.trim()) {
			return src
		}

		if(src) {
			return src.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1 ? src : null
		} else {
			return src
		}
	}
}