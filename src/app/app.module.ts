import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { PreviewComponent } from './preview/preview.component';
import { SearchComponent } from './search/search.component';
import { FilesFilterPipe } from './shared/files-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    SearchComponent,
    TreeComponent,
    FilesFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
