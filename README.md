# [Showcase](https://joesprojects.vercel.app)

A refreshed version of [my old project showcase website](https://joe.js.org/projects)

## Features
- Add, edit, and delete projects
- Image and video carousel for each project
- Responsive design
- Firebase backend for data, auth, and storage

## Comparison 

| Feature          | Old Showcase         | New Showcase          |
|------------------|----------------------|-----------------------|
| Authentication   | No                   | With Firebase         |
| Database         | Pull from Github CDN | Firestore Database    |
| Carousel         | ✅                   | ✅                   | 
| Edit/Delete Projects | ❎               | ✅                    |
| Filtering/Search | ❎                   | ✅                   |


## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/leecheeyong/showcase.git
   cd showcase
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable **Authentication** (Email/Password).
   - Set up **Cloud Firestore** in test mode (or with secured rules).
   - Edit the `src/firebase.js` file, replace with your Firebase credentials
4. Start the development server:
   ```bash
   npm run dev
   ```

## License
This project is available as an open source under the terms of the [MIT License](LICENSE)
