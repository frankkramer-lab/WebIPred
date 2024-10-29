import { Component, OnDestroy } from '@angular/core';
import { ToastService } from '../../core/service/toast.service';

/**
 * Toast component which contains the notifications
 */
@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent implements OnDestroy {
  /**
   * Constructor
   * @param toastService Necessary to manage toasts
   */
  constructor(public toastService: ToastService) {}

  /**
   * [Angular lifecycle hook](https://angular.io/guide/lifecycle-hooks)
   */
  ngOnDestroy() {
    this.toastService.clear();
  }
}
