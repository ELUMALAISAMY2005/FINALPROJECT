const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
document.getElementById('sign-up-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('s-name').value;
  const email = document.getElementById('s-email').value;
  const password = document.getElementById('s-password').value;

  fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.message === 'Signup data received') {
          window.location.href = 'index.html';
      } else {
          alert('Signup failed');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});
document.getElementById('sign-in-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:4000/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Sign in successful') {
      window.location.href = 'home.html'; // Redirect to a protected page
    } else {
      alert('Invalid email or password');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
