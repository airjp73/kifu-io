export interface FirebaseEntity {
  id: string;
}

export type NewEntity<T> = Omit<T, 'id'>;

export interface SgfFile extends FirebaseEntity {
  contents: string;
  userDisplayName?: string;
  userId?: string;
  userPhotoURL?: string;
  uploadTimestamp: firebase.firestore.Timestamp;
}
