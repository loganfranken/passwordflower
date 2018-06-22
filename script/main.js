var passwordForm = document.getElementById('password-form');
var passwordInput = document.getElementById('password-input');
var plant = document.getElementById('plant');

var isFeeding = false;

passwordForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  if(isFeeding)
  {
    return;
  }

  isFeeding = true;
  passwordForm.className = 'feeding';

  window.setTimeout(feedPlant, 1000);
});

function feedPlant()
{
  if(passwordInput.value.length === 0)
  {
    isFeeding = false;
    passwordForm.className = '';
    window.setTimeout(displayResults, 1000);
  }
  else
  {
    passwordInput.value = passwordInput.value.substring(0, passwordInput.value.length - 1);
    window.setTimeout(feedPlant, 100);
  }
}

function displayResults()
{
  var resultsSummary = analyzePassword(passwordInput.value);
  outputResults(resultsSummary);
}

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
  var strength = resultsSummary.passwordStrength;

  if(strength === 100)
  {
    state = 'flowering';
  }
  else if(strength < 100 && strength > 50)
  {
    state = 'happy';
  }
  else if(strength < 50 && strength > 20)
  {
    state = 'sad';
  }
  else if(resultsSummary.passwordStrength < 50)
  {
    state = 'dead';
  }

  plant.className = state;
}
