import { ProviderGallaryComponent } from "../provider-gallary/provider-gallary.component";
import { providerCategory } from "./category.model";
import { Doctor } from "./doctor.model";
import { Product } from "./product.model";
import { Profile } from "./profile.model";
import { service } from "./service.model";

export interface ServiceProvider { // Renamed from Provider to ServiceProvider
    id: string;
    doctorDetails: Array<Doctor>;
    serviceDetails: Array<service>;
    profileDetails: Array<Profile>;
    categoryDetails: Array<providerCategory>;
    productDetails: Array<Product>;
    gealleryDetails: Array<ProviderGallaryComponent>;
}
