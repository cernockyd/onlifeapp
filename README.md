# Onlife

## How to use

Set up Firebase:

- Create a project at the [Firebase console](https://console.firebase.google.com/).
- Get your account credentials from the Firebase console at _Project settings > Service accounts_, where you can click on _Generate new private key_ and download the credentials as a json file. It will contain keys such as `project_id`, `client_email` and `client_id`. Set them as environment variables in the `.env` file at the root of this project.
- Get your authentication credentials from the Firebase console under _Project settings > General> Your apps_ Add a new web app if you don't already have one. Under _Firebase SDK snippet_ choose _Config_ to get the configuration as JSON. It will include keys like `apiKey`, `authDomain` and `databaseUrl`. Set the appropriate environment variables in the `.env` file at the root of this project.

Install it and run:

```bash
npm install
npm run dev
```

Firebase tricks

```bash
firebase deploy --only functions:
```

Patching tricks

```bash
yarn patch-package --exclude ^$ --include package.json react-firebaseui
```

## Todo

- [ ] known bug: apollo client ssr not passing context (header cookie): https://github.com/apollographql/apollo-client/issues/5089
- [x] fix withApollo usage
- [x] setup and try firestore connection: apollo-link-cloud-firestore
- [ ] add example env to git
- [ ] nprogress
- [ ] check lib and utils for unused code

## Quiz workflow

1. Žák přistoupí na stránku kvízu. Z url se veme ID kvízu.
2. V databázi se vytvoří pokus o vyplnění kvízu.
3. Id pokusu se předvyplní v URL wireframu.
4. Žák vyplní kvíz. Odeslaný kvíz se pošle do results databáze.

## Other

Illustrations are from https://undraw.co/illustrations
