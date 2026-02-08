document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById('loginForm');
  const errorMsg = document.getElementById('errorMsg');
  const mouseLight = document.getElementById("mouse-light");

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    errorMsg.textContent = ""; // เคลียร์ error เก่า

    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    const userData = localStorage.getItem(`user_${username}`);

    if (!userData) {
      errorMsg.textContent = "Account not found";
      return;
    }

    let parsedUser;
    try {
      parsedUser = JSON.parse(userData);
    } catch {
      errorMsg.textContent = "User data corrupted";
      return;
    }

    if (password !== parsedUser.password) {
      errorMsg.textContent = "Invalid username or password.";
      return;
    }

    // ✅ LOGIN SUCCESS → CREATE SESSION
    const session = {
      token: crypto.randomUUID(),
      userId: parsedUser.id || username, // ชั่วคราว (ยังไม่มี id จริง)
      expireAt: Date.now() + 30 * 60 * 1000 // 30 นาที
    };

    localStorage.setItem("session", JSON.stringify(session));

    window.location.href = "loggedin.html";
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
