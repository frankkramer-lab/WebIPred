import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { SettingsState } from 'src/app/data/state/settings/settings.state';

/**
 * Component responsible for settings. Users are able to configure intervals for regular backend calls and chart preferences.
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  /**
   * Settings, the user can adjust using [ngrx-forms](https://ngrx-forms.readthedocs.io/en/master/)
   */
  @Input() settings!: FormGroupState<SettingsState> | null;

  /**
   * Emits a signal, if the user wants to edit the settings.
   */
  @Output() editSettingsEmitter: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Emits a signal, if the user wants to save the settings.
   */
  @Output() saveSettingsEmitter: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Emits a signal, if the user wants to discard changes made to the settings.
   */
  @Output() discardSettingsChangesEmitter: EventEmitter<void> =
    new EventEmitter<void>();
}
