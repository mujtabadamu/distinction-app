import TagManager from 'react-gtm-module';

const useDataLayer = () => {
  
  const pushEvent = (eventName: string, eventData: object) => {
    // Push the event data to GTM dataLayer
    TagManager.dataLayer({
      dataLayer:{
        event: eventName,
        ...eventData
      }
    });
  };
  
  return {pushEvent};
};

export default useDataLayer;
