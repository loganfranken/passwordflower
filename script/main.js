var wrapper = document.getElementById('wrapper');
var passwordForm = document.getElementById('password-form');
var passwordInput = document.getElementById('password-input');
var plant = document.getElementById('plant');
var feedback = document.getElementById('feedback');

var isFeeding = false;
var isWatching = false;

var currPassword = '';

passwordForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  if(isFeeding || isWatching)
  {
    return;
  }

  isFeeding = true;
  passwordForm.className = 'feeding';

  isWatching = true;
  wrapper.className = 'watching';

  currPassword = passwordInput.value;

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
  isWatching = false;
  wrapper.className = '';

  var resultsSummary = analyzePassword(currPassword);
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
    summary.results.push('I\'m hungry for a longer password!');
    strengthPoints--;
  }

  // Contain an uppercase character
  if(!/[A-Z]/g.test(input))
  {
    summary.results.push('A healthy diet needs variety: I need an uppercase character');
    strengthPoints--;
  }

  // Contain a lowercase character
  if(!/[a-z]/g.test(input))
  {
    summary.results.push('I need a balanced diet: can you give me some lowercase characters too?');
    strengthPoints--;
  }

  // Contain a digit
  if(!/[0-9]/g.test(input))
  {
    summary.results.push('I\'m really craving some numbers too');
    strengthPoints--;
  }

  // Contain a special character
  if(!/[\W]/g.test(input))
  {
    summary.results.push('Could use some more flavor: maybe add a special character?');
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
  else if(strength > 70)
  {
    state = 'happy';
  }
  else if(strength > 50)
  {
    state = 'sad';
  }
  else
  {
    state = 'dead';
  }

  plant.className = state;

  if(strength === 100)
  {
    feedback.innerHTML = 'Wow! That password was delicious!'
  }
  else
  {
    feedback.innerHTML = resultsSummary.results[0];
  }

}
