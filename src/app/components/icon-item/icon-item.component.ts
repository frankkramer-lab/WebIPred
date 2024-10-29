import { Component, Input, TemplateRef } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * Component to render an icon next to some text
 */
@Component({
  selector: 'app-icon-item',
  templateUrl: './icon-item.component.html',
  styleUrls: ['./icon-item.component.scss'],
})
export class IconItemComponent {
  /**
   * Name of the icon to display
   */
  @Input() fontIcon: IconProp = 'info';
  /**
   * Text to display next to the icon
   */
  @Input() content!: TemplateRef<any>;
}
