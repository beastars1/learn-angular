import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ResourceDetailComponent } from "./components/resource-detail/resource-detail.component";
import { ResourceListComponent } from "./components/resource-list/resource-list.component";
import { ResourceSearchComponent } from "./components/resource-search/resource-search.component";
import { ResourceUpdateComponent } from "./components/resource-update/resource-update.component";
import { ResourceComponent } from "./resource.component";

@NgModule({
  declarations: [
    ResourceComponent,
    ResourceSearchComponent,
    ResourceListComponent,
    ResourceUpdateComponent,
    ResourceDetailComponent,
  ],
  exports: [
    // 导出组件，让外部可以使用
    ResourceComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ResourceModule {

}