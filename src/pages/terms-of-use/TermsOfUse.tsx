import styled from 'styled-components';

const TermsOfUse = () => {
  return (
    <Container>
      <DocumentSection>
        <TermsOfUseIframe src="https://docs.google.com/document/d/e/2PACX-1vRTfRq3EhA6WVC2OQPcAppSksu1R489an0RXI-vp1MJJOt8nda7ufyvjkMTKcseiQRwOLKOHoTH8Y0v/pub?embedded=true" />
      </DocumentSection>
    </Container>
  );
};

export default TermsOfUse;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
`;

const DocumentSection = styled.section`
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 100vh;
  overflow: hidden;
`;

const TermsOfUseIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
`;
