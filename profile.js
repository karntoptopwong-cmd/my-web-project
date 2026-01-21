document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("loggedInUser");
  const usernameDisplay = document.getElementById("usernameDisplay");

  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const form = document.getElementById("profileForm");
  const inputs = form.querySelectorAll("input");

  // แสดง username
  if (username) {
    usernameDisplay.textContent = username;
  }

  let isEditing = false;

  // Toggle Edit
  editBtn.addEventListener("click", () => {
    isEditing = !isEditing;

    inputs.forEach(input => {
      input.disabled = !isEditing;
    });

    saveBtn.disabled = !isEditing;
    editBtn.textContent = isEditing ? "✖ Cancel" : "✏️ Edit";
  });

  // Save
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      fullname: fullname.value,
      class: class.value,
      number: number.value,
      email: email.value,
      phone: phone.value
    };

    localStorage.setItem("profileData", JSON.stringify(data));

    alert("บันทึกข้อมูลเรียบร้อยแล้ว");

    isEditing = false;
    inputs.forEach(input => input.disabled = true);
    saveBtn.disabled = true;
    editBtn.textContent = "✏️ Edit";
  });

});
