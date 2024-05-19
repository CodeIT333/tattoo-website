import { Image } from "./Image";

export interface ArtistUser {
    //id: string;
    email: string;
    //username: string;
    name: string;
    roles: string;
    profile_image_url?: string;
    images: Image[];
}
