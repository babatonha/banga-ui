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
    TagModule, 
    CommonModule],
})
export class MyPropertyComponent implements OnInit {

  propertiesDataSource: Property[] = [];
  searchFilter: SearchFilter = DefaultSearchFilter.getDefaultSearchFilter();
  loggedInUser!: User;
  constructor(private propertyService: PropertyService,
    private accountService: AccountService,
    private router: Router,) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  searchItem(){
    console.log(123);
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

    this.propertyService.getOwnerProperties(userId).subscribe({
      next: response => {
        this.propertiesDataSource = response;
      }
    })
  }




  // getSeverity(product: Property) {
  //   switch (product.) {
  //       case 'INSTOCK':
  //           return 'success';

  //       case 'LOWSTOCK':
  //           return 'warning';

  //       case 'OUTOFSTOCK':
  //           return 'danger';

  //       default:
  //           return null;
  //   }
//};

}
