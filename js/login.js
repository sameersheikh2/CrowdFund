import { signInWithEmailAndPassword, onAuthStateChanged } from "./firebase.js";
import { auth } from "./firebase.js";

const loader = document.getElementById("loader");

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerText = "";
  try {
    document.getElementById("login-form").classList.add("hidden");
    loader.classList.remove("hidden");
    await signInWithEmailAndPassword(auth, email, password);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User", user.email);
      } else {
        console.log("No user logged in");
      }
    });
    localStorage.setItem(
      "user",
      JSON.stringify({ uid: user.uid, email: user.email })
    );
    window.location.href = "index.html";
  } catch (error) {
    errorMessage.innerText = "Invalid Email or Password.";
  } finally {
    document.getElementById("login-form").classList.remove("hidden");
    loader.classList.add("hidden");
  }
});
