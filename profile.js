document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("loggedInUser");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const inputs = document.querySelectorAll("#profileForm input");

  if (!username) {
    window.location.href = "index.html";
    return;
  }

  usernameDisplay.textContent = username;

  let editing = false;

  editBtn.addEventListener("click", () => {
    editing = !editing;

    inputs.forEach(input => {
      input.disabled = !editing;
    });

    saveBtn.disabled = !editing;
    editBtn.textContent = editing ? "✖ Cancel" : "✏️ Edit";
  });

  document.getElementById("profileForm").addEventListener("input", () => {
    const requiredFilled =
      document.getElementById("fullname").value &&
      document.getElementById("class").value &&
      document.getElementById("number").value &&
      document.getElementById("email").value;

    saveBtn.disabled = !requiredFilled;
  });

});
