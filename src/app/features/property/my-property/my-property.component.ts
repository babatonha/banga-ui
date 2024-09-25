import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../../_services/property.service';
import { Router } from '@angular/router';
import { Property } from '../../../_models/property';
import { SearchFilter } from '../../../_models/searchFilter';
import { DefaultSearchFilter } from '../../../_static/searchFilterDefaultData';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { AccountService } from '../../../_services/account.service';
import { User } from '../../../_models/user';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../../_models/pageEvent';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-my-property',
  templateUrl: './my-property.component.html',
  styleUrls: ['./my-property.component.scss'],
  standalone: true,
  imports: [
    ToolbarModule, 
    DataViewModule, 
    InputTextModule,
    ButtonModule, 
    FormsModule,
    TagModule, 
    PaginatorModule,
    CommonModule],
})


export class MyPropertyComponent implements OnInit {

  propertiesDataSource: Property[] = [];
  searchFilter: SearchFilter = DefaultSearchFilter.getDefaultSearchFilter();
  loggedInUser!: User;
  pageSize: number = 5;
  pageIndex: number = 0;
  totalCount: number = 0;
  first: number = 0;
  searchTerm: string = '';

  constructor(private propertyService: PropertyService,
    private accountService: AccountService,
    private router: Router,) {

      
     }

  ngOnInit() {
    this.getCurrentUser();
  }

  searchItem(){
    this.searchFilter.searchTerms = [];
    this.searchFilter.searchTerms.push(this.searchTerm);
    this.getAllProperties(this.loggedInUser.id);
  }


  onPageChange(event: any) {
      this.pageIndex = event.page + 1;
      this.pageSize = event.rows;

      this.getAllProperties(this.loggedInUser.id);
  }

  navigateToNewPage(url: string){
    this.router.navigate([`${url}`]);
  }

  navigateToPageWithId(url: string, id: number){
    this.router.navigate([`${url}`,id]);
  }


  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
       
      next: user => {
        if(user){
          this.loggedInUser = user;
        }else{
            this.loggedInUser  = this.accountService.getLoggedInUser(); //try getting it from local storage
        }

        this.getAllProperties(this.loggedInUser.id);
      }
    })
  }


  getAllProperties(userId: number){
    this.searchFilter.pageIndex = this.pageIndex;
    this.searchFilter.pageSize = this.pageSize;

    this.propertyService.getOwnerProperties(userId, this.searchFilter).subscribe({
      next: response => {
        this.propertiesDataSource = response.items;
        this.totalCount = response.totalCount;
      }
    })
  }
}
