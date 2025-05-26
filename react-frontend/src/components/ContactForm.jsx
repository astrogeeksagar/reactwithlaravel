import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '' });

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name!';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email!';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email!';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({ name: '', email: '' });
      } else {
        alert('Validation Failed: ' + JSON.stringify(result.errors));
      }
    } catch (error) {
      alert('Something went wrong: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(45deg, #1e3a8a, #7e22ce, #3b82f6, #a855f7);
          background-size: 400%;
          animation: gradient 15s ease infinite;
          position: relative;
          font-family: Arial, sans-serif;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .header {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .header h1 {
          margin: 0;
          color: white;
          font-size: 2rem;
        }

        .form-container {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }

        .form {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 1.5rem;
          max-width: 400px;
          width: 100%;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          color: white;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }

        .form-group .error {
          color: #ff4d4f;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .submit-button {
          width: 100%;
          padding: 0.75rem;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          opacity: ${loading ? 0.7 : 1};
          transition: opacity 0.3s ease;
        }

        .submit-button:disabled {
          cursor: not-allowed;
        }

        .footer {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          padding: 1rem;
          text-align: center;
          color: white;
        }

        .footer p {
          margin: 0;
        }

        .footer a {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer a:hover {
          color: #3b82f6;
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .social-icon {
          font-size: 1.5rem;
          color: white;
          transition: color 0.3s ease;
        }

        .social-icon:hover {
          color: #3b82f6;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .header h1 {
            font-size: 1.5rem;
          }
          .form {
            padding: 1rem;
          }
          .form-group input {
            font-size: 0.875rem;
            padding: 0.5rem;
          }
          .submit-button {
            font-size: 0.875rem;
            padding: 0.5rem;
          }
          .social-icon {
            font-size: 1.25rem;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <h1>Contact AstroGeekSagar</h1>
      </header>

      {/* Form */}
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>
          Created by{' '}
          <a href="https://astrogeeksagar.com" target="_blank" rel="noopener noreferrer">
            AstroGeekSagar
          </a>
        </p>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/astrogeeksagarcoder/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.04C6.48 2.04 2 6.52 2 12.04c0 5.01 3.66 9.15 8.44 9.94v-7.03h-2.53v-2.91h2.53v-2.22c0-2.5 1.49-3.87 3.77-3.87 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33v7.03c4.78-.79 8.44-4.93 8.44-9.94 0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
          <a
            href="https://github.com/astrogeeksagar"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.71c-2.78.6-3.36-1.34-3.36-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.564 9.564 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/astrogeeksagar/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9.02h3.41v1.56h.05c.48-.91 1.65-1.87 3.39-1.87 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.46c-1.15 0-2.08-.93-2.08-2.08s.93-2.08 2.08-2.08 2.08.93 2.08 2.08-.93 2.08-2.08 2.08zm1.78 13h-3.56V9.02h3.56v11.43zM22 2H2v20h20V2z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/astrogeek_sagar"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.16c3.21 0 3.58.01 4.84.07 1.17.06 1.81.25 2.23.41.56.22.96.49 1.38.91.42.42.69.82.91 1.38.16.42.35 1.06.41 2.23.06 1.26.07 1.63.07 4.84s-.01 3.58-.07 4.84c-.06 1.17-.25 1.81-.41 2.23-.22.56-.49.96-.91 1.38-.42.42-.82.69-1.38.91-.42.16-1.06.35-2.23.41-1.26.06-1.63.07-4.84.07s-3.58-.01-4.84-.07c-1.17-.06-1.81-.25-2.23-.41-.56-.22-.96-.49-1.38-.91-.42-.42-.69-.82-.91-1.38-.16-.42-.35-1.06-.41-2.23-.06-1.26-.07-1.63-.07-4.84s.01-3.58.07-4.84c.06-1.17.25-1.81.41-2.23.22-.56.49-.96.91-1.38.42-.42.82-.69 1.38-.91.42-.16 1.06-.35 2.23-.41 1.26-.06 1.63-.07 4.84-.07zm0-2.16C8.73 0 8.31.01 7.03.07c-1.29.06-2.17.27-2.94.58-.8.32-1.48.78-2.16 1.46S.79 3.56.47 4.36c-.31.77-.52 1.65-.58 2.94C.01 8.58 0 9 0 12.16s.01 3.58.07 4.86c.06 1.29.27 2.17.58 2.94.32.8.78 1.48 1.46 2.16s1.36.94 2.16 1.46c.77.31 1.65.52 2.94.58 1.28.06 1.7.07 4.86.07s3.58-.01 4.86-.07c1.29-.06 2.17-.27 2.94-.58.8-.32 1.48-.78 2.16-1.46s.94-1.36 1.46-2.16c.31-.77.52-1.65.58-2.94.06-1.28.07-1.7.07-4.86s-.01-3.58-.07-4.86c-.06-1.29-.27-2.17-.58-2.94-.32-.8-.78-1.48-1.46-2.16s-1.36-.94-2.16-1.46c-.77-.31-1.65-.52-2.94-.58C15.42.01 15 .0 12 0z" />
              <path d="M12 5.84a6.32 6.32 0 100 12.64 6.32 6.32 0 000-12.64zm0 10.46a4.14 4.14 0 110-8.28 4.14 4.14 0 010 8.28zm6.54-10.32a1.48 1.48 0 11-2.96 0 1.48 1.48 0 012.96 0z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/astrogeeksagar"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ContactForm;