/* The URL language recognized by this module. Anchors make this a full-input validation. */
const URL_REGEX = /^https?:\/\/(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?::\d{1,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/i;

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#url-input');
  const validateButton = document.querySelector('#validate-url');
  const result = document.querySelector('#url-result');
  const title = document.querySelector('#url-result-title');
  const message = document.querySelector('#url-result-message');
  const checks = document.querySelector('#url-component-checks');
  const display = document.querySelector('#url-regex-display');
  if (!input) return;
  display.textContent = URL_REGEX.toString();
  const protocolRegex = /^https?:\/\//i;
  const authorityRegex = /^https?:\/\/(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}/i;
  const tldRegex = /^https?:\/\/(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?::|\/|\?|#|$)/i;
  const portRegex = /^https?:\/\/[^\s/?#]+(?::\d{1,5})?(?:[/?#]|$)/i;
  const tailRegex = /^(?:https?:\/\/[^\s/?#]+(?::\d{1,5})?)?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/i;
  function componentState(value) {
    const hasPort = /^https?:\/\/[^\s/?#]+:/.test(value);
    const hasPath = /^https?:\/\/[^\s/?#]+(?::\d{1,5})?\//.test(value);
    return [['Protocol', protocolRegex.test(value)], ['Domain', authorityRegex.test(value)], ['Top-level domain', tldRegex.test(value)], [hasPort ? 'Port' : 'Port (optional)', portRegex.test(value)], [hasPath ? 'Path' : 'Path (optional)', tailRegex.test(value)], [value.includes('?') ? 'Query' : 'Query (optional)', tailRegex.test(value)], [value.includes('#') ? 'Fragment' : 'Fragment (optional)', tailRegex.test(value)]];
  }
  function validateUrl() {
    const value = input.value.trim(); const valid = URL_REGEX.test(value);
    result.className = `result-panel show ${valid ? 'valid' : 'invalid'}`;
    title.textContent = valid ? '✓ VALID URL' : '× INVALID URL';
    message.textContent = valid ? 'The complete input is accepted by the project URL regular expression.' : value ? 'The complete input is rejected by the URL regular expression. Review the component checks below.' : 'Enter a URL to test it against the regular expression.';
    checks.innerHTML = '';
    componentState(value).forEach(([label, passed]) => { const item = document.createElement('div'); item.className = `check ${passed ? 'pass' : 'fail'}`; item.textContent = `${passed ? '✓' : '×'} ${label}`; checks.appendChild(item); });
  }
  validateButton.addEventListener('click', validateUrl);
  input.addEventListener('keydown', event => { if (event.key === 'Enter') validateUrl(); });
  document.querySelectorAll('[data-url]').forEach(button => button.addEventListener('click', () => { input.value = button.dataset.url; validateUrl(); input.focus(); }));
});
