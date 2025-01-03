import { Component, Input, OnInit } from '@angular/core';
import { MenubarModule, } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { MenuItem, MenuItemCommandEvent, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { User } from '../../../_models/user';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { AccountService } from '../../../_services/account.service';
import { FooterComponent } from '../footer/footer.component';
import { ThemeSevice } from '../../../_services/theme.service';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    SplitButtonModule,
    ToastModule,
    MenubarModule,
     BadgeModule, 
     AvatarModule, 
     InputTextModule,
     RippleModule,
     ToggleButtonModule,
     FormsModule,
     FooterComponent 
    ],
     providers: [MessageService]
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;
  buttonItems: MenuItem[] | undefined;
  @Input() loggedInUser: User | undefined;
  checked: boolean = false;
  themeIcon: string  =  'pi pi-sun';
  label: string = 'Light Mode';

  constructor(private messageService: MessageService, 
    private router: Router,
    private themeService: ThemeSevice,
    private accountService: AccountService) 
  {
    this.items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: 'home'
        },
        {
            label: 'Law Firms',
            icon: 'pi pi-star',
            routerLink: 'law-firms'
        },
    ];
  
    this.buttonItems  = [
      {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          routerLink: 'profile'
      },
      {
        label: 'Messages',
        icon: 'pi pi-fw pi-envelope',
        routerLink: 'chat'
      },

      {
        label: 'My Properties',
        icon: 'pi pi-fw pi-warehouse',
        routerLink: 'my-property'
      },

      {
          separator: true
      },
      {
          label: 'Quit',
          icon: 'pi pi-fw pi-power-off',
          command: (event) => this.logout(event)
      }
    ];
   }

  ngOnInit() {
    this.getCurrentUser();
  }

  logout(event: MenuItemCommandEvent){
    this.accountService.logout();
    this.loggedInUser = undefined;
    this.router.navigate(['/login']);
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }


  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
       
      next: user => {
        if(user){
          this.loggedInUser = user;
        }else{
            this.loggedInUser  = this.accountService.getLoggedInUser(); //try getting it from local storage
        }
      }
    })
  }

  save(severity: string) {
    //this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
  }

changeTheme(theme: string) {

  if(theme){
    if(!this.checked){
      this.themeIcon = 'pi pi-sun';
      this.themeService.switchTheme(theme);
      this.label = 'Light Mode';
      this.checked = false;
    }else{
      this.themeIcon = 'pi pi-moon';
      this.themeService.switchTheme(theme);
      this.label = 'Dark Mode';
      this.checked = true;
    } 
    
  }
}
  

}
