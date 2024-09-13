import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ThemeSevice } from '../../../_services/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [InputSwitchModule, CommonModule, FormsModule],
})
export class ProfileComponent implements OnInit {
  checked: boolean = false;
  selectedTheme: string = 'light';
  constructor(private themeService: ThemeSevice) { }

  ngOnInit() {
    this.themeService.switchTheme(this.selectedTheme)
  }

  changeTheme(theme: string) {
    this.checked = !this.checked;
    this.themeService.switchTheme(theme);

  }

}
