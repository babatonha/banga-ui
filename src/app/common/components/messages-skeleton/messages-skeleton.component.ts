import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-messages-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './messages-skeleton.component.html',
  styleUrl: './messages-skeleton.component.scss'
})
export class MessagesSkeletonComponent {

}
