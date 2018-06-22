var wrapper = document.getElementById('wrapper');
var passwordForm = document.getElementById('password-form');
var passwordInput = document.getElementById('password-input');
var plant = document.getElementById('plant');
var feedback = document.getElementById('feedback');

var isFeeding = false;
var isWatching = false;

var currPassword = '';
var cachedPasswords = [];

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
  cachedPasswords.push(currPassword);
  outputResults(resultsSummary);
}

function analyzePassword(input)
{
  if(input == null || input.length == 0)
  {
    return {
      passwordStrength: 0,
      feedback: "You didn't feed me anything! <strong>Please, I'm so hungry!</strong>"
    };
  }

  // Was this password already used?
  if(cachedPasswords.includes(input))
  {
    return {
      passwordStrength: 0,
      feedback: "You already fed me that one! <strong>Feed me something original!</strong>"
    };
  }

  // Is this a common password?
  if(CommonPasswords.includes(input))
  {
    return {
      passwordStrength: 0,
      feedback: "Ugh, I'm so tired of that password. <strong>Feed me something original!</strong>"
    };
  }

  // Is the password less than 12 characters?
  if(input.length < 12)
  {
    return {
      passwordStrength: 60,
      feedback: "Ehh, that was okay. <strong>I was really hoping for something longer</strong>."
    };
  }

  var result = null;
  var containsSpecialCharacters = /[A-Z0-9\W]/g.test(input);

  // Is the password at least 16 characters?
  if(input.length >= 16)
  {
    result = {
      passwordStrength: 100,
      feedback: "Yummy! That was a <strong>delicious password</strong>!"
    };
  }
  // Is the password at least 12 characters?
  else if(input.length >= 12)
  {
    if(containsSpecialCharacters)
    {
      // WITH special characters
      result = {
        passwordStrength: 100,
        feedback: "Yummy! That was a <strong>delicious password</strong>!"
      };
    }
    else
    {
      // WITHOUT special characters
      result = {
        passwordStrength: 80,
        feedback: "Pretty good! <strong>I'm craving something longer or with a little variety</strong>, though."
      };
    }
  }

  if(/[A-Z]/.test(input.substring(0, 1)))
  {
    result = {
      passwordStrength: 80,
      feedback: "Not bad. <strong>I love uppercase characters, but not at the beginning</strong>."
    };
  }

  if(/[0-9]/.test(input.substring(input.length - 1, input.length)))
  {
    result = {
      passwordStrength: 80,
      feedback: "Not bad. <strong>I love numbers, but not at the end</strong>."
    };
  }

  if(/[\!]/.test(input.substring(input.length - 1, input.length)))
  {
    result = {
      passwordStrength: 80,
      feedback: "Not bad. <strong>I love a good exclamation mark, but not at the end</strong>."
    };
  }

  return result;
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
  feedback.innerHTML = resultsSummary.feedback;
}

var CommonPasswords = [
  'welcome',
  'qwert',
  'abc123',
  'password',
  'password1',
  'iloveyou',
  'princess',
  '123456',
  '12345',
  '123456789',
  'Password123',
  '12345678',
  '696969',
  '111111',
  '6969',
  'Iwantyou',
  'Babygirl',
  '654321',
  '666666',
  '121212',
  'ZZZZZZ',
  'Ferrari',
  'Maddog',
  'Booboo',
  'Hooters',
  'Tomcat',
  'Badboy',
  'Booger',
  'Matrix',
  'Bigdaddy',
  '232323',
  '4444',
  '00000',
  'Booty',
  '112233',
  'Rosebud',
  'Blonde',
  'Tester',
  '123123',
  'Mustang',
  'Cowboy',
  'changeme'
];
