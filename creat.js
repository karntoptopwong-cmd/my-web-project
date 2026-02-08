async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('signupForm');
  const errorMsg = document.getElementById('errorMsg');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim().toLowerCase();
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

    const passwordHash = await hashPassword(password);

    const userData = {
      username,
      passwordHash
    };

    localStorage.setItem(`user_${username}`, JSON.stringify(userData));

    alert("สมัครเสร็จแล้ว!");
    window.location.href = "index.html";
  });
});
