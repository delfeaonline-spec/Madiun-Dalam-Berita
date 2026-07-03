import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Generic function to fetch all documents from a collection
export async function fetchCollectionData<T>(collectionName: string): Promise<T[]> {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const items: T[] = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ ...docSnap.data() } as T);
    });
    return items;
  } catch (error) {
    console.error(`[Firebase] Error fetching collection ${collectionName}:`, error);
    return [];
  }
}

// Generic function to set/save a document
export async function saveDocument(collectionName: string, docId: string, data: any): Promise<void> {
  try {
    await setDoc(doc(db, collectionName, docId), data);
  } catch (error) {
    console.error(`[Firebase] Error saving document to ${collectionName}/${docId}:`, error);
    throw error;
  }
}

// Generic function to delete a document
export async function deleteDocument(collectionName: string, docId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error(`[Firebase] Error deleting document from ${collectionName}/${docId}:`, error);
    throw error;
  }
}

// Synchronize local state array to Firestore collection atomically
export async function syncListToCollection<T extends { id: any }>(collectionName: string, localList: T[]): Promise<void> {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const existingDocs = new Map<string, any>();
    querySnapshot.forEach((docSnap) => {
      existingDocs.set(docSnap.id, docSnap.data());
    });

    const batch = writeBatch(db);
    const localIds = new Set<string>();

    localList.forEach((item) => {
      const docId = item.id.toString();
      localIds.add(docId);
      batch.set(doc(db, collectionName, docId), item);
    });

    existingDocs.forEach((_, docId) => {
      if (!localIds.has(docId)) {
        batch.delete(doc(db, collectionName, docId));
      }
    });

    await batch.commit();
    console.log(`[Firebase] Synchronized ${collectionName} collection (${localList.length} items)`);
  } catch (error) {
    console.error(`[Firebase] Error synchronizing collection ${collectionName}:`, error);
  }
}

