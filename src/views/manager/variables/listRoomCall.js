import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "../../../config";
const app = initializeApp(firebaseConfig);
const data = [];
if (!app.length) {
  console.log("Kết nối thành công");
}

const db = getDatabase();
const reference = ref(db, "roomCall");
onValue(reference, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const channel = childSnapshot.child("channel").exportVal();
    const songuoi = childSnapshot.child("songuoi").exportVal();
    const name = childSnapshot.child("name").exportVal();
    const token = childSnapshot.child("token").exportVal();
    const uid = childSnapshot.child("uid").exportVal();
    const ngaytao = childSnapshot.child("ngaytao").exportVal();
    const trangthai = childSnapshot.child("trangthai").exportVal();

    data.push({
      channel: channel,
      songuoi: songuoi,
      name: name,
      token: token,
      uid: uid,
      ngaytao: ngaytao,
      thaotac: channel,
      trangthai: trangthai,
    });
  });

  console.log("Room data: ", data);
});
export const RoomCall = data;
