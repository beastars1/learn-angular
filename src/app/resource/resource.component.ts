import { Component, OnDestroy, OnInit } from "@angular/core";
import { Resource, ResourceAlert } from "./shared/resource.model";
import { ResourceService } from "./shared/resource.service";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html'
})
export class ResourceComponent implements OnDestroy, OnInit {
  public isDetailView = true;
  public selectedResource!: Resource;

  public resources: Resource[] = [];
  
  alert!: ResourceAlert;
  private timeoutId: any | undefined;

  constructor(private resourceService: ResourceService) { }

  // 初始化函数
  ngOnInit() {
    // 发起请求
    this.getResources();
  }

  // 销毁（离开页面）时的钩子函数，执行这个函数之后才会离开页面
  ngOnDestroy(): void {
    // 如果定时器还存在，就销毁
    this.timeoutId && clearTimeout(this.timeoutId);
  }

  private getResources() {
    // http 请求
    this.resourceService.getResources()
      .subscribe((resources) => {
        // console.log(resources);
        this.resources = resources;
      });
  }

  get totalResources() {
    return this.resources.length;
  }

  toogleDetailView() {
    this.isDetailView = !this.isDetailView;
  }

  get btnViewClass(): string {
    return this.isDetailView ? 'btn-warning' : 'btn-primary';
  }

  get hasResource(): boolean {
    return this.resources && this.totalResources > 0;
  }

  /**
   * 返回当前选中的对象，如果没有选中，默认返回列表的第一个，否则返回 null
   */
  get activeResource(): Resource {
    return this.selectedResource
      // || (this.hasResource && { ...this.resources[0] })
      || (this.hasResource && this.resources[0])
      || null;
  }

  /**
   * 找到resource在数组resources中的位置
   */
  private findResourceIndex(resource: Resource): number {
    return this.resources.findIndex(r => r._id === resource._id);
  }

  // 点击列表内容触发
  public handleResourceSelect(resource: Resource) {
    // alert(JSON.stringify(resource));
    // this.selectedResource = { ...resource };
    // alert(JSON.stringify(this.selectedResource));
    this.selectResource(resource);
  }

  private selectResource(resource: Resource) {
    if (!resource || !resource._id) {
      return null;
    }

    // 解包传值
    this.selectedResource = { ...resource }
    return this.selectedResource;
  }

  /**
   * 更新选中的对象
   * @param resource 新的对象
   */
  public hydrateResource(resource: Resource) {
    // console.log(resource)
    const index = this.findResourceIndex(resource);
    this.resources[index] = resource;
    this.selectResource(resource);
  }

  /**
   * 删除选中的对象
   */
  public deleteResource() {
    if (!this.activeResource._id) {
      alert("没有数据可以删除");
      return;
    }

    const isConfirm = confirm("确认删除？")
    if (isConfirm) {
      // 删除请求
      this.resourceService.deleteResource(this.activeResource._id)
        .subscribe(deletedResource => {
          const index = this.findResourceIndex(deletedResource);
          // array.splice(index, num) : 数组array中，从第index个位置开始，删除num个元素
          this.resources.splice(index, 1);
          this.selectResource(this.resources[0]); // 重置选中的对象
        })
    }
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

  public updateResource = (resource: Resource) => {
    this.resourceService.updateResource(resource?._id, resource)
      .subscribe((updateResource) => { // 成功的话
        this.hydrateResource(updateResource);
        // 弹窗
        this.setAlert("success", "更新成功");
      }, (error: string) => { // 失败的话
        this.setAlert("error", error);
      });
  }
}