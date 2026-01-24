const form = document.getElementById('signupForm');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  // ❗ เช็กว่ามี user นี้แล้วหรือยัง
  if (localStorage.getItem(`user_${username}`)) {
    errorMsg.textContent = "Username already exists.";
    return;
  }

  const userData = {
    username,
    password
  };

  localStorage.setItem(
    `user_${username}`,
    JSON.stringify(userData)
  );

  // ไม่ auto login
  window.location.href = "index.html";
});
