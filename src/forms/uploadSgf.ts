import firebase, { User } from 'firebase/app';
import firebaseApp from 'api/firebase';
import { NewEntity, SgfFile } from 'api/apiDataTypes';

const firestore = firebaseApp.firestore();

async function uploadSgf(sgf: string, currentUser?: User): Promise<string> {
  const newDocument = firestore.collection('sgfFiles').doc();
  if (!sgf) throw new Error('Cannot upload an empty sgf');

  const sgfFile: NewEntity<SgfFile> = {
    contents: sgf,
    uploadTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    userId: currentUser?.uid,
    userPhotoURL: currentUser?.photoURL ?? undefined,
    userDisplayName: currentUser?.displayName ?? undefined,
  };

  try {
    await newDocument.set(sgfFile);
    return newDocument.id;
  } catch (error) {
    throw error;
  }
}

export default uploadSgf;
