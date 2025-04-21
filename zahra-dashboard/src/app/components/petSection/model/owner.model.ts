export interface PetOwner {
    id: string;
    first_name: string;
    last_name: string;
    created_at: string;
    email: string;
    phone: string;
    nationality: string;           
    profile_image: string;          
    location: string;            
    city: string;                 
    gender: string;                 
    date_of_birth: string;          
    house: string;                 
    road: string;                 
    block: string;                  
    building_name: string;          
    apt_number: string;           
    floor: string;                 
    company: string;                
    status: string; 
      getPetOwners(): unknown;
  }
  