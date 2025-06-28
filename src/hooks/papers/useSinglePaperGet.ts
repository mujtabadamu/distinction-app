import { PapersService, PaperView } from 'generated/index';
import useLoading from 'hooks/general/useLoading'
import { useEffect, useState } from 'react'
import { handleError } from 'utils/errorHandlers';
import { apiWrapper } from 'utils/http-client';

interface Props {
    id?: string;
}

const useSinglePaperGet = ({id}: Props) => {
    const loader = useLoading();
    const [paper, setPaper] = useState<PaperView | undefined>(undefined);

    const getPaper = async (id: string) => {
        loader.startLoading();
        try {
            const data = await apiWrapper(() => PapersService.get4({id}))
            setPaper(data);
        } catch (error) {
            handleError(error)
        }
        finally {
            loader.stopLoading()
        }
    }

    useEffect(() => {
        if (id) {
            getPaper(id);
        }
    }, [id])

  return {
    paper,
    loading: loader.loading,
  }
}

export default useSinglePaperGet