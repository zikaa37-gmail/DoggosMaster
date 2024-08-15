import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { StateManagementService } from '../../core/services/state-management.service';
import { DogBreedsService } from './dog-breeds.service';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FocusDirective } from '../../core/directives/focus.directive';

@Component({
  selector: 'app-dog-breeds',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImageGalleryComponent,
    FocusDirective,
  ],
  templateUrl: './dog-breeds.component.html',
  styleUrl: './dog-breeds.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogBreedsComponent implements OnInit {
  state = inject(StateManagementService);
  dbService = inject(DogBreedsService);
  fb = inject(FormBuilder);
  form = this.fb.group({
    searchTerm: [''],
  });
  get searchTerm(): FormControl {
    return this.form.get('searchTerm') as FormControl;
  }

  ngOnInit() {
    if (this.state.breeds().length === 0) {
      this.dbService.getAllBreeds();
    }
    this.fetchImages('affenpinscher');
  }

  setFilterValue() {
    setTimeout(() => {
      this.state.filterValue.set(this.searchTerm.value);
    }, 1000);
  }

  fetchImages(breed: string, subBreed?: string) {
    this.state.selectedBreed.set(breed);
    this.state.selectedSubBreed.set(subBreed ?? null);

    this.dbService.fetchDogImage();
    this.dbService.getDogBreedImages();
  }
}
