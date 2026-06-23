function PrivacyPolicy() {
  return (
    <div className="container mt-5 text-light bg-dark p-5 rounded">
      <h1>Privacy Policy</h1>
      <p><strong>Information we collect</strong><br />
        We collect only the information you provide in the builder — name, email, bio, skills, projects, education, and experience.
      </p>
      <p><strong>GitHub data</strong><br />
        When you enter a GitHub username, we fetch public data directly from the GitHub API. This data stays in your browser session.
      </p>
      <p><strong>Your choices</strong><br />
        You can clear all stored data at any time by clearing your browser's site data for this domain.
      </p>
    </div>
  );
}

export default PrivacyPolicy;