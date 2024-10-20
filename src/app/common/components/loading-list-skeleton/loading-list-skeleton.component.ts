import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-loading-list-skeleton',
  templateUrl: './loading-list-skeleton.component.html',
  styleUrls: ['./loading-list-skeleton.component.scss'],
  standalone: true,
  imports: [DataViewModule, CommonModule, SkeletonModule,],

})
export class LoadingListSkeletonComponent implements OnInit {
  layout:  'list' | 'grid' = 'list';
  products: number[] =  [1,2,3,4,5,6,7,8,9,10];
  constructor() { }

  ngOnInit() {
  }


  counterArray(n: number): any[] {
    return Array(n);
  }

}
