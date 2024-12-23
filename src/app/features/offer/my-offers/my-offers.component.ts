import { Component, OnInit } from '@angular/core';
import { NewOfferComponent } from '../new-offer/new-offer.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { ToolbarModule } from 'primeng/toolbar';
import { Offer } from '../../../_models/offer';
import { DefaultSearchFilter } from '../../../_static/searchFilterDefaultData';
import { SearchFilter } from '../../../_models/searchFilter';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss'],
  standalone: true,
  imports: [
    ToolbarModule, 
    DataViewModule, 
    InputTextModule,
    ButtonModule, 
    FormsModule,
    TagModule, 
    PaginatorModule,
    CommonModule,
    NewOfferComponent
  ],
})
export class MyOffersComponent implements OnInit {
  offerDataSource: Offer[] = [];
  searchFilter: SearchFilter = DefaultSearchFilter.getDefaultSearchFilter();
  //loggedInUser!: User;
  pageSize: number = 5;
  pageIndex: number = 0;
  totalCount: number = 0;
  first: number = 0;
  searchTerm: string = '';

  constructor() {

      
     }

  ngOnInit() {
  }

  searchItem(){

  }

  onPageChange(event: any) {
    // this.pageIndex = event.page + 1;
    // this.pageSize = event.rows;

    // this.getAllProperties(this.loggedInUser.id);
}

navigateToPageWithId(url: string, id: number){
  //this.router.navigate([`${url}`,id]);
}

navigateToNewPage(url: string){
 // this.router.navigate([`${url}`]);
}


}
