import { useDispatch, useSelector } from 'react-redux';
import { createPaperRatingStart } from '../../redux/papers/reducer';
import { selectIsCreatingPaperRating } from '../../redux/papers/selectors';
import { PostPaperRatingPayload } from '../../redux/papers/typings';


const useCreatePaperRating = () => {
    const dispatch = useDispatch();
    const isCreating = useSelector(selectIsCreatingPaperRating);


    const createPaperRating = (data: PostPaperRatingPayload) => {
        dispatch(createPaperRatingStart(data));
    };


    return {
        createPaperRating,
        isCreatingPaperRating: isCreating,
    };
};

export default useCreatePaperRating;
