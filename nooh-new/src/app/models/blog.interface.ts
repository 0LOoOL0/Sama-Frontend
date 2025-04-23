export interface IBlog {
    id: number;
    title: string;
    description: string;
    petType: string; // Required for the form; maps to backend's "tag"
    tag?: string;    // Optional property returned by the backend
    created_at: Date;
    image?: string;  // optional image property
  }
  