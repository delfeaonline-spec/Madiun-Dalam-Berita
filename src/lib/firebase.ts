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
    const res = await fetch(`/api/db/get?collection=${encodeURIComponent(collectionName)}`);
    if (res.ok) {
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        console.log(`[Proxy DB] Successfully fetched collection ${collectionName} via Server Proxy (${result.data.length} items)`);
        return result.data as T[];
      }
    }
  } catch (error) {
    console.warn(`[Proxy DB] Fetch collection ${collectionName} failed, falling back to direct Firestore:`, error);
  }

  // Client-side fallback if server-side proxy is unavailable or fails
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const items: T[] = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ ...docSnap.data() } as T);
    });
    return items;
  } catch (error) {
    console.error(`[Firebase Client Fallback] Error fetching collection ${collectionName}:`, error);
    return [];
  }
}

// Generic function to set/save a document
export async function saveDocument(collectionName: string, docId: string, data: any): Promise<void> {
  try {
    const res = await fetch(`/api/db/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collectionName, docId, data })
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success) {
        console.log(`[Proxy DB] Successfully saved document ${collectionName}/${docId} via Server Proxy`);
        return;
      }
    }
  } catch (error) {
    console.warn(`[Proxy DB] Save document ${collectionName}/${docId} failed, falling back to direct Firestore:`, error);
  }

  // Client-side fallback if server-side proxy is unavailable
  try {
    await setDoc(doc(db, collectionName, docId), data);
  } catch (error) {
    console.error(`[Firebase Client Fallback] Error saving document to ${collectionName}/${docId}:`, error);
    throw error;
  }
}

// Generic function to delete a document
export async function deleteDocument(collectionName: string, docId: string): Promise<void> {
  try {
    const res = await fetch(`/api/db/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collectionName, docId })
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success) {
        console.log(`[Proxy DB] Successfully deleted document ${collectionName}/${docId} via Server Proxy`);
        return;
      }
    }
  } catch (error) {
    console.warn(`[Proxy DB] Delete document ${collectionName}/${docId} failed, falling back to direct Firestore:`, error);
  }

  // Client-side fallback if server-side proxy is unavailable
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error(`[Firebase Client Fallback] Error deleting document from ${collectionName}/${docId}:`, error);
    throw error;
  }
}

// Synchronize local state array to Firestore collection atomically
export async function syncListToCollection<T extends { id: any }>(collectionName: string, localList: T[]): Promise<void> {
  try {
    const res = await fetch(`/api/db/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collectionName, list: localList })
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success) {
        console.log(`[Proxy DB] Successfully synchronized collection ${collectionName} via Server Proxy (${localList.length} items)`);
        return;
      }
    }
  } catch (error) {
    console.warn(`[Proxy DB] Synchronization of collection ${collectionName} failed, falling back to direct Firestore:`, error);
  }

  // Client-side fallback if server-side proxy is unavailable
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
    console.log(`[Firebase Client Fallback] Synchronized ${collectionName} collection (${localList.length} items)`);
  } catch (error) {
    console.error(`[Firebase Client Fallback] Error synchronizing collection ${collectionName}:`, error);
  }
}
