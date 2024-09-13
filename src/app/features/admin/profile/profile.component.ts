import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ThemeSevice } from '../../../_services/theme.service';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [InputSwitchModule, CommonModule, FormsModule, ToggleButtonModule],
})
export class ProfileComponent implements OnInit {
  checked: boolean = false;
  themeIcon: string  =  'pi pi-sun';
  label: string = 'Light Mode';
  constructor(private themeService: ThemeSevice) { }

  ngOnInit() {
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
