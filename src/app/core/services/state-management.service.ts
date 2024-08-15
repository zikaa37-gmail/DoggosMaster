import { computed, Injectable, signal } from '@angular/core';
import { FilteredBreed } from '../../features/dog-breeds/dog-breeds.model';

type BreedEntry = [string, string[]];
@Injectable({
  providedIn: 'root',
})
export class StateManagementService {
  isMenuOpen = signal<boolean>(false);
  isDesktop = signal<boolean>(window.innerWidth < 1280);
  filterValue = signal<string>('');
  breeds = signal<BreedEntry[]>([]);
  dogImage = signal<string>('');
  dogImagesList = signal<string[]>([]);
  selectedBreed = signal<string>('');
  selectedSubBreed = signal<string | null>('');
  selectedSubBreedGroup = computed(
    () =>
      this.filteredBreeds().find((x) => x.key === this.selectedBreed())
        ?.values || []
  );

  filteredBreeds = computed<FilteredBreed[]>(() => {
    const searchTerm = this.filterValue().toLowerCase();

    if (searchTerm.length === 0) {
      return this.breeds().map(([key, values]: BreedEntry) => ({
        key,
        values,
      }));
    }

    return this.breeds()
      .map(([key, values]: BreedEntry) => {
        const keyContainsTerm = key.toLowerCase().includes(searchTerm);
        const filteredValues = values.filter((value: string) =>
          value.toLowerCase().includes(searchTerm)
        );

        if (keyContainsTerm || filteredValues.length > 0) {
          return {
            key,
            values: keyContainsTerm ? values : filteredValues,
          };
        }

        return null;
      })
      .filter((entry): entry is FilteredBreed => entry !== null);
  });

  constructor() {
    window.addEventListener('resize', () => {
      this.isDesktop.set(window.innerWidth < 1280);
      if (!this.isDesktop()) {
        this.closeMenu();
      }
    });
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
