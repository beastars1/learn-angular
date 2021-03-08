import { Component, Input } from '@angular/core';
import { Resource } from 'src/app/resource/shared/resource.model';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent {
  @Input() resource: Resource | undefined;
  @Input() isButtonDisplayed = true;
}
