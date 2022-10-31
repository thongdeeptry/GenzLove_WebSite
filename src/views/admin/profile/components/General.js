// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../../config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import Information from "views/admin/profile/components/Information";

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [tuoi, settuoi] = useState();
  const [diachi, setdiachi] = useState();
  const [ngaysinh, setngaysinh] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [sothich, setsothich] = useState();
  const [nghe, setnghe] = useState();
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
    console.log("Kết nối thành công");
    console.log("Link : " + window.location.href);
  }
  let myRe = /profile.*/;
  const myArray = myRe.exec(window.location.href);
  console.log("The value of lastIndex is " + myArray);
  let rgid = /[0-9]{1,11111}/;
  const idLocation = rgid.exec(myArray);
  console.log("id cua usser " + idLocation);
  const auth = getAuth(app);
  const user = idLocation;
  const db = getDatabase();

  useEffect(() => {
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      const tuoipr = childSnapshot.child("tuoi").val();
      const diachipr = childSnapshot.child("diachi").val();
      const ngaysinhpr = childSnapshot.child("ngaysinh").val();
      const gioitinhpr = childSnapshot.child("gioitinh").val();
      const nghen = childSnapshot.child("nghenghiep").val();
      setname(namepr);
      setavt(avtpr);
      setdiachi(diachipr);
      settuoi(tuoipr);
      setgioitinh(gioitinhpr);
      setngaysinh(ngaysinhpr);
      setnghe(nghen);
    });
  }, []);
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        Thông tin chung
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        Khi chúng ta sống, trái tim của chúng ta trở nên lạnh hơn. Bởi vì nỗi
        đau là những gì chúng ta phải trải qua khi chúng ta già đi. Chúng ta bị
        xúc phạm bởi những người khác, mất niềm tin cho những người khác. Chúng
        tôi bị bạn bè đâm trở lại. Việc giúp đỡ người khác trở nên khó khăn hơn
        đối với chúng ta. Chúng ta khiến trái tim chúng ta tan nát bởi những
        người chúng ta yêu thương, ngay cả khi chúng ta cho họ tất cả ....
      </Text>
      <SimpleGrid columns="2" gap="20px">
        <Information
          boxShadow={cardShadow}
          title="Trường học"
          value="Cao đẳng FPT Polytechnic"
        />
        <Information boxShadow={cardShadow} title="Quê quán" value={diachi} />
        <Information boxShadow={cardShadow} title="Nghề nghiệp" value={nghe} />
        <Information
          boxShadow={cardShadow}
          title="Giới tính"
          value={gioitinh}
        />
        <Information
          boxShadow={cardShadow}
          title="Trạng thái hiện tại"
          value="Hẹn hò"
        />
        <Information
          boxShadow={cardShadow}
          title="Ngày sinh"
          value={ngaysinh}
        />
      </SimpleGrid>
    </Card>
  );
}
