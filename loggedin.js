document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem('loggedInUser');
  const welcomeMsg = document.getElementById('welcomeMsg');
  const pointsDisplay = document.getElementById('points');
  const logoutBtn = document.getElementById('logoutBtn');

  if (!username) {
    window.location.href = "index.html";
    return;
  }

  welcomeMsg.textContent = `Welcome, ${username}!`;

  // ถ้ายังไม่มี point ให้ตั้งเป็น 0
  let points = localStorage.getItem('points');
  if (points === null) {
    points = 0;
    localStorage.setItem('points', points);
  }

  pointsDisplay.textContent = `Points: ${points}`;

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    // localStorage.removeItem('points'); // ถ้าต้องการลบแต้มด้วย ค่อยเปิด
    window.location.href = "index.html";
  });
});
