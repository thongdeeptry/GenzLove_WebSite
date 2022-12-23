import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  orderByValue,
  orderByKey,
  limitToLas,
} from "firebase/database";
import { firebaseConfig } from "../../../../config";
const app = initializeApp(firebaseConfig);
const data = [];
if (!app.length) {
  console.log("Kết nối thành công");
}

const db = getDatabase();
const reference = ref(db, "post");
onValue(reference, (snapshot) => {
  snapshot.forEach((childSnapshotq) => {
    childSnapshotq.forEach((childSnapshot) => {
      const id = childSnapshot.child("id").exportVal();
      const name = childSnapshot.child("noidung").exportVal();
      const follow = childSnapshot.child("like").exportVal();
      const avt = childSnapshot.child("avt").exportVal();
      if (follow > 2) {
        data.push({
          id: id,
          noidung: name,
          like: follow,
        });
      }
    });
  });
  console.log("Report data: ", data);
});
export const like = data;
