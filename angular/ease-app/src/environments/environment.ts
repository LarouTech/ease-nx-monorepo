import { FirebaseOptions } from 'firebase/app';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  firebaseConfig: {
    apiKey: 'AIzaSyAL1kM9By3jbFbtPTS6oY4QWN-BIKzouIA',
    authDomain: 'ease-project-007.firebaseapp.com',
    projectId: 'ease-project-007',
    storageBucket: 'ease-project-007.firebasestorage.app',
    messagingSenderId: '1051682993663',
    appId: '1:1051682993663:web:d99923d54b338795eaa3ca',
  } as FirebaseOptions,
};
