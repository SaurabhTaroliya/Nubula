import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBackToChatApp = () => {
    navigate('/ChatApp');
  };

  return (
    <div className="about-us">
      <div className="about-us-header">
        <h1>About Nebula</h1>
        <p>Welcome to Nebula! We are excited to introduce you to our innovative platform powered by advanced large language models. Our project leverages cutting-edge AI technology to generate images, code, and text based on user prompts, making it a versatile tool for a wide range of applications.</p>
      </div>

      <div className="about-us-section">
        <h2>What We Offer</h2>
        <ul>
          <li><strong>Text Generation:</strong> Whether you need creative writing, technical documentation, or any other form of text, our AI can generate high-quality content tailored to your needs.</li>
          <li><strong>Code Generation:</strong> Simplify your coding tasks with our AI-powered code generation. Provide a prompt, and our model will generate functional code snippets in various programming languages.</li>
          <li><strong>Image Generation:</strong> Bring your ideas to life with our AI's ability to generate images based on descriptive prompts. Perfect for designers, marketers, and anyone in need of visual content.</li>
        </ul>
      </div>

      <div className="about-us-section">
        <h2>Our Mission</h2>
        <p>At Nebula, our mission is to harness the power of artificial intelligence to enhance creativity and productivity. We aim to provide a seamless and intuitive experience for users, enabling them to achieve more with less effort.</p>
      </div>

      <div className="about-us-section">
        <h2>How It Works</h2>
        <ol>
          <li><strong>Enter Your Prompt:</strong> Start by entering a prompt that describes what you need. This could be a sentence, a question, or a detailed description.</li>
          <li><strong>AI Processing:</strong> Our advanced AI model processes your prompt and generates the desired output, whether it's text, code, or an image.</li>
          <li><strong>Receive Your Output:</strong> Instantly receive high-quality content that you can use for your projects, presentations, or personal use.</li>
        </ol>
      </div>

      <div className="about-us-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Advanced AI Technology:</strong> Our platform is built on state-of-the-art AI models that deliver accurate and relevant results.</li>
          <li><strong>User-Friendly Interface:</strong> We prioritize ease of use, ensuring that our platform is accessible to everyone, regardless of technical expertise.</li>
          <li><strong>Continuous Improvement:</strong> We are committed to continuously improving our models and expanding our capabilities to meet the evolving needs of our users.</li>
        </ul>
      </div>

      <div className="about-us-section">
        <h2>Get in Touch</h2>
        <p>We'd love to hear from you! If you have any questions, feedback, or suggestions, please don't hesitate to reach out to us at <strong>[Your Contact Information]</strong>.</p>
        <p>Thank you for choosing Nebula. We look forward to helping you achieve your goals with the power of AI!</p>
      </div>

      <button onClick={handleBackToChatApp} className="back-to-chat-button">
        Close
      </button>
    </div>
  );
};

export default AboutUs;
