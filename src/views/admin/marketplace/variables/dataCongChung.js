/** @format */

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
    const namepr = childSnapshot.child("name").val();
    const avtpr = childSnapshot.child("avt").val();
    const tuoipr = childSnapshot.child("tuoi").val();
    const diachipr = childSnapshot.child("diachi").val();
    const ngaysinhpr = childSnapshot.child("ngaysinh").val();
    const gioitinhpr = childSnapshot.child("gioitinh").val();
    const fl = childSnapshot.child("follow").val();
    const nghe = childSnapshot.child("nghenghiep").val();
    const id = childSnapshot.child("id").val();
    const tick = childSnapshot.child("tick").val();
    if (tick == "true") {
      data.push({
        id: id,
        name: namepr,
        follow: fl,
        avt: avtpr,
        tuoi: tuoipr,
        diachi: diachipr,
        gioitinh: gioitinhpr,
        ngaysinh: ngaysinhpr,
        nghenghiep: nghe,
        tick: tick,
      });
    }
  });
  console.log("Report data: ", data);
});
export const congchung = data;
