import {
  Box,
  EmptyState,
  Grid,
  Input,
  Select,
  Spacer,
  Text,
} from '@flexisaf/flexibull2';
import BreadCrumbs from 'components/breadcrumb';
import { SelectOption } from 'components/custom/AsyncSelect';
import SectionLoader from 'components/custom/sectionLoader';
import { FlashcardView } from 'generated/index';
import useDisclosure from 'hooks/general/useDisclosure';
import useSinglePaperGet from 'hooks/papers/useSinglePaperGet';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useAppSelector } from 'redux/hooks/useAppSelector';
import styled from 'styled-components';
import { DifficultyModes, DifficultyType } from 'utils/constants';
import { returnUpdatedList } from 'utils/helpers';
import FlashCardGroup from '../components/flashCardGroup';
import DeleteFlashcardModal from '../modals/flashcard/DeleteFlashcardModal';
import RenameFlashcardModal from '../modals/flashcard/RenameFlashcardModal';
import ShareFlashcardModal from '../modals/flashcard/ShareFlashcardModal';
import useFlashcardsGet from './hooks/useFlashcardsGet';
import { useAuthSlice } from 'pages/auth/authSlice';

const FlashCardCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;
  const { paper } = useSinglePaperGet({ id });

  const [difficulty, setDifficulty] = useState<SelectOption | null>(null);
  const { flashcards, loading, searchText, setSearchText, setFlashcards } =
    useFlashcardsGet({
      studentId: user?.id || '',
      paperId: id,
      difficulty: difficulty?.value as DifficultyType,
    });

  const [activeCard, setActiveCard] = useState<FlashcardView | undefined>(
    undefined
  );
  const shareHandler = useDisclosure();
  const deleteHandler = useDisclosure();
  const renameHandler = useDisclosure();

  const onShare = (card: FlashcardView) => {
    setActiveCard(card);
    shareHandler.onOpen();
  };

  const onDelete = (card: FlashcardView) => {
    setActiveCard(card);
    deleteHandler.onOpen();
  };

  const onRename = (card: FlashcardView) => {
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
          <Select
            label="Filter Cards"
            value={difficulty}
            onChange={setDifficulty}
            options={DifficultyModes.map((item) => ({
              label: item,
              value: item,
            }))}
          />
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
          ) : flashcards?.length ? (
            <Grid default="repeat(3, 1fr)">
              {flashcards?.map((flashcard) => (
                <FlashCardGroup
                  key={flashcard?.id}
                  card={flashcard}
                  onClick={() =>
                    navigate(
                      `/my-library/flashcard/${flashcard.id}?course=${id}`
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
              title="No flashcard"
              info="Please change your search results"
              style={{ width: '100%' }}
            />
          )}
        </Box>
      </>

      <ShareFlashcardModal
        card={activeCard}
        isOpen={shareHandler.isOpen}
        onClose={() => {
          setActiveCard(undefined);
          shareHandler.onClose();
        }}
      />

      <RenameFlashcardModal
        card={activeCard}
        isOpen={renameHandler.isOpen}
        onClose={() => {
          setActiveCard(undefined);
          renameHandler.onClose();
        }}
        callback={(card) => {
          const newlist = returnUpdatedList(card, flashcards, 'id');
          setFlashcards([...newlist]);
          setActiveCard(undefined);
          renameHandler.onClose();
        }}
      />
      <DeleteFlashcardModal
        card={activeCard}
        isOpen={deleteHandler.isOpen}
        onClose={() => {
          setActiveCard(undefined);
          deleteHandler.onClose();
        }}
        callback={(id) => {
          setFlashcards((prev) => prev.filter((card) => card.id !== id));
          setActiveCard(undefined);
          deleteHandler.onClose();
        }}
      />
    </Box>
  );
};

export default FlashCardCoursePage;

const Banner = styled.div`
  border-radius: 10px;
  background: linear-gradient(to right, #304e99, #101a33);
  padding: 20px;
  padding-right: 20px;
  margin: 0 0 30px 0;
`;
