export interface FirebaseEntity {
  id: string;
}

export interface SgfFile extends FirebaseEntity {
  contents: string;
  userDisplayName: string;
  userId: string;
  userPhotoURL: string;
  uploadTimestamp: firebase.firestore.Timestamp;
}
