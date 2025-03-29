###### Video 👇

[Project Go Through](https://drive.google.com/file/d/1Y9zTPpQtgThr-apgbA_gBzAJOJCzfFZ0/view?usp=sharing)

- [How to Setup](https://github.com/sameersheikh2/CrowdFund?tab=readme-ov-file#how-to-set-it-up)
- [Reason why I've not deployed it yet](https://github.com/sameersheikh2/CrowdFund?tab=readme-ov-file#why-not-deployed?)

# CrowdFund🚀

Welcome to **CrowdFund**! This is a web-based crowdfunding platform where people can create campaigns, browse exciting projects, and support ideas they love. It’s built with modern tools to make funding dreams smooth and fun. As of March 29, 2025, it’s still a **work-in-progress (WIP)**—think of it as a sneak peek! We’ve got some solid features up and running, with more cool stuff on the way.

## What’s Working Right Now ✅

Here’s what you can play with today:

- **Sign Up & Log In**: Create an account or sign in with email and password, powered by Firebase Authentication.
- **Create Campaigns**: Logged-in users can start their own campaigns—add a title, description, funding goal, duration, category, and even an image.
- **Explore Campaigns**: Check out all the campaigns on an explore page. Filter them by "All," "My Campaigns," "Most Funded," or "Newest."
- **Looks Good Everywhere**: The design adapts to your screen—whether you’re on a phone or desktop—thanks to Tailwind CSS and a handy hamburger menu for mobile.
- **Real-Time Magic**: Campaigns save and update instantly with Firebase Firestore.
- **Live Preview**: See how your campaign card looks as you create it.

## Where We’re At ⚒️

CrowdFund isn’t finished yet. The basics—like signing in and managing campaigns—are ready to go, but some features (like drag-and-drop uploads or detailed campaign pages) are still on the drawing board. It’s a showcase of what’s possible, with more to come!

## The Tech Behind It ⚙️

Here’s what powers CrowdFund:

- **Frontend**: HTML5, Tailwind CSS for styling, and JavaScript (using ES6 modules).
- **Backend**: Firebase handles authentication, Firestore stores data, and Storage keeps the images.

## How to Set It Up👨‍🏫

Want to try it out? Here’s how to get CrowdFund running on your machine:

### What You’ll Need

- **Firebase Account**: You’ll need a free account and a project set up.
- **Git**: To grab the code.

### Steps

1.  **Grab the Code**:
    Open your terminal and run:
    `bash
git clone <https://github.com/your-username/crowdfund.git>
cd crowdfund
`
2.  **Set Up Firebase**: - Head to the [Firebase Console](https://console.firebase.google.com/) and create a new project. - Turn on Authentication (pick Email/Password), Firestore, and Storage. - Find your Firebase config (in Project Settings > General > Your Apps—it’s a chunk of code with apiKey, authDomain, etc.). - Open js/firebase.js in the project folder and swap the placeholder config with yours, like this:
    javascript
    `const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};`
3.  **No Extra Installs Needed**:
    - We’re using Firebase and Tailwind via CDNs, so no npm install yet.
4.  **Run It Locally**:
    - Fire up a local server. You can use VS Code’s Live Server or type this in your terminal:
      bash
      `npx http-server`
    - Open your browser and go to http://localhost:8080. You’re in!

## How to Use It

Here’s how to kick the tires:

- **Sign Up or Log In**: Visit signup.html or login.html to get started.
- **Start a Campaign**: Head to campaignForm.html (you’ll need to be logged in) and fill out the form.
- **Browse Campaigns**: Go to campaigns.html to see what’s out there—play with the filters!
- **Log Out**: Click the dropdown menu (on desktop or mobile) to sign out.

## Heads-Up: Known Quirks

It’s not perfect yet. Here’s what to watch out for:

- The "Most Funded" and "Newest" filters need raised and createdAt data in Firestore, which might not be fully set up.
- Image uploads are basic—just a simple <input> with no progress bar or drag-and-drop.
- The campaign details page (campaignDetail.html) isn’t built yet.

## What’s Next

We’ve got big plans to make CrowdFund even better:

- Drag-and-drop file uploads with progress bars and error messages.
- A full campaign page where you can donate and see more details.
- **Supporter Interaction Features :** A live comment section, real-time updates, and supporter recognition.
- Implement push notifications for supporters to receive updates on the campaigns they've donated to, such as new milestones or reward tiers being unlocked.
- An engaging stats overview showing the total amount raised, number of backers, average donation, and time left for the campaign.

## Want to Help?😇

This is a learning project, so I’d love your thoughts! Feel free to fork the repo, tinker with it, and send pull requests or ideas my way.

## Why not deployed?

As this project includes my Firebase configuration and I don't know how to protect it while uploading (I only know how to do this using Node.js), I am still exploring the options and will update you soon regarding this.
