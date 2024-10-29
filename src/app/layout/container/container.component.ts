import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initApp } from '../../data/state/setup/setup.actions';

/**
 * Parent component for the appliation
 */
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  /**
   * Constructor
   * @param store Necessary to dispatch the initial action
   */
  constructor(private store: Store) {}

  /**
   * [Angular lifecycle hook](https://angular.io/guide/lifecycle-hooks)
   */
  ngOnInit(): void {
    this.store.dispatch(initApp());
  }
}
