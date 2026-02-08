document.addEventListener("DOMContentLoaded", () => {

  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const logoutBtn = document.getElementById("logoutBtn");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const profileArea = document.getElementById("profileArea");
  const mouseLight = document.getElementById("mouse-light");

  // ===== เช็ค session =====
  const sessionRaw = localStorage.getItem("session");
  if (!sessionRaw) return redirectToLogin();

  let session;
  try {
    session = JSON.parse(sessionRaw);
  } catch (err) {
    return redirectToLogin();
  }

  if (Date.now() > session.expireAt) return redirectToLogin();

  // หา username จาก userId
  const userRaw = localStorage.getItem(`user_${session.userId}`);
  if (!userRaw) return redirectToLogin();
  const user = JSON.parse(userRaw);
  const username = user.username;

  welcomeMsg.textContent = `Welcome, ${username}!`;

  const pointKey = `points_${username}`;
  let points = localStorage.getItem(pointKey);
  if (points === null) {
    points = 0;
    localStorage.setItem(pointKey, points);
  }
  pointsDisplay.textContent = `Points: ${points}`;

  // ===== menu / sidebar =====
  menuBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
  profileArea.addEventListener("click", () => window.location.href = "profile.html");

  logoutBtn.addEventListener("click", () => {
    if (confirm("Do you really want to logout?")) {
      localStorage.removeItem("session");
      redirectToLogin();
    }
  });

  // ===== mouse light =====
  document.addEventListener("mousemove", (e) => {
    if (!mouseLight) return;
    mouseLight.style.background = `
      radial-gradient(circle at ${e.clientX}px ${e.clientY}px,
      rgba(255,255,255,0.2),
      rgba(0,0,0,0.6) 40%)
    `;
  });

  function redirectToLogin() {
    window.location.href = "index.html";
  }

});
