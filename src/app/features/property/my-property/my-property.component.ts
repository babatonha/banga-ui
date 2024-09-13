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

  constructor(private propertyService: PropertyService,
    private router: Router,) { }

  ngOnInit() {
    this.getAllProperties();
  }

  searchItem(){
    console.log(123);
  }

  navigateToNewProperty(){
    this.router.navigate(['new-property']);
  }



  getAllProperties(){
    this.propertyService.getFilteredProperties(this.searchFilter).subscribe({
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
