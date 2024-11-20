// HomePage.js
export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to NexusV2</h1>
      <p>Your one-stop solution for managing your characters, campaigns, and more!</p>
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Character Management</li>
          <li>Campaign Tracking</li>
          <li>Group Collaboration</li>
          <li>Spell and Ability Tracking</li>
        </ul>
      </div>
      <div className="cta">
        <h2>Get Started</h2>
        <p>Join us today and enhance your gaming experience!</p>
        <button className="cta-button">Sign Up</button>
      </div>
    </div>
  );
}
