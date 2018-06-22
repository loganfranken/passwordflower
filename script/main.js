var passwordInput = document.getElementById('password-input');
var resultsOutput = document.getElementById('results-output');

passwordInput.addEventListener('keyup', function() {
  var results = analyzePassword(passwordInput.value);
  outputResults(results);
});

function analyzePassword(input)
{
  var results = [];

  // Minimum length
  if(input.length < 8)
  {
    results.push('Password must contain a minimum of 8 characters')
  }

  // Contain an uppercase character
  if(!/[A-Z]/g.test(input))
  {
    results.push('Password must contain an uppercase character')
  }

  // Contain a lowercase character
  if(!/[a-z]/g.test(input))
  {
    results.push('Password must contain a lowercase character')
  }

  // Contain a digit
  if(!/[0-9]/g.test(input))
  {
    results.push('Password must contain a digit')
  }

  // Contain a special character
  if(!/[\W]/g.test(input))
  {
    results.push('Password must contain a special character')
  }

  return results;
}

function outputResults(results)
{
  var resultsHtml = '';

  resultsHtml += '<ul>';
  results.forEach(function(result) {
    resultsHtml += '<li>' + result + '</li>';
  });
  resultsHtml += '</ul>';

  resultsOutput.innerHTML = resultsHtml;
}
