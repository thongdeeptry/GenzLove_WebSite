import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "../../../config";
const app = initializeApp(firebaseConfig);
const data = [];
if (!app.length) {
  console.log("Kết nối thành công");
}

const db = getDatabase();
const reference = ref(db, "livestream");
onValue(reference, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const channel = childSnapshot.child("channel").exportVal();
    const luotxem = childSnapshot.child("luotxem").exportVal();
    const name = childSnapshot.child("name").exportVal();
    const token = childSnapshot.child("token").exportVal();
    const uid = childSnapshot.child("uid").exportVal();
    const ngaytao = childSnapshot.child("ngaytao").exportVal();
    const trangthai = childSnapshot.child("trangthai").exportVal();

    data.push({
      channel: channel,
      luotxem: luotxem,
      name: name,
      token: token,
      uid: uid,
      ngaytao: ngaytao,
      thaotac: channel,
      trangthai: trangthai,
    });
  });

  console.log("Live data: ", data);
});
export const livestream = data;
