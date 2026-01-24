document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("currentUser");

  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const logoutBtn = document.getElementById("logoutBtn");

  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const profileArea = document.getElementById("profileArea");
  const mouseLight = document.getElementById("mouse-light");

  if (!welcomeMsg || !pointsDisplay || !logoutBtn || !menuBtn || !sidebar) {
    console.error("HTML element ไม่ครบ");
    return;
  }

  if (!username) {
    window.location.href = "index.html";
    return;
  }

  welcomeMsg.textContent = `Welcome, ${username}!`;

  const pointKey = `points_${username}`;
  let points = localStorage.getItem(pointKey);

  if (points === null) {
    points = 0;
    localStorage.setItem(pointKey, points);
  }

  pointsDisplay.textContent = `Points: ${points}`;

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  profileArea.addEventListener("click", () => {
    window.location.href = "profile.html";
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });

  document.addEventListener("mousemove", (e) => {
    if (!mouseLight) return;

    mouseLight.style.background = `
      radial-gradient(
        circle at ${e.clientX}px ${e.clientY}px,
        rgba(255, 255, 255, 0.2),
        rgba(0, 0, 0, 0.6) 40%
      )
    `;
  });

}); // ⭐⭐⭐ อันนี้แหละที่ขาด
