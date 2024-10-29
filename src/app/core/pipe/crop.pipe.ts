import { Pipe, PipeTransform } from '@angular/core';

/**
 * Crops a string to the specified length and appends three dots
 */
@Pipe({ name: 'crop' })
export class CropPipe implements PipeTransform {
  /**
   * Applying the crop pipe, requires the original value and the target length
   * @param value Original string
   * @param length Number of characters to crop the string to
   */
  transform(value: string, length: number): string {
    if (value.length > length) {
      return `${value.substring(0, length)} ...`;
    }
    return value;
  }
}
