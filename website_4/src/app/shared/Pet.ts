// Pet.ts
export type Breed = { value: string; label: string };

export interface AllBreeds {
  dog: Breed[];
  cat: Breed[];
  bird: Breed[];
  hamster: Breed[];
  horse: Breed[];
  other: Breed[];
}

export const allBreeds: AllBreeds = {
  dog: [
    { value: 'Labrador Retriever', label: 'Labrador Retriever' },
    { value: 'German Shepherd', label: 'German Shepherd' },
    { value: 'Golden Retriever', label: 'Golden Retriever' },
    { value: 'French Bulldog', label: 'French Bulldog' },
    { value: 'Bulldog', label: 'Bulldog' },
    { value: 'Beagle', label: 'Beagle' },
    { value: 'other', label: 'Other' },
  ],
  cat: [
    { value: 'Siamese', label: 'Siamese' },
    { value: 'Persian', label: 'Persian' },
    { value: 'Maine Coon', label: 'Maine Coon' },
    { value: 'Ragdoll', label: 'Ragdoll' },
    { value: 'other', label: 'Other' },
  ],
  bird: [
    { value: 'Parrot', label: 'Parrot' },
    { value: 'Canary', label: 'Canary' },
    { value: 'Sparrow', label: 'Sparrow' },
    { value: 'Finch', label: 'Finch' },
    { value: 'other', label: 'Other' },
  ],
  hamster: [
    { value: 'Syrian', label: 'Syrian' },
    { value: 'Dwarf', label: 'Dwarf' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Roborovski', label: 'Roborovski' },
    { value: 'other', label: 'Other' },
  ],
  horse: [
    { value: 'Arabian', label: 'Arabian' },
    { value: 'Thoroughbred', label: 'Thoroughbred' },
    { value: 'Quarter Horse', label: 'Quarter Horse' },
    { value: 'Paint', label: 'Paint' },
    { value: 'other', label: 'Other' },
  ],
  other: [{ value: 'other', label: 'Other' }],
};

export type PetType = { value: string; label: string };

export const petType: PetType[] = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'bird', label: 'Bird' },
  { value: 'hamster', label: 'Hamster' },
  { value: 'horse', label: 'Horse' },
  { value: 'other', label: 'Other' },
];
