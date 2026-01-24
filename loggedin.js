document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("currentUser");

  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points"); // ⭐ เพิ่มบรรทัดนี้
  const logoutBtn = document.getElementById("logoutBtn");

  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const profileArea = document.getElementById("profileArea");

  // ป้องกัน error
  if (!welcomeMsg || !pointsDisplay || !logoutBtn || !menuBtn || !sidebar) {
    console.error("HTML element ไม่ครบ");
    return;
  }

  // เช็ก login
  if (!username) {
    window.location.href = "index.html";
    return;
  }

  // แสดงชื่อ
  welcomeMsg.textContent = `Welcome, ${username}!`;

  // points (แยกต่อคน)
  const pointKey = `points_${username}`;

  let points = localStorage.getItem(pointKey);
  if (points === null) {
    points = 0;
    localStorage.setItem(pointKey, points);
  }

  pointsDisplay.textContent = `Points: ${points}`;

  // ☰ toggle sidebar
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // ไปหน้า profile
  profileArea.addEventListener("click", () => {
    window.location.href = "profile.html";
  });

  // Log out
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });

});
