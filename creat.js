document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById('signupForm');
  const errorMsg = document.getElementById('errorMsg');
  const mouseLight = document.getElementById("mouse-light");

  if (!form) return; // กัน error

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      errorMsg.textContent = "Passwords do not match.";
      return;
    }

    if (localStorage.getItem(`user_${username}`)) {
      errorMsg.textContent = "Username already exists.";
      return;
    }

    const userData = { username, password };

    localStorage.setItem(
      `user_${username}`,
      JSON.stringify(userData)
    );

    // ไม่ auto login
    window.location.href = "index.html";
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
