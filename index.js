// ===== ฟังก์ชัน hash password =====
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ===== ฟังก์ชันสร้าง session =====
function createSession(userId) {
  const session = {
    token: crypto.randomUUID(),            // สุ่ม token ยาว ๆ
    userId: userId,                        // ใช้ username หรือ userId
    expireAt: Date.now() + 30 * 60 * 1000  // หมดอายุ 30 นาที
  };
  localStorage.setItem("session", JSON.stringify(session));
}

// ===== main =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('loginForm');
  const errorMsg = document.getElementById('errorMsg');
  const mouseLight = document.getElementById("mouse-light");

  if (!form) return;

  form.addEventListener('submit', async (e) => {
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

    const passwordHash = await hashPassword(password);

    if (passwordHash === parsedUser.passwordHash) {
      // ✅ login ผ่าน → สร้าง session
      createSession(parsedUser.username); 
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
