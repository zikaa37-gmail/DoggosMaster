import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { StateManagementService } from '../../core/services/state-management.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { BUTTON_TYPE } from '../button/button.model';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGalleryComponent {
  @Output() subBreedClicked = new EventEmitter<string>();
  state = inject(StateManagementService);
  selectedImage = signal<string>('');
  BUTTON_TYPE = BUTTON_TYPE;

  setSelectedImage(imageUrl: string) {
    this.selectedImage.set(imageUrl);
  }

  onSubBreedClick(subBreed: string) {
    this.state.selectedSubBreed.set(subBreed);
    this.subBreedClicked.emit(subBreed);
  }
}
