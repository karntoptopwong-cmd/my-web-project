document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("loggedInUser");

  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const logoutBtn = document.getElementById("logoutBtn");

  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const profileLink = document.getElementById("profileLink");

  // ป้องกัน error
  if (!welcomeMsg || !pointsDisplay || !logoutBtn || !menuBtn || !sidebar || !overlay) {
    console.error("HTML element ไม่ครบ");
    return;
  }

  // เช็ก login
  if (!username) {
    window.location.href = "index.html";
    return;
  }

  welcomeMsg.textContent = `Welcome, ${username}!`;

  let points = localStorage.getItem("points");
  if (points === null) {
    points = 0;
    localStorage.setItem("points", points);
  }
  pointsDisplay.textContent = `Points: ${points}`;

  // ☰ toggle sidebar
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.style.display = sidebar.classList.contains("open") ? "block" : "none";
  });

  // คลิก overlay → ปิด
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.style.display = "none";
  });

  // คลิก Profile → ปิดก่อนเปลี่ยนหน้า
  if (profileLink) {
    profileLink.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.style.display = "none";
    });
  }

  // Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });

});
