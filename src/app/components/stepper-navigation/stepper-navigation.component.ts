import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stepper-navigation',
  templateUrl: './stepper-navigation.component.html',
  styleUrls: ['./stepper-navigation.component.scss'],
})
export class StepperNavigationComponent {
  @Input() disabledLeft!: boolean;
  @Input() disabledRight!: boolean;
  @Input() info!: string;
  @Output() leftClickedEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() rightClickedEmitter: EventEmitter<void> = new EventEmitter<void>();
}
