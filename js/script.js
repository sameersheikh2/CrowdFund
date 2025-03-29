import { auth, onAuthStateChanged, signOut } from "./firebase.js";

const desktopMenuButton = document.getElementById("desktop-menu-button");
const dropdownMenu = document.getElementById("dropdown-menu");
const logoutBtn = document.getElementById("logout-btn");
const mobileLogoutBtn = document.getElementById("mobile-logout-btn");

let isOpen = false;

desktopMenuButton.addEventListener("click", () => {
  if (isOpen) {
    dropdownMenu.classList.add("hidden");
    isOpen = false;
  } else {
    dropdownMenu.classList.remove("hidden");
    isOpen = true;
  }
});

window.addEventListener("load", () => {
  onAuthStateChanged(auth, (user) => {
    const desktopUserOptions = document.getElementById("desktop-user-options");
    const mobileUserOptions = document.getElementById("mobile-user-options");
    const mobileLogin = document.getElementById("mobile-login");

    if (user) {
      desktopUserOptions.classList.remove("hidden");
      mobileUserOptions.classList.remove("hidden");
      mobileLogin.classList.add("hidden");
      document.getElementById("login-button").classList.add("hidden");

      desktopMenuButton.innerHTML = `
        ${user.email}
        <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 0 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>`;

      logoutBtn.addEventListener("click", async () => {
        try {
          await signOut(auth);
          window.location.href = "login.html";
        } catch (error) {
          console.error("Logout failed:", error);
          alert("Failed to log out. Please try again.");
        }
      });

      mobileLogoutBtn.addEventListener("click", async () => {
        try {
          await signOut(auth);
          window.location.href = "login.html";
        } catch (error) {
          console.error("Logout failed:", error);
          alert("Failed to log out. Please try again.");
        }
      });
    } else {
      desktopUserOptions.classList.add("hidden");
      mobileUserOptions.classList.add("hidden");
      mobileLogin.classList.remove("hidden");
      document.getElementById("login-button").classList.remove("hidden");
    }
  });
});
