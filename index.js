const form = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const userData = localStorage.getItem(`user_${username}`);

        if (!userData) {
    errorMsg.textContent = "Account not found";
    return;
  }

        const parsedUser = JSON.parse(userData);

      if (password === parsedUser.password) {
        localStorage.setItem('currentUser', username);
        window.location.href = "loggedin.html";
      } else {
        errorMsg.textContent = "Invalid username or password.";
      }

    });


