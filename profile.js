const form = document.getElementById("profileForm");
const fullname = document.getElementById("fullname");
const classInput = document.getElementById("class");
const number = document.getElementById("number");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const saveBtn = document.getElementById("saveBtn");
const editBtn = document.getElementById("editBtn");
const inputs = document.querySelectorAll("input");
const mouseLight = document.getElementById("mouse-light");

// ===== ฟังก์ชัน checkAuth =====
function redirectToLogin() {
  window.location.href = "index.html";
}

function checkAuth() {
  const sessionRaw = localStorage.getItem("session");
  if (!sessionRaw) redirectToLogin();

  let session;
  try {
    session = JSON.parse(sessionRaw);
  } catch {
    redirectToLogin();
  }

  // ตรวจ session หมดอายุ
  if (Date.now() > session.expireAt) {
    alert("Session หมดอายุ กรุณา login ใหม่");
    localStorage.removeItem("session");
    redirectToLogin();
  }

  return session;
}

// ===== เรียก checkAuth ก่อนโหลดหน้า =====
const session = checkAuth();

// lookup user ตาม userId ใน session
const userRaw = localStorage.getItem(`user_${session.userId}`);
if (!userRaw) redirectToLogin();
const user = JSON.parse(userRaw);

// ===== Load profile =====
const savedProfile = localStorage.getItem(`profile_${user.username}`);
if (savedProfile) {
  const data = JSON.parse(savedProfile);
  fullname.value = data.fullname || "";
  classInput.value = data.classLevel || "";
  number.value = data.number || "";
  email.value = data.email || "";
  phone.value = data.phone || "";
}

// ===== Snapshot ของค่าเดิม =====
let snapshot = {
  fullname: fullname.value,
  classLevel: classInput.value,
  number: number.value,
  email: email.value,
  phone: phone.value
};

let isEditing = false;

// ===== Enable Edit / Cancel =====
editBtn.addEventListener('click', () => {
  isEditing = !isEditing;
  inputs.forEach(input => input.disabled = !isEditing);
  saveBtn.disabled = !isEditing;

  if (!isEditing) {
    // Revert ค่าเดิม
    fullname.value = snapshot.fullname;
    classInput.value = snapshot.classLevel;
    number.value = snapshot.number;
    email.value = snapshot.email;
    phone.value = snapshot.phone;
    saveBtn.classList.remove("active");
  }

  editBtn.textContent = isEditing ? '✖ Cancel' : '✏ Edit';
});

// ===== ตรวจ form =====
function checkForm() {
  if (!isEditing) return;
  const isValid =
    fullname.value.trim() !== "" &&
    classInput.value.trim() !== "" &&
    number.value.trim() !== "" &&
    email.value.trim() !== "";
  saveBtn.disabled = !isValid;
  saveBtn.classList.toggle("active", isValid);
}

inputs.forEach(input => input.addEventListener("input", checkForm));

// ===== Save =====
form.addEventListener("submit", e => {
  e.preventDefault();
  const profileData = {
    fullname: fullname.value,
    classLevel: classInput.value,
    number: number.value,
    email: email.value,
    phone: phone.value
  };
  localStorage.setItem(`profile_${user.username}`, JSON.stringify(profileData));

  // อัปเดต snapshot
  snapshot = { ...profileData };

  inputs.forEach(input => input.disabled = true);
  saveBtn.disabled = true;
  saveBtn.classList.remove("active");

  isEditing = false;
  editBtn.textContent = "✏ Edit";

  alert("บันทึกข้อมูลแล้ว");
});

// ===== Mouse light =====
document.addEventListener("mousemove", e => {
  mouseLight.style.background = `
    radial-gradient(
      circle at ${e.clientX}px ${e.clientY}px,
      rgba(255, 255, 255, 0.2),
      rgba(0, 0, 0, 0.6) 40%
    )
  `;
});
