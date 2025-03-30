import {
  auth,
  onAuthStateChanged,
  signOut,
  db,
  collection,
  getDocs,
} from "./firebase.js";

const desktopMenuButton = document.getElementById("desktop-menu-button");
const dropdownMenu = document.getElementById("dropdown-menu");
const logoutBtn = document.getElementById("logout-btn");
const mobileLogoutBtn = document.getElementById("mobile-logout-btn");
const filterSelect = document.getElementById("campaign-filter");
const campaignGrid = document.getElementById("campaign-grid");
const messageContainer = document.getElementById("message-container");

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

filterSelect.addEventListener("change", () => {
  loadCampaigns(filterSelect.value);
});

async function loadCampaigns(filter) {
  campaignGrid.innerHTML = "";
  messageContainer.innerHTML = "";
  messageContainer.classList.add("hidden");
  const shimmerCards = document.getElementById("shimmer-cards");
  shimmerCards.classList.remove("hidden");

  try {
    const querySnapshot = await getDocs(collection(db, "campaigns"));
    let campaigns = [];
    console.log(campaigns);
    querySnapshot.forEach((doc) => {
      campaigns.push({ id: doc.id, ...doc.data() });
    });

    if (filter === "my") {
      if (!auth.currentUser) {
        messageContainer.innerHTML = `
          <p>You need to log in to view your campaigns.</p>
          <a href="login.html" class="text-blue-400 hover:underline">Login here</a>
        `;
        messageContainer.classList.remove("hidden");
        shimmerCards.classList.add("hidden");
        return;
      } else {
        campaigns = campaigns.filter(
          (campaign) => campaign.creatorId === auth.currentUser.uid
        );
        if (campaigns.length === 0) {
          messageContainer.innerHTML = `
            <p>You don’t have any campaigns. Create a new one!</p>
            <a href="campaignForm.html" class="text-blue-400 hover:underline">Create Campaign</a>
          `;
          messageContainer.classList.remove("hidden");
          shimmerCards.classList.add("hidden");
          return;
        }
      }
    }

    let filteredCampaigns = campaigns;
    if (filter === "most-funded") {
      filteredCampaigns = campaigns.sort(
        (a, b) => (b.raised || 0) - (a.raised || 0)
      );
    } else if (filter === "newest") {
      filteredCampaigns = campaigns.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    filteredCampaigns.forEach((campaign) => {
      const campaignElement = `
        <div class="bg-gray-800 p-4 shadow shadow-gray-700 rounded-lg hover:shadow-lg transition-shadow duration-300">
          <img src="${campaign.imageUrl || "image"}" alt="${
        campaign.title
      }" class="w-full h-48 object-cover rounded" />
          <h2 class="text-xl font-semibold mt-2">${campaign.title}</h2>
          <p class="text-gray-400 text-sm mt-1">${campaign.description.substring(
            0,
            100
          )}...</p>
          <progress value="${campaign.raised || 0}" max="${
        campaign.goal
      }" class="w-full rounded-full h-2 mt-2"></progress>
          <p class="text-sm mt-1">$${campaign.raised || 0} of $${
        campaign.goal
      } raised</p>
          <a href="campaign.html?id=${
            campaign.id
          }" class="mt-2 text-blue-400 font-semibold">View Campaign →</a>
        </div>
      `;
      campaignGrid.insertAdjacentHTML("beforeend", campaignElement);
    });
  } catch (error) {
    console.error("Error loading campaigns:", error);
    messageContainer.innerHTML = `<p class="text-red-500">Failed to load campaigns. Please try again.</p>`;
    messageContainer.classList.remove("hidden");
  } finally {
    shimmerCards.classList.add("hidden");
  }
}

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
          window.location.href = "index.html";
        } catch (error) {
          console.error("Logout failed:", error);
          alert("Failed to log out. Please try again.");
        }
      });

      mobileLogoutBtn.addEventListener("click", async () => {
        try {
          await signOut(auth);
          window.location.href = "index.html";
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

    loadCampaigns(filterSelect.value);
  });
});
