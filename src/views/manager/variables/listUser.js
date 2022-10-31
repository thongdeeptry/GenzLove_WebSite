import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "../../../config";
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
    const source = childSnapshot.child("avt").exportVal();
    const tuoi = childSnapshot.child("tuoi").exportVal();
    const diachi = childSnapshot.child("diachi").exportVal();
    const follow = childSnapshot.child("follow").exportVal();
    const gioitinh = childSnapshot.child("gioitinh").exportVal();
    const nghenghiep = childSnapshot.child("nghenghiep").exportVal();
    const ngaysinh = childSnapshot.child("ngaysinh").exportVal();
    const thaotac = childSnapshot.child("thaotac").exportVal();
    const trangthai = childSnapshot.child("trangthai").exportVal();
    data.push({
      id: id,
      name: name,
      source: source,
      tuoi: tuoi,
      diachi: diachi,
      follow: follow,
      gioitinh: gioitinh,
      nghenghiep: nghenghiep,
      ngaysinh: ngaysinh,
      thaotac: thaotac,
      trangthai: trangthai,
    });
  });

  console.log("User data: ", data);
});
export const pets = data;
