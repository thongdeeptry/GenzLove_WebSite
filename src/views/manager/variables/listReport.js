import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "../../../config";
const app = initializeApp(firebaseConfig);
const data = [];
if (!app.length) {
  console.log("Kết nối thành công");
}

const db = getDatabase();
const reference = ref(db, "reports");
onValue(reference, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const id = childSnapshot.child("id").exportVal();
    const noidung = childSnapshot.child("noidung").exportVal();
    const id_send = childSnapshot.child("id_send").exportVal();
    const id_vipham = childSnapshot.child("id_vipham").exportVal();
    const trangthai = childSnapshot.child("trangthai").exportVal();
    const phanhoi = childSnapshot.child("phanhoi").exportVal();
    const link = childSnapshot.child("link").exportVal();
    const thaotac = childSnapshot.child("thaotac").exportVal();
    data.push({
      id: id,
      noidung: noidung,
      id_send: id_send,
      id_vipham: id_vipham,
      trangthai: trangthai,
      phanhoi: phanhoi,
      link: link,
      thaotac: thaotac,
    });
  });

  console.log("Report data: ", data);
});
export const report = data;
