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

// class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleCloseModal = event => {
//     if (event.target === event.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { image, alt, onClose } = this.props;

//     return (
//       <ModalOverlay onClick={this.handleCloseModal}>
//         <ModalEl>
//           <img src={image} alt={alt} />
//           <button onClick={onClose}></button>
//         </ModalEl>
//       </ModalOverlay>
//     );
//   }
// };

export default Modal;