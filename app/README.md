# React App for Drupal 10

This is a React app that provides a foundation for building web applications with pre-configured features. The app includes routing, API data fetching, a header and footer, a basic hero section, and a custom 404 page.

## Features

- **Routing:** The app is set up with react-router for easy navigation between different pages.

- **API Fetching:** It demonstrates how to fetch data from an API using \`useQuery\`.

- **Header and Footer:** A common header and footer are included across all pages for consistent navigation and information.

- **Basic Hero Section:** The app includes a simple hero section, which can be customized to showcase key content.

- **404 Page:** A custom 404 page is set up to handle any routes that do not match the existing ones.

## Prerequisites

Before you begin, make sure you have the following repositories cloned and dependencies installed. Note that these repositories are needed for Drupal integration, but the app will work without them.

1. Drupal 10 rest API module https://github.com/serhii-shandaliuk/mck_rest_apis

2. Drupal 10 theme https://github.com/serhii-shandaliuk/blue_theme

## Getting Started

Follow these steps to get the app up and running:

1. **Install Dependencies:**

```sh
cd app
```

```sh
npm i
```

2. **Start the Development Server:**

```sh
npm run dev
```

3. **Access the App:**

Open your web browser and navigate to http://localhost:5173 to see the app in action.

4. **Build the App:**

To prepare the app for integration with Drupal, ensure that the app's root directory is on the same level as the `web` folder in your Drupal installation. Then run the following command:

```sh
npm run build
```

This command will copy all icons, images, and fonts into the appropriate folders within Drupal. It will also create JS and CSS bundles and place them into your Drupal theme. For additional information, refer to the `package.json` file.

5. **Configuration for Drupal Integration:**

Before integrating the app with Drupal, follow these steps:

- Copy the `.env.example` file to `.env` in the root directory of the app.
- Open the `.env` file and update the `VITE_APP_API_URL` variable with the correct local Drupal link.

If you plan to work with Drupal, consider adding the following lines of code to your Drupal setup in `settings.local.php` file to prevent CORS issues:

```php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

## Customize and Extend

Feel free to customize and extend this app to fit your project's requirements. You can modify the existing components, add new pages, integrate additional libraries, and style the app according to your design.

- Routing is handled in this file `app/src/routing/index.jsx`
- If a new field is created in the Drupal side, the API will be updated, and data for this field will appear in pre-existing components. For example, in the case-studies component `app/src/components/paragraphs/case-studies/index.jsx`. When you open the file, you will see `const CaseStudies = ({ data }) => {` where `data` is the data fetched from the API.
- If you create a new paragraph, you need to define/export it in the theme. Open the file `app/src/components/paragraphs/index.js` (export), simply copy any of the already created paragraphs and just rename it appropriately. Please note, for readability, paragraph names are sorted in alphabetical order; please follow this rule. The next step is to define your paragraph here `app/src/components/layout/paragraphs/index.jsx`, which is also simple. You just need to copy any existing paragraph and update the naming. Please note that in the `variations` array, the key is the machine name of the paragraph in Drupal. Now, simply create your paragraph here `app/src/components/paragraphs`. You can just copy sample paragraph `app/src/components/paragraphs/_sample` and adjust it accordingly. Note that there is a `data` prop that contains all the data coming from the Drupal API.
- To update styles on the /hire pages, please use the `app/src/app/styles/hire.scss` file. To watch the file, use the command from `package.json` -> `npm run sass:watch`. After changes have been made, please run `npm run build`.
