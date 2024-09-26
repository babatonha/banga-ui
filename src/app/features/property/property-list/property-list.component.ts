import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { FilterComponent } from '../../../common/components/filter/filter.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';

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
     AutoCompleteModule,
     FilterComponent,
     ConfirmPopupModule,
  ],
  providers: [ConfirmationService, MessageService]
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

  selectedSearchTerms: string[] = [];
  allLocations:   string[] = [];
  suggestions:   string[] = [];
  @ViewChild(FilterComponent)  filterComponent!: FilterComponent; 
  constructor(private propertyService: PropertyService,
    private accountService: AccountService,
    private locationService: LocationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,) {}

  ngOnInit() {
    this.getCitySuburbs();
    this.getAllProperties();
  }

  searchProperties(){
    this.searchFilter.searchTerms = [];
    this.searchFilter.searchTerms = this.selectedSearchTerms;
    this.getAllProperties();
  }

  getCitySuburbs(){
    this.locationService.getAllCitySuburbs().subscribe({
      next: response => {
        this.allLocations = response;
      }
    })
  }


  suggestionSearch(event: AutoCompleteCompleteEvent) {
    this.suggestions =  this.allLocations.filter(item => 
      item.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  filterClick(){
    this.filterComponent.visible = true;
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
    this.router.navigate([`/${url}`,id]);
  }


  getAllProperties(){
    this.searchFilter.pageIndex = this.pageIndex;
    this.searchFilter.pageSize = this.pageSize;

    this.propertyService.getFilteredProperties(this.searchFilter).subscribe({
      next: response => {
        this.propertiesDataSource = response.items;
        this.totalCount = response.totalCount;
      }, error: error => {
        this.propertiesDataSource = [];
      }
    })
  }



  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Please confirm to proceed moving forward.',
        icon: 'pi pi-filter',
        acceptIcon: 'pi pi-check mr-1',
        rejectIcon: 'pi pi-times mr-1',
        acceptLabel: 'Filter',
        rejectLabel: 'Clear',
        rejectButtonStyleClass: 'p-button-outlined p-button-sm',
        acceptButtonStyleClass: 'p-button-sm',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

}
