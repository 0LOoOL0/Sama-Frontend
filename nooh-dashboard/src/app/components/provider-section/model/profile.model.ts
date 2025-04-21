export interface Profile {
    providerNameEN: string;
    providerNameAR: string;
    startDate: string;
    endDate: string;
    crNumber: number;
    contactNumber: string;
    email: string;
    website: string;
    instagram: string;
    address: {
      office: string;
      road: string;
      block: string;
      city: string;
    };
    availabilityDays: string[];
    availabilityHours: {
      start: string;
      end: string;
    };
    authorizedPerson: {
      name: string;
      position: string;
      contactNumber: string;
      email: string;
    };
  }
  