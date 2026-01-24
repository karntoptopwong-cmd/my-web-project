const form = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const savedUsername = localStorage.getItem('username');
      const savedPassword = localStorage.getItem('password');

      if (username === savedUsername && password === savedPassword) {
        localStorage.setItem('currentUser', username);
        window.location.href = "loggedin.html";
      } else {
        errorMsg.textContent = "Invalid username or password.";
      }

    });
