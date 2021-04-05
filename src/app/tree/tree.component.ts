import { Component, ElementRef, OnInit, Input, HostBinding, HostListener} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { DirectoryType } from '../shared/file-list.service';
import { PreviewService } from '../shared/preview.service';
import { SearchService } from '../shared/search.service';
import { FileList } from '../shared/file-list.service';

@Component({
	selector: 'app-tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

	selector = ''
	
	@Input()
	value: DirectoryType //= {name: null, path: null, files: null}

	@HostBinding("class.folder")
	get isFolder(): boolean {
		return this.value && this.value.files && true
	}

	@HostBinding("class.empty")
	get isEmpty(): boolean {
		return this.value && this.value.files && !this.value.files.length
	}

	clickFolder(e) {
		e.stopPropagation()
		const tmp = e.target.closest(this.selector)
		if(tmp.classList.contains('opened')) {
			tmp.classList.remove('opened')

			this.previewService.setPreview('', '')
			return
		}
		if(!tmp.classList.contains('empty')) {
			tmp.classList.add('opened')

			this.previewService.setPreview('', '')
			return
		}
		if(tmp.classList.contains('empty')) {
			this.previewService.setPreview('', '')
			return
		}
	}

	selectFileHandler(e): void {
		this.previewService.setPreview(this.value.name, this.value.path)

		document.querySelectorAll('.selected').forEach(v => v.classList.remove('selected'))
		e.target.closest(this.selector)!.classList.add('selected')

		this.router.navigate(['/'], {queryParams: {selected: this.value.path}})
	}
	constructor(public fileList: FileList,
					public previewService: PreviewService,
					public searchService: SearchService,
					public elem: ElementRef,
					private router: Router
	) {
		this.selector = elem.nativeElement.tagName
	}

	ngOnInit(): void {
		this.setSelectedFile()
		
		if(this.isFolder && this.fileList.selected.toLowerCase().indexOf(this.value.path.toLowerCase()) > -1) {

			this.elem.nativeElement.classList.add('opened')
		}
	}

	setSelectedFile() {
		if(this.fileList.selected) {
			if(this.value.path.toLowerCase() === this.fileList.selected.toLowerCase()) {
				this.elem.nativeElement.classList.add('selected')
				this.previewService.setPreview(this.value.name, this.value.path)
			}
		}
	}
	
}