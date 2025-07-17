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


## Getting Started
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your Firebase credentials in `.env`
4. Start the development server:
   ```bash
   npm run dev
   ```

## License
This project is available as an open source under the terms of the [MIT License][LICENSE]
