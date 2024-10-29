import { Pipe, PipeTransform } from '@angular/core';

/**
 * Lists the names of files
 */
@Pipe({ name: 'filename' })
export class FilenamePipe implements PipeTransform {
  /**
   * Number of files to list maximally
   * @private
   */
  private readonly maxFilesToDisplay = 5;

  /**
   * Extracts a file's name from the full path
   * @param filepath Full file path
   * @private
   */
  private getFileName(filepath: string) {
    const parts = filepath.split('\\');
    return parts[parts.length - 1];
  }

  /**
   * Applying the filename path requires a list of file paths
   * @param files List of file paths
   */
  transform(files: FileList | null): string {
    if (!files) return '';
    const labelParts: string[] = [];

    for (let i = 0; i < files.length && i < this.maxFilesToDisplay; i++) {
      labelParts.push(this.getFileName(files[i].name));
    }

    return `${labelParts.join(', ')} ${
      files.length > this.maxFilesToDisplay ? '... ' : ''
    }(${files.length} ${files.length === 1 ? 'image' : 'images'})`;
  }
}
