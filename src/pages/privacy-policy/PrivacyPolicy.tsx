import styled from 'styled-components';

const PrivacyPolicy = () => {
  return (
    <Container>
      <DocumentSection>
        <PolicyIframe src="https://docs.google.com/document/d/e/2PACX-1vRgBe93wuUHpCeFc1nofP3VNNWjaxQb4HbYz8Gr91rB5ikhzS5M3L8KNM1HlskvYoxTj_vR-doaZD05/pub?embedded=true" />
      </DocumentSection>
    </Container>
  );
};

export default PrivacyPolicy;

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

const PolicyIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
`;
