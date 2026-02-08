document.addEventListener("DOMContentLoaded", () => {
  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const logoutBtn = document.getElementById("logoutBtn");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const profileArea = document.getElementById("profileArea");
  const mouseLight = document.getElementById("mouse-light");

  // ===== ฟังก์ชัน checkAuth ใช้ซ้ำได้ทุกหน้าที่ protected =====
  function checkAuth() {
    const sessionRaw = localStorage.getItem("session");
    if (!sessionRaw) return redirectToLogin();

    let session;
    try {
      session = JSON.parse(sessionRaw);
    } catch {
      return redirectToLogin();
    }

    if (!session.token || Date.now() > session.expireAt) return redirectToLogin();

    const userRaw = localStorage.getItem(`user_${session.userId}`);
    if (!userRaw) return redirectToLogin();

    const user = JSON.parse(userRaw);
    return { session, user }; // คืน object ใช้งานต่อ
  }

  function redirectToLogin() {
    window.location.href = "index.html";
  }

  // ===== เรียก checkAuth =====
  const auth = checkAuth();
  if (!auth) return; // ถ้าไม่ผ่าน → redirect
  const { session, user } = auth;
  const username = user.username;

  // ===== แสดงข้อความต้อนรับ =====
  welcomeMsg.textContent = `Welcome, ${username}!`;

  // ===== Points =====
  const pointKey = `points_${username}`;
  let points = localStorage.getItem(pointKey);
  if (points === null) {
    points = 0;
    localStorage.setItem(pointKey, points);
  }
  pointsDisplay.textContent = `Points: ${points}`;

  // ===== Menu / Sidebar =====
  menuBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
  profileArea.addEventListener("click", () => window.location.href = "profile.html");

  // ===== Logout =====
  logoutBtn.addEventListener("click", () => {
    if (confirm("Do you really want to logout?")) {
      localStorage.removeItem("session");
      redirectToLogin();
    }
  });

  // ===== Mouse light =====
  if (mouseLight) {
    document.addEventListener("mousemove", (e) => {
      mouseLight.style.background = `
        radial-gradient(circle at ${e.clientX}px ${e.clientY}px,
        rgba(255,255,255,0.2),
        rgba(0,0,0,0.6) 40%)
      `;
    });
  }
});
