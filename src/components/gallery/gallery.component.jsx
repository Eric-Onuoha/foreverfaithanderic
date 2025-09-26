import GalleryPreview from "./galleryPreview/galleryPreview.component";

import glr1 from "../../assets/images/AnnouncementPhotos/DSC09742.jpg";
import glr2 from "../../assets/images/AnnouncementPhotos/DSC09807.jpg";
import glr3 from "../../assets/images/AnnouncementPhotos/IMG_6491.jpg";
import glr4 from "../../assets/images/AnnouncementPhotos/IMG_6515.jpg";
import glr5 from "../../assets/images/AnnouncementPhotos/IMG_6521.jpg";
import glr6 from "../../assets/images/AnnouncementPhotos/IMG_6591.jpg";
import glr7 from "../../assets/images/AnnouncementPhotos/IMG_6711.jpg";
import glr8 from "../../assets/images/AnnouncementPhotos/IMG_6721.jpg";
import glr9 from "../../assets/images/AnnouncementPhotos/IMG_6723.jpg";
import glr10 from "../../assets/images/AnnouncementPhotos/IMG_6726.jpg";
import glr11 from "../../assets/images/AnnouncementPhotos/IMG_6732.jpg";
import glr12 from "../../assets/images/AnnouncementPhotos/IMG_6734.jpg";


const Gallery = () => {
    const images = [glr1,glr2,glr3,glr4,glr5,glr6,glr7,glr8,glr9,glr10,glr11,glr12];

    return(
        <GalleryPreview images={images}></GalleryPreview>
    )
};
export default Gallery;