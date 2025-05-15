// apps/ease/src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAL1kM9By3jbFbtPTS6oY4QWN-BIKzouIA',
  authDomain: 'ease-project-007.firebaseapp.com',
  projectId: 'ease-project-007',
};

export const firebaseApp = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
