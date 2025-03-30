import {
  auth,
  onAuthStateChanged,
  signOut,
  db,
  collection,
  addDoc,
} from "./firebase.js";

const loginButton = document.getElementById("login-button");
const desktopUserOptions = document.getElementById("desktop-user-options");
const desktopMenuButton = document.getElementById("desktop-menu-button");
const dropdownMenu = document.getElementById("dropdown-menu");
const logoutBtn = document.getElementById("logout-btn");

let isOpen = false;
let timer;

window.addEventListener("load", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginButton.classList.add("hidden");
      desktopUserOptions.classList.remove("hidden");
      desktopMenuButton.innerHTML = `
        ${user.email}
        <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>`;
      desktopMenuButton.addEventListener("click", () => {
        if (isOpen) {
          dropdownMenu.classList.add("hidden");
          isOpen = false;
        } else {
          dropdownMenu.classList.remove("hidden");
          isOpen = true;
        }
      });
      logoutBtn.addEventListener("click", async () => {
        try {
          await signOut(auth);
          window.location.href = "index.html";
        } catch (error) {
          console.error("Logout failed:", error);
          alert("Failed to log out. Please try again.");
        }
      });
    } else {
      window.location.href = "login.html";
    }
  });

  updatePreview();
});

const formInputs = [
  document.getElementById("title"),
  document.getElementById("description"),
  document.getElementById("goal"),
  document.getElementById("image"),
];
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(updatePreview, 300);
  });
  if (input.id === "image") {
    input.addEventListener("change", updatePreview);
  }
});

function updatePreview() {
  const title = document.getElementById("title").value || "Your Campaign Title";
  const description =
    document.getElementById("description").value ||
    "Describe your campaign in detail...";
  const goal = parseFloat(document.getElementById("goal").value) || 100;
  const imageFile = document.getElementById("image").files[0];

  document.getElementById("preview-title").textContent = title;
  document.getElementById("preview-description").textContent =
    description.substring(0, 100) + (description.length > 100 ? "..." : "");
  document.getElementById("preview-progress").max = goal;
  document.getElementById("preview-progress").value = 0;
  document.getElementById(
    "preview-funding"
  ).textContent = `$0 of $${goal} raised`;
}

document
  .getElementById("campaign-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    document.getElementById("loading-container").classList.remove("hidden");

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const goal = parseFloat(document.getElementById("goal").value);
    const duration = parseInt(document.getElementById("duration").value, 10);
    const category = document.getElementById("category").value;
    const imageFile = document.getElementById("image").files[0];

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      await addDoc(collection(db, "campaigns"), {
        title,
        description,
        goal,
        duration,
        category,
        raised: 0,
        creatorId: user.uid,
        createdAt: new Date().toISOString(),
      });

      alert("Campaign created successfully!");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign. Please try again.");
    } finally {
      document.getElementById("loading-container").classList.add("hidden");
    }
  });

document.getElementById("cancel-button").addEventListener("click", () => {
  window.location.href = "index.html";
});
