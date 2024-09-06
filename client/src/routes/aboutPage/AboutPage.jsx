import "./aboutPage.scss";

function AboutPage() {
  return (
    <div className="about-page">
      <header>
        <h1>About Us</h1>
        <p>Discover who we are, what we do, and why we're passionate about it.</p>
      </header>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>Our mission is to innovate and provide solutions that make a real difference. We are committed to excellence and driven by a desire to impact lives positively.</p>
      </section>

      <section className="vision">
        <h2>Our Vision</h2>
        <p>We envision a future where our solutions are at the forefront of technology and innovation, creating a world where everyone benefits from our efforts.</p>
      </section>

      <section className="values">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Innovation:</strong> We constantly strive to bring new and effective solutions.</li>
          <li><strong>Integrity:</strong> We maintain the highest standards of honesty and transparency.</li>
          <li><strong>Customer Focus:</strong> We prioritize the needs and satisfaction of our customers.</li>
        </ul>
      </section>

      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-member">
          <img src="team-member1.jpg" alt="Team Member 1" />
          <h3>Jane Doe</h3>
          <p>Co-Founder & CEO</p>
          <p>Jane brings a wealth of experience in the industry and is passionate about creating solutions that make a difference.</p>
        </div>
        <div className="team-member">
          <img src="team-member2.jpg" alt="Team Member 2" />
          <h3>John Smith</h3>
          <p>Chief Technology Officer</p>
          <p>John leads our technology team with a vision for cutting-edge innovation and exceptional quality.</p>
        </div>
        {/* Add more team members as needed */}
      </section>

      <section className="our-story">
        <h2>Our Story</h2>
        <p>Our journey began with a simple idea and a passion to make a difference. Since then, we've grown and evolved, overcoming challenges and achieving milestones that define our success today.</p>
      </section>

      <section className="impact">
        <h2>Our Impact</h2>
        <p>We are proud of the positive impact we’ve made through our work. From helping clients achieve their goals to receiving industry recognition, our achievements reflect our commitment to excellence.</p>
      </section>

      <section className="get-involved">
        <h2>Get Involved</h2>
        <p>Want to stay updated with our latest news and updates? Follow us on social media, subscribe to our newsletter, or get in touch to learn more about our work and how you can be a part of it.</p>
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or would like to learn more about what we do, feel free to reach out to us!</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: support@example.com</p>
      </section>
    </div>
  );
}

export default AboutPage;
