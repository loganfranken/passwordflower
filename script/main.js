var passwordForm = document.getElementById('password-form');
var passwordInput = document.getElementById('password-input');
var plant = document.getElementById('plant');

passwordForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  var resultsSummary = analyzePassword(passwordInput.value);
  outputResults(resultsSummary);
});

function analyzePassword(input)
{
  var summary = {};

  summary.results = [];
  var maxStrengthPoints = 5;
  var strengthPoints = maxStrengthPoints;

  // Minimum length
  if(input.length < 8)
  {
    summary.results.push('Password must contain a minimum of 8 characters');
    strengthPoints--;
  }

  // Contain an uppercase character
  if(!/[A-Z]/g.test(input))
  {
    summary.results.push('Password must contain an uppercase character');
    strengthPoints--;
  }

  // Contain a lowercase character
  if(!/[a-z]/g.test(input))
  {
    summary.results.push('Password must contain a lowercase character');
    strengthPoints--;
  }

  // Contain a digit
  if(!/[0-9]/g.test(input))
  {
    summary.results.push('Password must contain a digit');
    strengthPoints--;
  }

  // Contain a special character
  if(!/[\W]/g.test(input))
  {
    summary.results.push('Password must contain a special character');
    strengthPoints--;
  }

  summary.passwordStrength = (strengthPoints/maxStrengthPoints) * 100;
  return summary;
}

function outputResults(resultsSummary)
{
  var state = '';

  if(resultsSummary.passwordStrength < 50)
  {
    state = 'dead';
  }

  plant.className = state;

  /*
  var resultsHtml = '';

  // Password Strength
  resultsHtml += '<div><strong>Password Strength:</strong> ' + resultsSummary.passwordStrength + '</div>';

  // Results
  resultsHtml += '<ul>';
  resultsSummary.results.forEach(function(result) {
    resultsHtml += '<li>' + result + '</li>';
  });
  resultsHtml += '</ul>';

  resultsOutput.innerHTML = resultsHtml;
  */
}
