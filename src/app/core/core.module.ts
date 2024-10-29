import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CropPipe } from './pipe/crop.pipe';
import { FilenamePipe } from './pipe/file-name.pipe';
import { EvalNamePipe } from './pipe/eval-name.pipe';
import { EvalDescriptionPipe } from './pipe/eval-description.pipe';
import { EvalViablePipe } from './pipe/eval-viable.pipe';

@NgModule({
  declarations: [
    CropPipe,
    FilenamePipe,
    EvalNamePipe,
    EvalDescriptionPipe,
    EvalViablePipe,
  ],
  exports: [
    CropPipe,
    FilenamePipe,
    EvalNamePipe,
    EvalDescriptionPipe,
    EvalViablePipe,
  ],
  imports: [CommonModule],
})
export class CoreModule {}
