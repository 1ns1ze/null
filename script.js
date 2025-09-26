const form = document.getElementById("registerForm");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const closeModal = document.getElementById("closeModal");
const userName = document.getElementById("userName");

form.addEventListener("submit", function(event) {
  event.preventDefault(); 

  let firstname = document.getElementById("firstname").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (firstname === "" || email === "" || password === "") {
    alert("Please fill in all fields!");
    return;
  }

  userName.textContent = firstname;
  modal.style.display = "block";
});

closeBtn.onclick = function() {
  modal.style.display = "none";
}
closeModal.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
