import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { BookMarkWrapper } from '../../styles/practice/practice.styles';
import Theme from '../../utils/theme';

interface Props {
  bookmarked: boolean;
  onChange: () => void;
}
const BookmarkQuestion = ({ bookmarked, onChange }: Props) => {
  return (
    <BookMarkWrapper onClick={onChange}>
      {bookmarked ? (
        <BsFillBookmarkFill size="24px" color={Theme.PrimaryRed} />
      ) : (
        <BsBookmark size="24px" />
      )}
    </BookMarkWrapper>
  );
};

export default BookmarkQuestion;
