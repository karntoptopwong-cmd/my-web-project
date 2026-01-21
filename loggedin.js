document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("loggedInUser");

  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const logoutBtn = document.getElementById("logoutBtn");

  const menuBtn = document.getElementById("menuBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalOverlay = document.getElementById("modalOverlay");

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

  // เปิด modal
  menuBtn.addEventListener("click", () => {
    modalOverlay.classList.add("show");
  });

  // ปิด modal
  closeModalBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("show");
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("show");
    }
  });

  // Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });

});
