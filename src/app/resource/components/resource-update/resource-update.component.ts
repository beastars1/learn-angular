import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource, ResourceAlert } from '../../shared/resource.model';

@Component({
  selector: 'app-resource-update',
  templateUrl: './resource-update.component.html',
  styleUrls: ['./resource-update.component.css']
})
export class ResourceUpdateComponent {
  @Input() onSubmit!: ((resource: Resource) => Observable<Resource>);

  @Input() alert!: ResourceAlert;;

  selectedResource!: Resource;
  types = Resource.types;

  @Input() set setResource(selectedResource: Resource) {
    // 解包赋值，解包 ≈ 引用传递，可以理解为深拷贝...maybe
    this.selectedResource = { ...selectedResource };
  }

  submitForm() {
    // alert(JSON.stringify(this.sel ectedResource))
    this.onSubmit(this.selectedResource);
  }
}
