import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "../../../config";
const app = initializeApp(firebaseConfig);
const data = [];
if (!app.length) {
  console.log("Kết nối thành công");
}

const db = getDatabase();
const reference = ref(db, "support/tickblue");
onValue(reference, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const id = childSnapshot.child("id").exportVal();
    const noidung = childSnapshot.child("noidung").exportVal();
    const name = childSnapshot.child("name").exportVal();
    const lydokhac = childSnapshot.child("lydokhac").exportVal();
    const trangthai = childSnapshot.child("trangthai").exportVal();
    const link = childSnapshot.child("link").exportVal();
    const thaotac = childSnapshot.child("thaotac").exportVal();
    data.push({
      id: id,
      noidung: noidung,
      name: name,
      lydokhac: lydokhac,
      trangthai: trangthai,
      link: link,
      thaotac: thaotac,
    });
  });

  console.log("Tick data: ", data);
});
export const tickblue = data;
