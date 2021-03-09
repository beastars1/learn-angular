import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-resource-search',
  templateUrl: './resource-search.component.html',
  styleUrls: ['./resource-search.component.css']
})
export class ResourceSearchComponent implements AfterViewInit {

  @ViewChild("searchInput") input!: ElementRef;

  @Output() onSearch = new EventEmitter<string>();

  constructor() { }

  // view 初始化之后
  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, "keyup")
      .subscribe((e: any) => {
        // console.log(e.target.value);
        this.onSearch.emit(e.target.value);
      })
  }

}
