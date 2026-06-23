function Contact() {
  return (
    <div className="container mt-5 text-light bg-dark p-5 rounded">
      <h1>Contact Us</h1>
      <p>We usually respond within one business day.</p>
      <form>
        <div className="mb-3">
          <label className="form-label">Your name</label>
          <input type="text" className="form-control" placeholder="Enter your name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter your email" />
        </div>
        <div className="mb-3">
          <label className="form-label">How can we help?</label>
          <textarea className="form-control" rows="4" placeholder="Write your message"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Send message
        </button>
      </form>
    </div>
  );
}

export default Contact;