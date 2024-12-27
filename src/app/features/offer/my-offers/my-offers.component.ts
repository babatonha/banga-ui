import { Component, OnInit } from '@angular/core';
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
import { OfferService } from '../../../_services/offer.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';

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
    TableModule
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
  currentPropertyId: number = 1;

  constructor(    
    private offerService: OfferService,
    private router: Router,
      private messageService: MessageService) {

      
     }

  ngOnInit() {
    this.loadOffers();
  }

  searchItem(){

  }

  onPageChange(event: any) {
    // this.pageIndex = event.page + 1;
    // this.pageSize = event.rows;

    // this.getAllProperties(this.loggedInUser.id);
}

navigateToPageWithId(url: string, id: number){
  this.router.navigate([`${url}`,id]);
}

navigateToNewPage(url: string){
 this.router.navigate([`${url}`]);
}

loadOffers(){
  this.offerService.getPropertyOffers(this.currentPropertyId).subscribe({
    next: response => {
      this.offerDataSource = response;
      console.log(this.offerDataSource);
     // this.totalCount = response.totalCount;
    }, error: error => {
      this.offerDataSource = [];
      this.totalCount  = 0;
    }
  })
}


}
