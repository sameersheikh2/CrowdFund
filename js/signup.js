import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "./firebase.js";
import { auth } from "./firebase.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  const confirmPassword = e.target[2].value;
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerHTML = "";
  if (!passwordValidate(password, confirmPassword)) {
    errorMessage.innerText = "Passwords doesn't match.";
  } else {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      window.location.href = "index.html";
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        errorMessage.innerText = "This email is already in use.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage.innerText = "Invalid email.";
      } else if (error.code === "auth/weak-password") {
        errorMessage.innerText =
          "Password should be at least 6 characters long.";
      } else {
        errorMessage.innerText = "Something went wrong. Please try again.";
      }
    }
  }
});

function passwordValidate(firstPass, secondPass) {
  return firstPass.trim() === secondPass.trim();
}
