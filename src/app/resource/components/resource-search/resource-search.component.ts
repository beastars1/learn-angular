import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resource-search',
  templateUrl: './resource-search.component.html',
  styleUrls: ['./resource-search.component.css']
})
export class ResourceSearchComponent implements OnInit {

  @Output() onSearch = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
