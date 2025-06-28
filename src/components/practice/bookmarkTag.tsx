import { BsFillBookmarkFill } from 'react-icons/bs';
import Theme from '../../utils/theme';

const BookmarkTag = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '-1px',
        right: '-2px',
      }}
    >
      <BsFillBookmarkFill
        color={Theme.PrimaryRed}
        style={{ borderTopRightRadius: '5px' }}
      />
    </div>
  );
};

export default BookmarkTag;
