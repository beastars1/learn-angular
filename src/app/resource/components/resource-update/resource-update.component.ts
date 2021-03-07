import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Resource, ResourceAlert } from '../../shared/resource.model';
import { ResourceService } from '../../shared/resource.service';

@Component({
  selector: 'app-resource-update',
  templateUrl: './resource-update.component.html',
  styleUrls: ['./resource-update.component.css']
})
export class ResourceUpdateComponent implements OnInit {
  @Output() onResourceUpdate = new EventEmitter<Resource>();

  selectedResource!: Resource;
  types = Resource.types;
  alert!: ResourceAlert;
  private timeoutId: any | undefined;

  @Input() set setResource(selectedResource: Resource) {
    // 如果已经选中，并且新选中的和之前已经选中的不是同一个
    if (this.selectedResource && (this.selectedResource._id !== selectedResource._id)) {
      if (this.timeoutId) { // 如果定时器还存在
        // 刷新定时器，重置更新警告
        clearTimeout(this.timeoutId);
        this.alert = new ResourceAlert();
      }
    }

    // 解包赋值，解包 ≈ 引用传递，可以理解为深拷贝...maybe
    this.selectedResource = { ...selectedResource };
  }

  constructor(private resourceService: ResourceService) { }

  // 初始化时的钩子函数，执行这个函数之后才会打开页面
  ngOnInit(): void {
    // console.log(this.selectedResource)
    console.log(this.types);
  }

  // 销毁（离开页面）时的钩子函数，执行这个函数之后才会离开页面
  ngOnDestroy(): void {
    // 如果定时器还存在，就销毁
    this.timeoutId && clearTimeout(this.timeoutId);
  }

  submitForm() {
    // alert(JSON.stringify(this.sel ectedResource))
    this.resourceService.updateResource(this.selectedResource?._id, this.selectedResource)
      .subscribe((updateResource) => { // 成功的话
        // console.log(updateResource)
        this.onResourceUpdate.emit(updateResource);
        // 弹窗
        this.setAlert("success", "更新成功");
      }, (error: string) => { // 失败的话
        this.setAlert("error", error);
      });
  }

  /**
   * @param type 更新是否成功
   * @param message 显示信息
   */
  private setAlert(type: keyof ResourceAlert, message: string) {
    this.alert = new ResourceAlert();
    this.alert[type] = message;
    // 显示更新是否成功之后，三秒之后提示清空
    this.timeoutId = setTimeout(() => {
      this.alert = new ResourceAlert();
    }, 3000);
  }
}
