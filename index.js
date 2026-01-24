document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById('loginForm');
  const errorMsg = document.getElementById('errorMsg');
  const mouseLight = document.getElementById("mouse-light");

  if (!form) return; // กัน error

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
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

  // ===== Mouse Light Effect =====
  if (mouseLight) {
    document.addEventListener("mousemove", (e) => {
      mouseLight.style.background = `
        radial-gradient(
          circle at ${e.clientX}px ${e.clientY}px,
          rgba(255, 255, 255, 0.2),
          rgba(0, 0, 0, 0.6) 40%
        )
      `;
    });
  }

});
