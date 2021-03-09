import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
      .pipe(debounceTime(250)) // 防抖动，事件（按下键盘）不再发生的250ms之后，才会执行下方时间
      .subscribe((e: any) => {
        // console.log(e.target.value);
        this.onSearch.emit(e.target.value);
      })
  }

}
