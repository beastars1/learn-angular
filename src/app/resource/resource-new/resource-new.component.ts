import { Component } from '@angular/core';
import { AlertComponent } from '../shared/alert.component';
import { Resource } from '../shared/resource.model';
import { ResourceService } from '../shared/resource.service';

@Component({
  selector: 'app-resource-new',
  templateUrl: './resource-new.component.html',
  styleUrls: ['./resource-new.component.css']
})
export class ResourceNewComponent extends AlertComponent {
  resource: Resource = new Resource();

  constructor(private resourceService: ResourceService) {
    super();
  }

  public createResource = (resource: Resource) => {
    this.resourceService.createResource(resource)
      .subscribe((newResource) => { // 成功的话
        // 弹窗
        this.setAlert("success", "添加成功");
      }, (error: string) => { // 失败的话
        this.setAlert("error", error);
      });
  }
}
