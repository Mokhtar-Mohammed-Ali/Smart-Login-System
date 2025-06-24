var app = document.getElementById("app");
// Local storage helpers for users and login state
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function setLoggedIn(email) {
  localStorage.setItem("loggedIn", email);
}

function getLoggedIn() {
  return localStorage.getItem("loggedIn");
}

function logout() {
  localStorage.removeItem("loggedIn");
}
// Form input validation using regular expressions

function validateEmail(email) {
  return /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function validatePassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
}
// Show registration form structure and handle user registration

function showRegistration() {
  app.innerHTML = "";

  var form = document.createElement("form");
  var title = document.createElement("h1");
  title.textContent = "Smart Login System";

  var error = document.createElement("div");
  error.className = "error";
  error.style.display = "none";

  var nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Your name";
  nameInput.name = "name";
  nameInput.required = true;

  var emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.placeholder = "Email";
  emailInput.name = "email";
  emailInput.required = true;

  var passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Password (min 6 chars, number & letter)";
  passwordInput.name = "password";
  passwordInput.required = true;

  var submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Register";
    var success = document.createElement("p");
    success.textContent="Account created successfully! 👏 ";
    success.style.display='none';
    success.className='success';
     var loader = document.createElement("span");
      loader.style.display='none';
      loader.className='loader';

  var loginLink = document.createElement("span");
  loginLink.className = "link";
  loginLink.textContent = "Already have an account ? Login";
  loginLink.onclick = showLogin;
  

  form.appendChild(title);
  form.appendChild(error);
  form.appendChild(nameInput);
  form.appendChild(emailInput);
  form.appendChild(passwordInput);
    form.appendChild(success);
    form.appendChild(loader);
  form.appendChild(submitBtn);
  form.appendChild(loginLink);
  



  form.onsubmit = function (e) {
    e.preventDefault();
    error.style.display = "none";

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var password = passwordInput.value;

    if (!validateEmail(email)) {
      error.textContent = "Invalid email format";
      error.style.display = "block";
      return;
    }

    if (!validatePassword(password)) {
      error.textContent =
        "Weak password (at least 6 characters with number & letter)";
      error.style.display = "block";
      return;
    }

    var users = getUsers();
    if (
      users.find(function (person) {
        return person.email === email;
      })
    ){
      error.textContent = "Email already used, try another";
      error.style.display = "block";
      return;
    }

    users.push({name,email, password });
success.style.display='block';
loader.style.display='block';
    saveUsers(users);
     setLoggedIn(email);
   setTimeout(() => {
    
   showLogin()
   }, 2000);
  };

  app.appendChild(form);
}
// Show login form and handle user authentication

function showLogin() {
  app.innerHTML = "";

  var form = document.createElement("form");
  var title = document.createElement("h2");
  title.textContent = "Login";

  var error = document.createElement("div");
  error.className = "error";
  error.style.display = "none";

  var emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.placeholder = "Email";
  emailInput.name = "email";
  emailInput.required = true;

  var passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Password";
  passwordInput.name = "password";
  passwordInput.required = true;

  var submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Login";
      var success = document.createElement("p");
    success.textContent="Welcome to the family 🌟";
    success.style.display='none';
    success.className='success';
     var loader = document.createElement("span");
      loader.style.display='none';
      loader.className='loader';

  var registerLink = document.createElement("span");
  registerLink.className = "link";
  registerLink.textContent = "Don't have an account? Register now";
  registerLink.onclick = showRegistration;

  form.appendChild(title);
  form.appendChild(error);
  form.appendChild(emailInput);
  form.appendChild(passwordInput);  
  form.appendChild(success);  
  form.appendChild(loader);  
  form.appendChild(submitBtn);
  form.appendChild(registerLink);

  form.onsubmit = function (e) {
    e.preventDefault();
    error.style.display = "none";

    var email = emailInput.value.trim();
    var password = passwordInput.value;

    var users = getUsers();
    var user = users.find(function (person) {
      return person.email === email;
    });

    if (!user) {
      error.textContent = "Email not registered";
      error.style.display = "block";
      return;
    }

    if (user.password !== password) {
      error.textContent = "Incorrect password";
      error.style.display = "block";
      return;
    }
          loader.style.display='block';
          success.style.display='block';

    setLoggedIn(email);
  setTimeout(()=>{
      showHome();
  },2000)
  };

  app.appendChild(form);
}
// Display the logged-in user's home screen
function showHome() {
  app.innerHTML = "";

  var email = getLoggedIn();
  var users = getUsers();
  var user = users.find(function (person) {
    return person.email === email;
  });

  if (!user) {
    showLogin();
    return;
  }

  var container = document.createElement("div");
  var nameDisplay = document.createElement("div");
  nameDisplay.className = "hello-user";

  var greeting = document.createElement("h2");
  greeting.textContent = `Welcome Mr :${user.name} 👋`;

  var logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.onclick = function () {
    logout();
    showLogin();
  };

  container.appendChild(greeting);
  container.appendChild(nameDisplay);
  container.appendChild(logoutBtn);

  app.appendChild(container);
}
// On page load, show home screen if a user is logged in
function init() {
  if (getLoggedIn()) {
    showHome();
  } else {
    showRegistration();
  }
}

init();
