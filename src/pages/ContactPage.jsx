
import { useState } from "react";
import { Link } from "react-router";
import { validateField } from "../utils/validators";

function ContactPage() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateContactField = (name, value) => {
    if (name === "message") {
      if (!value.trim()) return "Message is required.";
      if (value.trim().length < 10) {
        return "Message must contain at least 10 characters.";
      }
      return "";
    }

    return validateField(name, value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((previous) => ({
      ...previous,
      [name]: value
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: validateContactField(name, value)
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: validateContactField("fullName", values.fullName),
      email: validateContactField("email", values.email),
      message: validateContactField("message", values.message)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    setSubmitted(true);

    setValues({
      fullName: "",
      email: "",
      message: ""
    });
  };

  return (
    <main className="premium-contact-page">

      <section className="contact-hero">
        <span>CEYLON STYLE / GET IN TOUCH</span>
        <h1>Let's <strong>Connect.</strong></h1>
        <p>We are here to help you with your shopping experience.</p>
      </section>

      <section className="contact-container">

        <div className="contact-heading">
          <span>CONTACT OUR TEAM</span>
          <h2>We'd Love To Hear From You</h2>
          <p>Have a question? Send us a message.</p>
        </div>

        <div className="contact-layout">

          <form className="contact-form-card" onSubmit={handleSubmit}>
            <h3>Send Us A Message</h3>

            {submitted && (
              <div className="contact-success" role="status">
                Thank you! Your message has been submitted successfully.
              </div>
            )}

            <div className="contact-field">
              <label htmlFor="contact-name">Full Name</label>
              <input
                id="contact-name"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby="contact-name-error"
              />
              <small id="contact-name-error" className="contact-error">
                {errors.fullName}
              </small>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby="contact-email-error"
              />
              <small id="contact-email-error" className="contact-error">
                {errors.email}
              </small>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                value={values.message}
                onChange={handleChange}
                placeholder="Write your message (minimum 10 characters)"
                aria-invalid={Boolean(errors.message)}
                aria-describedby="contact-message-error"
              />
              <small id="contact-message-error" className="contact-error">
                {errors.message}
              </small>
            </div>

            <button type="submit" className="contact-submit-button">
              SEND MESSAGE →
            </button>
          </form>

          <aside className="contact-info-card">
            <span className="contact-info-label">CEYLON STYLE</span>
            <h3>Contact Information</h3>
            <p>Reach out to us using the details below.</p>

            <div className="contact-info-item">
              <span>⌖</span>
              <div>
                <strong>Our Address</strong>
                <p>Pulloly Northeast, Point Pedro, Jaffna, Sri Lanka</p>
              </div>
            </div>

            <div className="contact-info-item">
              <span>☎</span>
              <div>
                <strong>Phone Number</strong>
                <a href="tel:+94775637442">+94 775 637 442</a>
              </div>
            </div>

            <div className="contact-info-item">
              <span>✉</span>
              <div>
                <strong>Email Address</strong>
                <a href="mailto:Raveendranrajthanan@gmail.com">
                  Raveendranrajthanan@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <span>◷</span>
              <div>
                <strong>Opening Hours</strong>
                <p>10+ Hours</p>
              </div>
            </div>

            <Link to="/shop" className="contact-shop-link">
              EXPLORE OUR COLLECTION →
            </Link>
          </aside>

        </div>
      </section>
    </main>
  );
}

export default ContactPage;
