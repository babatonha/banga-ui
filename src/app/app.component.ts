import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './common/components/nav-bar/nav-bar.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent, ScrollPanelModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'banga-ui';


}
