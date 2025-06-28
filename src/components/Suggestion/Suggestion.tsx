import styled from "styled-components"
import { Spacer } from '@flexisaf/flexibull2';

interface ModalData {
    icon: string;
    topic: string;
    link: string;
  }

  interface SuggestionProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setModal: (modal: any) => void; 
    modal: { open: boolean; data: ModalData | null;
    }; 
    data: ModalData[];
  }
  
  function Suggestion({setModal, modal, data}: SuggestionProps) {
  return (
    <div>
       <SuggestionContainer style={{ position: 'relative'}}>
                    <Spacer  space="20px"/>
                    <span>Suggestions</span>
                    <Spacer  space="20px"/>
                    <div className='cards'>
                        {data?.map((item: ModalData)=>{
                          return <>
                          <SuggestionCard onClick={()=>setModal({...modal,open:true, data:item})} className='card'>
                          <div className='icon'>{item.icon}</div>
                          <div className='info'> 
                            <p>{item.topic}</p>
                            <a>{item.link}</a>
                          </div>
                        </SuggestionCard>
                          </>
                        })}
                      </div>      
          </SuggestionContainer>
    </div>
  )
}

export default Suggestion

export const SuggestionContainer = styled.div`
    span{
      font-size: 12px;
      font-weight: 500;
      line-height: 15px;
      letter-spacing: 0em;
      text-align: left;
    }
  .cards{
      display: flex;
      flex-direction: row;
      align-items: center;
      max-width: 100%;
      height: 50px;
      flex-wrap: nowrap;
      overflow-x: scroll;
      gap: 10px;
      -ms-overflow-style: none;
      div{
        width: 170px;
       }
    &::-webkit-scrollbar {
    display: none;
    }
    }

`

export const SuggestionCard = styled.div`
  background:#fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 8px 10px;
  gap: 10px;
  border-radius:10px !important;
  cursor: pointer;

  
  .icon{
    background: coral;
    flex-basis:50px;
    padding: 7px 10px 7px 10px;
    border-radius: 5px;
    gap: 5px;
    text-align: center;
  }
  .info{
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0px;
    text-align: left;
  }
  .info a{
    color:#1D4ED8;
    font-size: smaller;
  }
`
