import { useState ,useCallback} from "react";

import { ImageGalleryList } from "./ImageGallery.styled";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import  Modal  from "components/Modal/Modal";

const ImageGallery = ({images}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = image => {
    setSelectedImage(image);
  };

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

   return (
      <div>
        <ImageGalleryList className="ImageGallery">
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onImageClick={openModal}
            />
          ))}
        </ImageGalleryList>
        {selectedImage && (
          <Modal
            image={selectedImage.largeImageURL}
            alt={selectedImage.tag}
            onClose={closeModal}
          />
        )}
      </div>
    );
}

export default ImageGallery;
