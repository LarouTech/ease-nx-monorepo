import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { inject, Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firebaseService = inject(FirebaseService);
  db: Firestore;

  constructor() {
    this.db = this.firebaseService.getFirestoreInstance();
  }

  private formatErrorMessage(
    operation: string,
    collectionName: string,
    id: string | null,
    originalError: unknown
  ): string {
    const baseMessage = `Firestore ${operation} operation failed on collection '${collectionName}'${
      id ? `, document ID '${id}'` : ''
    }.`;
    if (originalError instanceof Error) {
      return `${baseMessage} Reason: ${originalError.message}`;
    }
    return baseMessage;
  }

  async create(
    document: DocumentData,
    collectionName: string
  ): Promise<string> {
    try {
      await addDoc(collection(this.db, collectionName), document);
      return `Document successfully added to collection: ${collectionName}`;
    } catch (error) {
      throw new Error(
        this.formatErrorMessage('create', collectionName, null, error)
      );
    }
  }

  async set(
    documentRef: DocumentReference<DocumentData, DocumentData>,
    document: DocumentData
  ): Promise<void> {
    try {
      await setDoc(documentRef, document);
    } catch (error) {
      throw new Error(
        this.formatErrorMessage('set', documentRef.path, null, error)
      );
    }
  }

  async readAll<T>(collectionName: string): Promise<T> {
    try {
      const querySnapshot = await getDocs(collection(this.db, collectionName));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T;
    } catch (error) {
      throw new Error(
        this.formatErrorMessage('readAll', collectionName, null, error)
      );
    }
  }

  async readById<T>(collectionName: string, id: string): Promise<T> {
    try {
      const docRef = doc(this.db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      } else {
        // Return null silently if not found (or you can throw error if preferred)
        return null as T;
      }
    } catch (error) {
      throw new Error(
        this.formatErrorMessage('readById', collectionName, id, error)
      );
    }
  }

  async queryBy<T>(
    field: string,
    value: string,
    collectionName: string
  ): Promise<T[]> {
    try {
      const myCollection = collection(this.db, collectionName);
      const q = query(myCollection, where(field, '==', value));
      const snapshot = await getDocs(q);

      // Return raw data
      return snapshot.docs.map((doc) => ({
        id: doc.id, // include document ID if needed
        ...doc.data(), // spread the document fields
      })) as T[];
    } catch (error: any) {
      throw new Error(
        this.formatErrorMessage(
          'query',
          collectionName,
          field,
          error?.message || error
        )
      );
    }
  }

  async update(
    collectionName: string,
    id: string,
    updatedData: DocumentData
  ): Promise<string> {
    try {
      const docRef = doc(this.db, collectionName, id);
      await updateDoc(docRef, updatedData);
      return `Document ${id} successfully updated in collection: ${collectionName}`;
    } catch (error) {
      throw new Error(
        this.formatErrorMessage('update', collectionName, id, error)
      );
    }
  }

  async delete(collectionName: string, id: string): Promise<string> {
    try {
      const docRef = doc(this.db, collectionName, id);
      await deleteDoc(docRef);
      return `Document ${id} successfully deleted from collection: ${collectionName}`;
    } catch (error) {
      throw new Error(
        this.formatErrorMessage('delete', collectionName, id, error)
      );
    }
  }
}
