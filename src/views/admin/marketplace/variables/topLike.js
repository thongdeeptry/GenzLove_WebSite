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

      data.push({
        id: id,
        image: image,
        name: name,
        user: user,
        noidung: noidung,
        like: like,
        thaotac: user + "/" + id,
      });
    });
  });
  console.log("Post data: ", data);
});
export const like = data;
