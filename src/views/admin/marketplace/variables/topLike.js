import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "../../../../config";
const app = initializeApp(firebaseConfig);
const data = [];
if (!app.length) {
  console.log("Kết nối thành công");
}

const db = getDatabase();
const reference = ref(db, "post");
onValue(reference, (snapshot) => {
  snapshot.forEach((childSnapshot1) => {
    childSnapshot1.forEach((childSnapshot) => {
      const id = childSnapshot.child("id").exportVal();
      const image = childSnapshot.child("image").exportVal();
      const name = childSnapshot.child("name").exportVal();
      const like = childSnapshot.child("like").exportVal();
      const user = childSnapshot.child("user").exportVal();
      const noidung = childSnapshot.child("noidung").exportVal();
      if (like > 3) {
        data.push({
          id: id,
          noidung: noidung,
          like: like,
        });
      }
    });
  });
  console.log("like data: ", data);
});
export const like = data;
