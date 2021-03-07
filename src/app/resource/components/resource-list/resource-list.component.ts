import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resource } from 'src/app/resource/shared/resource.model';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent {
  @Input() resources!: [Resource];
  @Input() activeId!: string;
  @Output() onResourceClick = new EventEmitter<Resource>();

  get jsonFormResources() {
    return JSON.stringify(this.resources);
  }

  handleResourceSelect(resource: Resource) {
    // alert(JSON.stringify(resource));
    this.onResourceClick.next(resource);
  }
}
