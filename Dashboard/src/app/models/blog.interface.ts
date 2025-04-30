export interface IBlog {
    id: number;
    title: string;
    title_ar?: string;
    description: string;
    description_ar?: string;
    petType: string; // Required for the form; maps to backend's "tag"
    petType_ar?: string; // testing this field
    //tag?: string;    // Optional property returned by the backend
    created_at: Date;
    image?: string;  // optional image property
  }
