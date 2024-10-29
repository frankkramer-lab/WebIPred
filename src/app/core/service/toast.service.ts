import { Injectable } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Toast } from '../../data/schema/toast';

/**
 * Service responsible for managing toasts
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /**
   * Visibility of a toast in milliseconds
   * @private
   */
  private readonly delay = 5000;
  /**
   * List of all currently visible toasts
   */
  toasts: Toast[] = [];
  /**
   * Removes a toast
   * @param toast Toast to remove
   */
  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  /**
   * Removes all toasts
   */
  clear() {
    this.toasts = [];
  }

  /**
   * Displays a success toast (green)
   * @param text Text to show
   * @param icon Icon to show, defaults to a check icon
   */
  showSuccess(text: string, icon: IconProp = 'check-circle') {
    this.toasts.push({
      text,
      icon,
      autoHide: true,
      bg: 'success',
      delay: this.delay,
      hidden: false,
    });
  }

  /**
   * Displays a warning toast (yellow)
   * @param text Text to show
   * @param icon Icon to show, defaults to an info icon
   */
  showWarn(text: string, icon: IconProp = 'circle-info') {
    this.toasts.push({
      text,
      icon,
      autoHide: true,
      bg: 'warning',
      delay: this.delay,
      hidden: false,
    });
  }

  /**
   * Displays a danger toast (red)
   * @param text Text to show
   * @param icon Icon to show, defaults to an X mark
   */
  showDanger(text: string, icon: IconProp = 'xmark-circle') {
    this.toasts.push({
      text,
      icon,
      autoHide: true,
      bg: 'danger',
      delay: this.delay,
      hidden: false,
    });
  }
}
