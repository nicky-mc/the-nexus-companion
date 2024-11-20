import { login, signup } from './actions';

function LoginPage() {
  return `
    <form>
      <label for="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label for="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button type="button" onclick="${login}">Log in</button>
      <button type="button" onclick="${signup}">Sign up</button>
    </form>
  `;
}

