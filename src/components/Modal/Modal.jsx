import { useEffect } from "react";
import { ModalOverlay, ModalEl } from "./Modal.styled";

const Modal = ({ image, alt, onClose }) => {
 

   const handleCloseModal = event => {
     if (event.target === event.currentTarget) {
       onClose();
     }
   };

  useEffect(() => {
      const handleKeyDown = event => {
        if (event.code === 'Escape') {
          onClose();
        }
      };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose])


  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalEl>
        <img src={image} alt={alt} />
        <button onClick={onClose}></button>
      </ModalEl>
    </ModalOverlay>
  );
};

export default Modal;