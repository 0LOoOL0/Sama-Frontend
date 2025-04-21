export interface Pet{
        id: number;
        name: string;
        age: string;
        gender: string;
        image: string;
        created_at: string;
        height: string;
        pet_type: string;
        breed: string;
        color: string;
        is_vaccinated: string;
        is_microchipped: string;
        is_neutered: string;
        is_lost: number;
        price: string;
        allow_selling: number;
        allow_adoption: string | null;
        pet_owner_id: number;
        description: string;
      
      
    getPet(): unknown;

}