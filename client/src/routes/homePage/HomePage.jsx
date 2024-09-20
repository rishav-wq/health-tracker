import { useNavigate } from 'react-router-dom';
import './homePage.scss';

function HomePage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/'); // Redirect to the dashboard
  };

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Track Your Health – Simple, Intuitive, and Efficient!</h1>
          <p>
            Welcome to the Health Tracking App. Our platform is designed to help you log and monitor your daily health metrics, including body temperature, blood pressure, and heart rate. Experience an easy and effective way to stay on top of your health, enabling you to focus on what truly matters – your well-being.
          </p>
          <div className="buttonContainer">
            <button onClick={handleButtonClick} className="animated-button">
              <span className="button-text">📊 Start Tracking Your Health Today! 📊</span>
              <span className="button-subtext">Go And Access Your Dashboard Now</span>
            </button>
          </div>

          {/* New Section: Empowering Your Health Journey */}
          <div className="facilitatedSection">
            <img src="/health-logo.png" alt="Health Logo" className="logo" />
            <h2>Empowering Your Health Journey</h2>
          </div>

        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg2.png" alt="Health Tracking Background" />
      </div>
    </div>
  );
}

export default HomePage;
