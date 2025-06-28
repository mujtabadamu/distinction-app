import {
  Box,
  EmptyState,
  Grid,
  Input,
  Spacer,
  Text,
} from '@flexisaf/flexibull2';
import BreadCrumbs from 'components/breadcrumb';
import SectionLoader from 'components/custom/sectionLoader';
import { KeypointView } from 'generated/index';
import useDisclosure from 'hooks/general/useDisclosure';
import useSinglePaperGet from 'hooks/papers/useSinglePaperGet';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks/useAppSelector';
import styled from 'styled-components';
import { returnUpdatedList } from 'utils/helpers';
import FlashCardGroup from '../components/flashCardGroup';
import DeleteFlashcardModal from '../modals/flashcard/DeleteFlashcardModal';
import RenameFlashcardModal from '../modals/flashcard/RenameFlashcardModal';
import ShareFlashcardModal from '../modals/flashcard/ShareFlashcardModal';
import useKeypointsGet from './hooks/useKeypointsGet';

const KeyPointCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentId = useAppSelector((state) => state.auth?.currentUser?.id);
  const { paper } = useSinglePaperGet({ id });
  const { keypoints, loading, searchText, setSearchText, setKeypoints } =
    useKeypointsGet({
      studentId,
      paperId: id,
    });

  const [activeCard, setActiveCard] = useState<KeypointView | undefined>(
    undefined
  );
  const shareHandler = useDisclosure();
  const deleteHandler = useDisclosure();
  const renameHandler = useDisclosure();

  const onShare = (card: KeypointView) => {
    setActiveCard(card);
    shareHandler.onOpen();
  };

  const onDelete = (card: KeypointView) => {
    setActiveCard(card);
    deleteHandler.onOpen();
  };

  const onRename = (card: KeypointView) => {
    setActiveCard(card);
    renameHandler.onOpen();
  };

  return (
    <Box className="!p-4">
      <Spacer space="20px" />
      <BreadCrumbs
        links={[{ path: `/my-library`, text: 'My Library' }]}
        last={paper?.name || ''}
      />
      <>
        <Banner>
          <Box>
            <Text block className="text-xl text-white mb-2">
              {paper?.name ?? '--/--'}
            </Text>
          </Box>
        </Banner>

        <Box className="flex items-end space-x-2">
          <Input
            spaceTop
            type="text"
            iconRight="saf-search-normal"
            placeholder="Search"
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
          />
        </Box>

        <Box margin="50px 0">
          {loading ? (
            <SectionLoader height="30vh" />
          ) : keypoints?.length ? (
            <Grid default="repeat(3, 1fr)">
              {keypoints?.map((keypoint) => (
                <FlashCardGroup
                  key={keypoint?.id}
                  isKeypoint
                  card={keypoint}
                  onClick={() =>
                    navigate(
                      `/my-library/keypoints/${keypoint.id}?course=${id}`
                    )
                  }
                  onShare={onShare}
                  onDelete={onDelete}
                  onRename={onRename}
                />
              ))}
            </Grid>
          ) : (
            <EmptyState
              title="No Key Points"
              info="Please change your search results"
              style={{ width: '100%' }}
            />
          )}
        </Box>
      </>

      <ShareFlashcardModal
        card={activeCard}
        isOpen={shareHandler.isOpen}
        isKeypoint
        onClose={() => {
          setActiveCard(undefined);
          shareHandler.onClose();
        }}
      />

      <RenameFlashcardModal
        card={activeCard}
        isKeypoint
        isOpen={renameHandler.isOpen}
        onClose={() => {
          setActiveCard(undefined);
          renameHandler.onClose();
        }}
        callback={(card) => {
          const newlist = returnUpdatedList(card, keypoints, 'id');
          setKeypoints([...newlist]);
          setActiveCard(undefined);
          renameHandler.onClose();
        }}
      />
      <DeleteFlashcardModal
        card={activeCard}
        isOpen={deleteHandler.isOpen}
        isKeypoint
        onClose={() => {
          setActiveCard(undefined);
          deleteHandler.onClose();
        }}
        callback={(id) => {
          setKeypoints((prev) => prev.filter((card) => card.id !== id));
          setActiveCard(undefined);
          deleteHandler.onClose();
        }}
      />
    </Box>
  );
};

export default KeyPointCoursePage;

const Banner = styled.div`
  border-radius: 10px;
  background: linear-gradient(to right, #304e99, #101a33);
  padding: 20px;
  padding-right: 20px;
  margin: 0 0 30px 0;
`;
