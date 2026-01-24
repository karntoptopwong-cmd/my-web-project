const form = document.getElementById("profileForm");
const fullname = document.getElementById("fullname");
const classInput = document.getElementById("class");
const number = document.getElementById("number");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const saveBtn = document.getElementById("saveBtn");
const editBtn = document.getElementById("editBtn");
const inputs = document.querySelectorAll("input");
const savedProfile = localStorage.getItem("profileData");

if (savedProfile) {
  const data = JSON.parse(savedProfile);

  fullname.value = data.fullname || "";
  classInput.value = data.class || "";
  number.value = data.number || "";
  email.value = data.email || "";
  phone.value = data.phone || "";
}
function checkForm() {
  if (!isEditing) return;

  const isValid =
    fullname.value.trim() !== "" &&
    classInput.value.trim() !== "" &&
    number.value.trim() !== "" &&
    email.value.trim() !== "";

  saveBtn.disabled = !isValid;
  if (isValid) {
  saveBtn.classList.add("active");
} else {
  saveBtn.classList.remove("active");
}

}

inputs.forEach(input => {
  input.addEventListener("input", checkForm);
});

// เริ่มต้น: ล็อกทุกช่อง
inputs.forEach(input => input.disabled = true);
saveBtn.disabled = true;

let isEditing = false;

editBtn.addEventListener('click', () => {
  isEditing = !isEditing;

  inputs.forEach(input => {
    input.disabled = !isEditing; // ⭐ แก้ตรงนี้
  });

  saveBtn.disabled = true;

  if (isEditing) checkForm();

  editBtn.textContent = isEditing ? '✖ Cancel' : '✎ Edit';
});

// Save
form.addEventListener("submit", (e) => {
  e.preventDefault();

  /* ===== ใส่ localStorage ตรงนี้ ===== */
  const profileData = {
    fullname: fullname.value,
    class: classInput.value,
    number: number.value,
    email: email.value,
    phone: phone.value
  };
  localStorage.setItem("profileData", JSON.stringify(profileData));

  inputs.forEach(input => input.disabled = true);
  saveBtn.disabled = true;
  saveBtn.classList.remove("active");

  isEditing = false;
  editBtn.textContent = "✏ Edit";


  alert("บันทึกข้อมูลแล้ว");
});




