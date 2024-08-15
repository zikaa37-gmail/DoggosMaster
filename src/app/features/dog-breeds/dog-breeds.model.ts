export interface BreedCategory {
  [key: string]: string[];
}

export interface DogBreeds {
  message: BreedCategory;
  status: string;
}

export interface BreedImage {
  message: string;
  status: string;
}

export interface BreedImages {
  message: string[];
  status: string;
}

export type BreedEntry = [string, string[]];
export type FilteredBreed = { key: string; values: string[] };
