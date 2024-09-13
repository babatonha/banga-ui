import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TextInputComponent implements  ControlValueAccessor {
  @Input() label = "";
  @Input() type = "";
  @Input() IsSideLabel = false;


  constructor(@Self() public ngControl: NgControl) { //makes angular not to reuse the ngcontrol already in memory
    this.ngControl.valueAccessor = this; //input class
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control(): FormControl{
    return this.ngControl.control as FormControl;
  }
}
