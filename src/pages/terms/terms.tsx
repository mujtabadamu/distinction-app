import styled from 'styled-components';
import Footer from 'components/landing/footer.components';

function Terms() {
  return (
    <>
      <Container>
        <div className="container">
          <h1>Distinction Terms of Use and Copyright Policy</h1>
          <p>
            Welcome to Distinction, an AI-powered learning platform created by
            FlexiSAF Edusoft, designed to enhance the educational experience by
            offering personalized learning tools. By accessing or using the
            Distinction platform, you agree to be bound by the terms outlined in
            this document.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing the Distinction platform, you acknowledge that you have
            read, understood, and agree to be bound by these Terms of Use and
            Copyright Policy. If you do not agree, please discontinue the use of
            the platform.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            All content on the Distinction platform, including but not limited
            to text, questions, quizzes, flashcards, audio, video, software,
            graphics, logos, and other materials (collectively referred to as
            "Content"), is the intellectual property of FlexiSAF Edusoft or its
            content partners and is protected under applicable intellectual
            property laws.
          </p>
          <ul>
            <li>
              <strong>Content Ownership:</strong> FlexiSAF owns all rights to
              the platform and Content, except where ownership is explicitly
              stated otherwise.
            </li>
            <li>
              <strong>User Access:</strong> Users are granted a limited,
              non-exclusive, and non-transferable license to access and use the
              platform’s Content for personal, non-commercial educational
              purposes only.
            </li>
            <li>
              <strong>Prohibited Use:</strong> Users are prohibited from
              reproducing, distributing, modifying, displaying, or using the
              Content for any commercial purpose without prior written
              permission from FlexiSAF.
            </li>
          </ul>

          <h2>3. User-Generated Content</h2>
          <p>
            Distinction allows users (students, lecturers, or administrators) to
            upload and generate content.
          </p>
          <ul>
            <li>
              <strong>Ownership of User Content:</strong> Users retain ownership
              of the content they upload or generate on the platform. However,
              by uploading content, you grant FlexiSAF a worldwide,
              non-exclusive, royalty-free license to use, reproduce, modify,
              distribute, and display the content on the platform.
            </li>
            <li>
              <strong>Content Approval:</strong> All User-Generated Content must
              undergo approval by platform administrators before being made
              visible to other users. FlexiSAF reserves the right to review,
              edit, or remove any user-generated content deemed inappropriate,
              illegal, or in violation of these Terms.
            </li>
          </ul>

          <h2>4. Copyright Infringement</h2>
          <p>
            FlexiSAF respects the intellectual property rights of others and
            expects users to do the same. If you believe that any content on the
            platform violates your intellectual property rights, please notify
            us immediately by providing:
          </p>
          <ul>
            <li>
              A description of the copyrighted work you claim is infringed.
            </li>
            <li>
              A description of where the alleged infringing material is located
              on the platform.
            </li>
            <li>
              Your contact information (email, address, and phone number).
            </li>
            <li>
              A statement that you have a good faith belief that the material is
              not authorized by the copyright owner or law.
            </li>
            <li>
              A statement under penalty of perjury that you are authorized to
              act on behalf of the copyright owner.
            </li>
          </ul>
          <p>
            Upon receipt of such a notice, FlexiSAF will promptly investigate
            the issue and, if necessary, remove or disable access to the
            infringing content.
          </p>

          <h2>5. Prohibited Activities</h2>
          <p>While using the platform, users must not:</p>
          <ul>
            <li>
              Engage in any activity that violates any applicable law or
              regulation.
            </li>
            <li>
              Upload, post, or share any material that infringes the rights of
              any third party, including copyrights, trademarks, and other
              intellectual property rights.
            </li>
            <li>
              Use the platform to distribute viruses, malware, or any harmful
              software.
            </li>
            <li>
              Attempt to gain unauthorized access to the platform, user
              accounts, or related systems.
            </li>
          </ul>

          <h2>6. Fair Use and Educational Purposes</h2>
          <p>
            The platform’s content is intended for fair use for educational
            purposes. Users may access content solely for personal,
            non-commercial educational activities. Any use outside of this scope
            must be approved in writing by FlexiSAF Edusoft.
          </p>

          <h2>7. Responsibility for Uploaded Content</h2>
          <p>
            Users who upload content onto the platform (lecturers,
            administrators, students) are solely responsible for ensuring that
            the material complies with copyright laws and does not infringe on
            the intellectual property rights of third parties. FlexiSAF will not
            be held liable for any legal issues arising from user-uploaded
            content.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            FlexiSAF Edusoft shall not be held liable for any direct, indirect,
            incidental, special, or consequential damages arising out of:
          </p>
          <ul>
            <li>Any loss or corruption of user data.</li>
            <li>Unauthorized access to or use of our secure servers.</li>
            <li>
              The inability to access or use the platform due to technical or
              operational issues.
            </li>
          </ul>
          <p>
            The platform is provided "as is" without any warranties of any kind,
            either express or implied, including but not limited to implied
            warranties of fitness for a particular purpose.
          </p>

          <h2>9. Privacy and Data Protection</h2>
          <p>
            FlexiSAF Edusoft values user privacy and ensures compliance with
            applicable data protection regulations, including the Nigeria Data
            Protection Regulation (NDPR). Personal data collected on the
            platform will be used strictly for operational purposes. For more
            details, please refer to our Privacy Policy.
          </p>

          <h2>10. Termination of Access</h2>
          <p>
            FlexiSAF reserves the right to terminate or suspend any user’s
            access to the platform, without prior notice, if they are found to
            violate these Terms of Use, engage in unlawful activities, or
            infringe on intellectual property rights.
          </p>

          <h2>11. Dispute Resolution</h2>
          <p>
            In the event of any dispute arising from the use of the platform or
            its content, users agree to resolve disputes through good faith
            negotiations. Should this fail, disputes will be subject to
            arbitration according to the laws of Nigeria.
          </p>

          <h2>12. Changes to the Terms</h2>
          <p>
            FlexiSAF reserves the right to modify these Terms of Use at any
            time. Changes will be effective once posted on the platform.
            Continued use of the platform following any changes constitutes
            acceptance of the updated Terms.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions or concerns regarding these Terms, please
            contact us at{' '}
            <a href="mailto:distinction@flexisaf.com">
              distinction@flexisaf.com
            </a>
            .
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Terms;

const Container = styled.div`
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 24px;
    color: #333;
    background: #0056b3;
    padding: 2rem;
    color: #fff;
    text-align: center;
  }

  h2 {
    font-size: 20px;
    color: #0056b3;
    margin-top: 20px;
  }

  p {
    color: #555;
  }

  ul {
    margin: 10px 0 20px 20px;
  }

  a {
    color: #0056b3;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
