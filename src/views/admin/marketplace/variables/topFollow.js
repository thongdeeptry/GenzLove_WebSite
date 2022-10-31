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
const reference = ref(db, "users");
onValue(reference, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const id = childSnapshot.child("id").exportVal();
    const name = childSnapshot.child("name").exportVal();
    const follow = childSnapshot.child("follow").exportVal();
    const avt = childSnapshot.child("avt").exportVal();
    if (follow > 10) {
      data.push({
        id: id,
        name: name,
        follow: follow,
        avt: avt,
      });
    }
  });

  console.log("Report data: ", data);
});
export const follow = data;
