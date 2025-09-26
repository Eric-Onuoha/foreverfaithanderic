import "./galleryPreview.styles.scss";

const GalleryPreview = ({images}) => {
    return(
    <div id="galleryComponent">
        <h4>Announcement Photos</h4>
        <div id="gallery">
            {images.map((src, i) => (
            <img key={i} src={src} alt={`Gallery ${i}`} />
            ))}
        </div>
    </div>
    )
};
export default GalleryPreview;