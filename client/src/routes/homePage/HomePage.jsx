import { useNavigate } from 'react-router-dom';
import './homePage.scss';

function HomePage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/dashboard'); // Redirect to the dashboard
  };

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Transforming Scholarship Disbursement – Efficient, Secure, and Paperless!</h1>
          <p>
            Welcome to the PMSS Paperless Scholarship Disbursement System. Our platform is designed to streamline the scholarship application process, making it easier than ever for students to apply, get verified, and receive funds without any physical paperwork. Experience a seamless, secure, and faster way to manage your scholarship, allowing you to focus on what matters most – your academic journey.
          </p>
          <div className="buttonContainer">
            <button onClick={handleButtonClick} className="animated-button">
              <span className="button-text">🌟 New Scholarship Applications Now Open! 🌟</span>
              <span className="button-subtext">Click Here to Apply</span>
            </button>
          </div>

          {/* New Section: Facilitated by AICTE */}
          <div className="facilitatedSection">
            <img src="/aictc logo.jpg" alt="AICTE Logo" className="logo" />
            <h2>Facilitated by AICTE</h2>
          </div>

        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg1.png" alt="Scholarship Background" />
      </div>
    </div>
  );
}

export default HomePage;
