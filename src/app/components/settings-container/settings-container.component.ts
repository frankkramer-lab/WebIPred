import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { selectSettingsState } from 'src/app/data/state/settings/settings.selectors';
import { SettingsState } from 'src/app/data/state/settings/settings.state';
import {
  discardSettingsFormChanges,
  editSettingsForm,
  submitSettingsForm,
} from '../../data/state/settings/settings.actions';

/**
 * Wrapper component for the {@link "app/components/settings/settings.component"!SettingsComponent}
 */
@Component({
  selector: 'app-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss'],
})
export class SettingsContainerComponent implements OnInit {
  /**
   * Observable holding the settings, the user can adjust using [ngrx-forms](https://ngrx-forms.readthedocs.io/en/master/)
   */
  settings$!: Observable<FormGroupState<SettingsState>>;

  /**
   * Constructor
   * @param store Necessary, to load information from store
   */
  constructor(private store: Store) {}

  /**
   * On initialization, we access information from store
   */
  ngOnInit(): void {
    this.settings$ = this.store.select(selectSettingsState);
  }

  /**
   * Enable the settings form to allow the user to make changes.
   */
  enableSettingsForm(): void {
    this.store.dispatch(editSettingsForm());
  }

  /**
   * Disable the settings form to avoid making unwanted changes.
   */
  disableSettingsForm(): void {
    this.store.dispatch(submitSettingsForm());
  }

  /**
   * Discard any changes made to the settings form.
   */
  discardSettingsForm(): void {
    this.store.dispatch(discardSettingsFormChanges());
  }
}
