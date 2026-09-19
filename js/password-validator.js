/* Positive lookaheads require categories; [^\s]{12,} rejects whitespace and enforces length. */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?`~])[^\s]{12,}$/;

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#password-input'); const toggle = document.querySelector('#toggle-password');
  const status = document.querySelector('#password-status'); const statusText = document.querySelector('#password-status-text'); const display = document.querySelector('#password-regex-display');
  if (!input) return; display.textContent = PASSWORD_REGEX.toString();
  const rules = { length: value => /^.{12,}$/.test(value), upper: value => /[A-Z]/.test(value), lower: value => /[a-z]/.test(value), digit: value => /\d/.test(value), special: value => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?`~]/.test(value), space: value => /^\S*$/.test(value) };
  function updatePassword() {
    const value = input.value; const accepted = PASSWORD_REGEX.test(value);
    status.classList.toggle('good', accepted); statusText.textContent = accepted ? '✓ PASSWORD POLICY SATISFIED' : '× PASSWORD POLICY NOT SATISFIED';
    document.querySelectorAll('.requirement').forEach(item => { const passed = rules[item.dataset.rule](value); item.classList.toggle('pass', passed); item.querySelector('.icon').textContent = passed ? '✓' : '×'; });
  }
  input.addEventListener('input', updatePassword);
  toggle.addEventListener('click', () => { const hidden = input.type === 'password'; input.type = hidden ? 'text' : 'password'; toggle.textContent = hidden ? 'HIDE' : 'SHOW'; input.focus(); });
  document.querySelectorAll('[data-password]').forEach(button => button.addEventListener('click', () => { input.value = button.dataset.password; updatePassword(); input.focus(); }));
  // This boundary example is valid: "Password123!" has exactly 12 characters.
  const boundaryExample = document.querySelector('[data-password="Password123!"]');
  const validExamples = document.querySelector('.valid-group');
  if (boundaryExample && validExamples) {
    boundaryExample.innerHTML = 'Password123! <small>— meets every rule at exactly 12 characters</small>';
    validExamples.appendChild(boundaryExample);
  }
  updatePassword();
});
