function encodeToRot13(str) {
  return str.replace(/[A-Za-z]/g, c =>
    String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)
  );
}
function decodeRot13(str) {
  return encodeToRot13(str);
}
const userFirstNameInput = document.getElementById("name");
const userLastNameInput = document.getElementById("surname");
const userPasswordInput = document.getElementById("password");
const checkPass = document.getElementById("check");
const form = document.getElementById("form");
if (checkPass) {
  checkPass.addEventListener("change", () => {
    userPasswordInput.type = checkPass.checked ? "text" : "password";
  });
}
let users = [
  { name: "Student1", surname: "SurnameStd1", password: "409kbSTD" },
  { name: "Student2", surname: "SurnameStd2", password: "410kbSTD" },
];
let admin = { name: "Admin", surname: "Adminov", password: "admin04072006" };
function massSfr(arr) {
  return arr.map(s => ({
    name: encodeToRot13(s.name),
    surname: encodeToRot13(s.surname),
    password: encodeToRot13(s.password)
  }));
}
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const inputName = userFirstNameInput.value.trim();
    const inputSurname = userLastNameInput.value.trim();
    const inputPass = userPasswordInput.value.trim();
    let lsUsers = JSON.parse(localStorage.getItem("userInformation") || "[]");
    if (inputName === admin.name && inputSurname === admin.surname && inputPass === admin.password) {
      localStorage.setItem("isAdmin", JSON.stringify(true));
      window.location.href = "admin.html";
      return;
    }
    lsUsers.push({ name: inputName, surname: inputSurname, password: inputPass });
    localStorage.setItem("userInformation", JSON.stringify(massSfr(lsUsers)));
    localStorage.setItem("isAdmin", JSON.stringify(false));
    window.location.href = "user.html";
  });
}
if (window.location.pathname.endsWith("admin.html")) {
  let usersData = JSON.parse(localStorage.getItem("userInformation")) || [];
  const table = document.getElementById("userTable");
  usersData.forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${decodeRot13(u.name)}</td><td>${decodeRot13(u.surname)}</td><td>${decodeRot13(u.password)}</td>`;
    table.appendChild(tr);
  });
}
function logout() {
  localStorage.removeItem("isAdmin");
  window.location.href = "index.html";
}
