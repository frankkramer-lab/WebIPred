import { NgModule } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faAsterisk,
  faBookmark,
  faCheckCircle,
  faChevronCircleDown,
  faChevronCircleRight,
  faClockRotateLeft,
  faComments,
  faFileArrowDown,
  faFlagCheckered,
  faGears,
  faHome,
  faImage,
  faInfoCircle, faList,
  faPlus, faSquarePlus,
  faWandMagicSparkles,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({})
export class IconsModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faHome,
      faImage,
      faWandMagicSparkles,
      faClockRotateLeft,
      faBookmark,
      faGears,
      faPlus,
      faAsterisk,
      faFlagCheckered,
      faInfoCircle,
      faCheckCircle,
      faXmarkCircle,
      faChevronCircleDown,
      faChevronCircleRight,
      faFileArrowDown,
      faComments,
      faList,
      faSquarePlus
    );
  }
}
