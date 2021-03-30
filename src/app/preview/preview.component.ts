import { Component} from '@angular/core';
import { PreviewService } from '../shared/preview.service';

@Component({
	selector: 'app-preview',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {

	constructor(public previewService: PreviewService) { }

}
