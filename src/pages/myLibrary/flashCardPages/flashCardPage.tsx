import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spacer, EmptyState } from '@flexisaf/flexibull2';
import ActiveFlashCardView from '../components/activeFlashCardView';
import BreadCrumbs from 'components/breadcrumb';
import useSinglePaperGet from 'hooks/papers/useSinglePaperGet';
import { getUrlParam } from 'utils/helpers';
import useFlashCard from './hooks/useFlashCard';
import SectionLoader from 'components/custom/sectionLoader';

const FlashCardPage = () => {
  const { id } = useParams();
  const paperId = getUrlParam('course');
  const { paper } = useSinglePaperGet({ id: paperId || '' });
  const { flashcard, isLoadingSingleFlashCard, getFlashcard } = useFlashCard();

  useEffect(() => {
    if (id) {
      getFlashcard(id);
    }
  }, [id]);

  return (
    <>
      <Spacer space="20px" />
      <BreadCrumbs
        links={[
          { path: `/my-library`, text: 'My Library' },
          {
            path: `/my-library/flashcard/course/${paperId}`,
            text: paper?.name || '--/--',
          },
        ]}
        last={flashcard?.title || ''}
      />
      {isLoadingSingleFlashCard ? (
        <SectionLoader />
      ) : flashcard ? (
        <ActiveFlashCardView flashcard={flashcard} />
      ) : (
        <EmptyState
          title="Flashcard not found"
          info="This might be a network issue. Please reload the page."
          style={{ width: '100%' }}
        />
      )}
    </>
  );
};

export default FlashCardPage;
