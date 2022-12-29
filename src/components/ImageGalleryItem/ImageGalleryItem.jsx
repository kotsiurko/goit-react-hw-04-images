import { useState } from 'react';
import {
  ImageGalleryListItem,
  ImageGalleryImg,
} from './ImageGalleryItem.styled';
import ModalWindow from '../Modal/Modal';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isVisibleModal, setVisibleModal] = useState(false);

  const showNCloseModal = () => {
    setVisibleModal(prev => !prev);
  };

  return (
    <ImageGalleryListItem>
      <ImageGalleryImg
        onClick={showNCloseModal}
        src={webformatURL}
        alt={tags}
      />
      {isVisibleModal && (
        <ModalWindow onClose={showNCloseModal} src={largeImageURL} alt={tags} />
      )}
    </ImageGalleryListItem>
  );
};
export default ImageGalleryItem;

// =================================================
// class oldImageGalleryItem extends Component {
//   state = {
//     isVisibleModal: false,
//   };

//   showNCloseModal = () => {
//     this.setState(({ isVisibleModal }) => ({
//       isVisibleModal: !isVisibleModal,
//     }));
//   };

//   render() {
//     const { webformatURL, tags, largeImageURL } = this.props;
//     return (
//       <ImageGalleryListItem>
//         <ImageGalleryImg
//           onClick={this.showNCloseModal}
//           src={webformatURL}
//           alt={tags}
//         />
//         {this.state.isVisibleModal && (
//           <ModalWindow
//             onClose={this.showNCloseModal}
//             src={largeImageURL}
//             alt={tags}
//           />
//         )}
//       </ImageGalleryListItem>
//     );
//   }
// }
