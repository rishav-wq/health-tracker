import "./aboutPage.scss";

function AboutPage() {
  return (
    <div className="about-page">
      <header>
        <h1>About Us</h1>
        <p>Learn more about our mission to support your health journey.</p>
      </header>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>Our mission is to empower individuals to take charge of their health through innovative tracking solutions. We are dedicated to improving health outcomes and promoting well-being.</p>
      </section>

      <section className="vision">
        <h2>Our Vision</h2>
        <p>We envision a healthier world where everyone has access to the tools and information they need to maintain their health and well-being.</p>
      </section>

      <section className="values">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Empowerment:</strong> We strive to empower users with the knowledge and tools to manage their health.</li>
          <li><strong>Integrity:</strong> We maintain the highest standards of honesty and transparency in our operations.</li>
          <li><strong>User-Centric:</strong> We prioritize the needs and experiences of our users in everything we do.</li>
        </ul>
      </section>

      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-member">
          <img src="team-member1.jpg" alt="Team Member 1" />
          <h3>Jane Doe</h3>
          <p>Co-Founder & CEO</p>
          <p>Jane is passionate about leveraging technology to improve health management and enhance user experiences.</p>
        </div>
        <div className="team-member">
          <img src="team-member2.jpg" alt="Team Member 2" />
          <h3>John Smith</h3>
          <p>Chief Technology Officer</p>
          <p>John leads our tech team in creating cutting-edge solutions that prioritize user health and data security.</p>
        </div>
        {/* Add more team members as needed */}
      </section>

      <section className="our-story">
        <h2>Our Story</h2>
        <p>Our journey began with a vision to revolutionize health tracking. Through dedication and innovation, we have developed solutions that are transforming health management for individuals everywhere.</p>
      </section>

      <section className="impact">
        <h2>Our Impact</h2>
        <p>We take pride in the positive changes we've facilitated in our users' lives. Our achievements reflect our commitment to enhancing health outcomes and fostering a supportive community.</p>
      </section>

      <section className="get-involved">
        <h2>Get Involved</h2>
        <p>Stay connected with us! Follow our journey on social media, subscribe to our newsletter, or contact us to learn more about how you can contribute to our mission.</p>
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or want to learn more about our services, feel free to reach out!</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: support@healthtrackingapp.com</p>
      </section>
    </div>
  );
}

export default AboutPage;
