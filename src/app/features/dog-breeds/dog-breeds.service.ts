import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StateManagementService } from '../../core/services/state-management.service';
import {
  BreedEntry,
  BreedImage,
  BreedImages,
  DogBreeds,
} from './dog-breeds.model';

@Injectable({
  providedIn: 'root',
})
export class DogBreedsService {
  apiUrl = environment.apiUrl;
  state = inject(StateManagementService);
  http = inject(HttpClient);

  getAllBreeds(): void {
    this.http
      .get<DogBreeds>(`${this.apiUrl}/breeds/list/all`)
      .pipe(
        take(1),
        map((res: DogBreeds) => {
          const message = res.message;
          const result: BreedEntry[] = Object.keys(message).map((key) => [
            key.toLowerCase(),
            message[key.toLowerCase()],
          ]);
          this.state.breeds.set(result);
        }),
        catchError((err) => throwError(() => err))
      )
      .subscribe();
  }

  fetchDogImage(): void {
    let url = '';
    if (this.state.selectedSubBreed()) {
      url = `${
        this.apiUrl
      }/breed/${this.state.selectedBreed()}/${this.state.selectedSubBreed()}/images/random`;
    } else {
      url = `${this.apiUrl}/breed/${this.state.selectedBreed()}/images/random`;
    }

    this.http
      .get<BreedImage>(url)
      .pipe(
        take(1),
        map((res: BreedImage) => this.state.dogImage.set(res.message)),
        catchError((err) => throwError(() => err))
      )
      .subscribe();
  }

  getDogBreedImages(): void {
    this.http
      .get<BreedImages>(
        `${this.apiUrl}/breed/${this.state.selectedBreed()}/images`
      )
      .pipe(
        take(1),
        map((res: BreedImages) => this.state.dogImagesList.set(res.message)),
        catchError((err) => throwError(() => err))
      )
      .subscribe();
  }
}
