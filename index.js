async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('loginForm');
  const errorMsg = document.getElementById('errorMsg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    const userData = localStorage.getItem(`user_${username}`);
    if (!userData) {
      errorMsg.textContent = "Account not found";
      return;
    }

    const parsedUser = JSON.parse(userData);
    const passwordHash = await hashPassword(password);

    if (passwordHash === parsedUser.passwordHash) {
      // login ผ่าน → ต่อด้วย session token (ข้อ 2)  
      createSession(parsedUser.username); // ฟังก์ชันจะทำต่อ
      window.location.href = "loggedin.html";
    } else {
      errorMsg.textContent = "Invalid username or password.";
    }
  });
});
