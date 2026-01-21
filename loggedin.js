document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("loggedInUser");

  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const logoutBtn = document.getElementById("logoutBtn");

  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalOverlay = document.getElementById("modalOverlay");

  // ===== ป้องกัน error =====
  if (!welcomeMsg || !pointsDisplay || !logoutBtn || !modalOverlay) {
    console.error("HTML element หาย");
    return;
  }

  // ===== เช็ก login =====
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

  // ===== เปิด modal =====
  if (openModalBtn) {
    openModalBtn.addEventListener("click", () => {
  modalOverlay.style.display =
    modalOverlay.style.display === "flex" ? "none" : "flex";
});

    });
  }

  // ===== ปิด modal =====
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modalOverlay.style.display = "none";
    });
  }

  // คลิกพื้นหลังเพื่อปิด
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = "none";
    }
  });

  // ===== Logout =====
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });

});

