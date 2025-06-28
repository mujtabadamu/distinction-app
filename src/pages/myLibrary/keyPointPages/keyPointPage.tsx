import { EmptyState, Spacer } from '@flexisaf/flexibull2';
import BreadCrumbs from 'components/breadcrumb';
import SectionLoader from 'components/custom/sectionLoader';
import useDisclosure from 'hooks/general/useDisclosure';
import useSinglePaperGet from 'hooks/papers/useSinglePaperGet';
import { useParams } from 'react-router-dom';
import { getUrlParam } from 'utils/helpers';
import ActiveKeyPointView from '../components/activeKeyPointView';
import ShareFlashcardModal from '../modals/flashcard/ShareFlashcardModal';
import FullViewModal from '../modals/keypoints/FullViewModal';
import useKeyPoint from './hooks/useKeyPoint';
import { useEffect } from 'react';

const KeyPointPage = () => {
  const { id } = useParams();
  const paperId = getUrlParam('course');
  const handler = useDisclosure();
  const shareHandler = useDisclosure();
  const { paper } = useSinglePaperGet({ id: paperId || '' });
  const { keypoint, getKeypoint, isLoadingSingleKeyPoint } = useKeyPoint();

  useEffect(() => {
    if (id) {
      getKeypoint(id);
    }
  }, [id]);
  return (
    <>
      <Spacer space="10px" />
      <BreadCrumbs
        links={[
          { path: `/my-library`, text: 'My Library' },
          {
            path: `/my-library/keypoints/course/${paperId}`,
            text: paper?.name || '--/--',
          },
        ]}
        last={keypoint?.title || 'Keypoint title'}
      />
      {isLoadingSingleKeyPoint ? (
        <SectionLoader />
      ) : keypoint ? (
        <ActiveKeyPointView
          keypoint={keypoint}
          paper={paper}
          onOpen={handler?.onOpen}
          onClose={handler?.onClose}
          onShare={shareHandler?.onOpen}
        />
      ) : (
        <EmptyState
          title="Key point not found"
          info="This might be a network issue. Please reload the page."
          style={{ width: '100%' }}
        />
      )}

      {keypoint && (
        <FullViewModal
          isOpen={handler.isOpen}
          onClose={handler.onClose}
          onShare={shareHandler?.onOpen}
          keypoint={keypoint}
          paper={paper}
        />
      )}

      <ShareFlashcardModal
        card={keypoint}
        isOpen={shareHandler.isOpen}
        isKeypoint
        onClose={shareHandler.onClose}
      />
    </>
  );
};

export default KeyPointPage;
