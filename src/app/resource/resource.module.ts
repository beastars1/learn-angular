import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ResourceDetailComponent } from "./components/resource-detail/resource-detail.component";
import { ResourceListComponent } from "./components/resource-list/resource-list.component";
import { ResourceSearchComponent } from "./components/resource-search/resource-search.component";
import { ResourceUpdateComponent } from "./components/resource-update/resource-update.component";
import { ResourceComponent } from "./resource.component";
import { ResourceNewComponent } from './resource-new/resource-new.component';
import { ResourceOutletComponent } from './resource-outlet.component';
import { Routes, RouterModule } from "@angular/router";
import { DetailPageComponent } from './detail-page/detail-page.component';

const routes: Routes = [
  {
    path: "resources", component: ResourceOutletComponent,
    children: [
      { path: "", component: ResourceComponent },
      { path: "new", component: ResourceNewComponent },
      // resources/qwe 即id=qwe
      { path: ":id", component: DetailPageComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ResourceComponent,
    ResourceSearchComponent,
    ResourceListComponent,
    ResourceUpdateComponent,
    ResourceDetailComponent,
    ResourceNewComponent,
    ResourceOutletComponent,
    DetailPageComponent,
  ],
  exports: [
    // 导出组件，让外部可以使用
    ResourceComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ResourceModule {

}