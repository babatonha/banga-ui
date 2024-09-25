import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Property } from '../../../_models/property';
import { SearchFilter } from '../../../_models/searchFilter';
import { DefaultSearchFilter } from '../../../_static/searchFilterDefaultData';
import { User } from '../../../_models/user';
import { ToolbarModule } from 'primeng/toolbar';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { PropertyService } from '../../../_services/property.service';
import { AccountService } from '../../../_services/account.service';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { LocationService } from '../../../_services/location.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
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
     AutoCompleteModule
  ],
})
export class PropertyListComponent implements OnInit {
  propertiesDataSource: Property[] = [];
  searchFilter: SearchFilter = DefaultSearchFilter.getDefaultSearchFilter();
  loggedInUser!: User;
  pageSize: number = 5;
  pageIndex: number = 0;
  totalCount: number = 0;
  first: number = 0;
  searchTerm: string = '';

  selectedItems: string[] = [];
  allLocations:   string[] = [];
  constructor(private propertyService: PropertyService,
    private accountService: AccountService,
    private locationService: LocationService,
    private router: Router,) {}

  ngOnInit() {
    this.getCitySuburbs();
    this.getAllProperties();
  }

  searchItem(){
    this.searchFilter.searchTerms = [];
    this.searchFilter.searchTerms.push(this.searchTerm);
  }

  getCitySuburbs(){
    this.locationService.getAllCitySuburbs().subscribe({
      next: response => {
        this.allLocations = response;
      }
    })
  }


  search(event: AutoCompleteCompleteEvent) {
    this.allLocations = [...Array(10).keys()].map((item) => event.query + '-' + item);
  }


  onPageChange(event: any) {
      this.pageIndex = event.page + 1;
      this.pageSize = event.rows;
      this.getAllProperties();
  }

  navigateToNewPage(url: string){
    this.router.navigate([`${url}`]);
  }

  navigateToPageWithId(url: string, id: number){
    this.router.navigate([`${url}`,id]);
  }


  getAllProperties(){
    this.searchFilter.pageIndex = this.pageIndex;
    this.searchFilter.pageSize = this.pageSize;

    this.propertyService.getFilteredProperties(this.searchFilter).subscribe({
      next: response => {
        this.propertiesDataSource = response.items;
        this.totalCount = response.totalCount;
      }
    })
  }

}
