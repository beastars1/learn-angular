import { Component, OnInit } from "@angular/core";
import { Resource } from "./shared/resource.model";
import { ResourceService } from "./shared/resource.service";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html'
})
export class ResourceComponent {
  public isDetailView = true;
  public selectedResource!: Resource;

  public resources: Resource[] = []

  constructor(private resourceService: ResourceService) {

  }

  // 初始化函数
  ngOnInit() {
    // 发起请求
    this.getResources();
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

  get activeResource(): Resource {
    return this.selectedResource
      // || (this.hasResource && { ...this.resources[0] })
      || (this.hasResource && this.resources[0])
      || null;
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

  public hydrateResource(resrouce: Resource) {
    // console.log(resrouce)
    const index = this.resources.findIndex(r => r._id === resrouce._id);
    this.resources[index] = resrouce;
    this.selectResource(resrouce);
  }
}