import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Resource } from '../shared/resource.model';
import { ResourceService } from '../shared/resource.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  resource!: Resource;

  constructor(private route: ActivatedRoute, private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // 此处id就是resource.module.ts中的{ path: ":id", component: DetailPageComponent }
      // 如 localhost:4200/resources/qwe，则 id = qwe
      const id = params['id'];
      this.getResourceById(id);
    })
  }

  private getResourceById(id: string) {
    this.resourceService.getResourcesById(id)
      .subscribe(resource => this.resource = resource);
  }

}
