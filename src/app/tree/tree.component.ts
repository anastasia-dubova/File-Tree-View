import { Component, OnInit, Input, HostBinding, HostListener} from '@angular/core';
import { FileType, DirectoryType } from '../shared/file-list.service';
import { PreviewService } from '../shared/preview.service';
import { SearchService } from '../shared/search.service';

@Component({
	selector: 'app-tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.scss']
})
export class TreeComponent /*implements OnInit*/ {
	
	@Input()
	value: DirectoryType<FileType> = {name: null, files: null}


	@HostBinding("class.empty")
	get isEmpty(): boolean {
		return this.value && this.value.files && !this.value.files.length
	}

	@HostBinding("class.opened")
	get isOpened(): boolean {
		return this.value && this.value.files && this.value.files.length && this.value.opened
	}

	@HostBinding("class.closed")
	get isClosed(): boolean {
		return this.value && this.value.files && this.value.files.length && !this.value.opened
	}

	@HostListener("click", ["$event"])
	onMouseClick(e) {
		e.stopPropagation()
		const tmp = e.target.closest('app-tree')
		if(tmp.classList.contains('opened')) {
			tmp.classList.remove('opened')
			tmp.classList.add('closed')

			this.previewService.setPreview('', '')
			return
		}
		if(tmp.classList.contains('closed') && !tmp.classList.contains('empty')) {
			tmp.classList.remove('closed')
			tmp.classList.add('opened')

			this.previewService.setPreview('', '')
			return
		}
		if(tmp.classList.contains('empty')) {
			this.previewService.setPreview('', '')
			return
		}

		//this.previewService.setPreview(e.target.textContent, '')
		this.previewService.setPreview(this.value.name, this.value.path)
		console.log('value', this.value.name, this.value.path)
	}

	constructor(public previewService: PreviewService, public searchService: SearchService) {}

}
