import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss'],
  standalone: true
})
export class EditPropertyComponent implements OnInit {

  currentPropertyId!: number;

  constructor(private route: ActivatedRoute, ) { }

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      this.currentPropertyId = +params['id'];
    });
  }

}
