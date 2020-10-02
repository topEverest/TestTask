import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { ThreeFourTasks } from '../three-four-tasks.service';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {

  @Input() disInput: boolean;
  @Output() blockMessage = new EventEmitter<string>();

  constructor(private threeFourTasks: ThreeFourTasks) {
    this.threeFourTasks.BlockForm
      .subscribe( res => this.blockMessage.emit('You entered the wrong password three times. The form is blocked!'));
  }

  // Это нужно для создания нашего кастомного инпута
  onChange: any = () => {}
  onTouch: any = () => {}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  input: string;
  writeValue(input: string) {
    this.input = input;
  }

}
