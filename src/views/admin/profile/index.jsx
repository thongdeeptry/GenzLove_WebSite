/** @format */

import { Box, Grid } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avt.jpg";
import { length } from "stylis";
export default function Overview() {
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [tuoi, settuoi] = useState();
  const [diachi, setdiachi] = useState();
  const [ngaysinh, setngaysinh] = useState();
  const [nghe, setnghe] = useState();
  const [follow, setFollow] = useState();
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
    console.log("Kết nối thành công");
    console.log("Link : " + window.location.href);
  }

  let myRe = /profile.*/;
  const myArray = myRe.exec(window.location.href);
  console.log("The value of lastIndex is " + myArray);
  let rgid = /^profile.(.*)/;
  const idLocation = rgid.exec(myArray);
  console.log("id cua usserrregerere" + idLocation);
  const auth = getAuth(app);
  const user = idLocation[1];
  const db = getDatabase();

  useEffect(() => {
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      const tuoipr = childSnapshot.child("tuoi").val();
      const diachipr = childSnapshot.child("diachi").val();
      const ngaysinhpr = childSnapshot.child("ngaysinh").val();
      const nghenghiep = childSnapshot.child("nghenghiep").val();
      const fl = childSnapshot.child("follow").val();
      setname(namepr);
      setavt(avtpr);
      setdiachi(diachipr);
      settuoi(tuoipr);
      setnghe(nghenghiep);
      setngaysinh(ngaysinhpr);
      setFollow(fl);
    });
  }, []);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}

      <Banner
        gridArea="1 / 1 / 2 / 2"
        banner={banner}
        avatar={avt}
        name={name}
        job={nghe}
        posts={tuoi}
        followers={follow}
        following="1"
      />
      {/* <Storage
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          used={25.6}
          total={50}
        /> */}
      {/* <Upload
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "1 / 3 / 2 / 4",
          }}
          minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
          pe='20px'
          pb={{ base: "100px", lg: "20px" }}
        /> */}

      {/* <Projects
        gridArea="1 / 2 / 2 / 2"
        banner={banner}
        avatar={avatar}
        name="Adela Parkson"
        job="Product Designer"
        posts="17"
        followers="9.7k"
        following="274"
      /> */}
      <General
        gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
        minH="365px"
        pe="20px"
      />
      {/* <Notifications
          used={25.6}
          total={50}
          gridArea={{ / 4 / 2",
            lg: "2 / 1 / 
            base: "3 / 13 / 3",
            "2xl": "1 / 3 / 2 / 4",
          }}
        /> */}
    </Box>
  );
}
