import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/manager/components/DevelopmentTable";
import CheckTable from "views/manager/components/CheckTable";
import ColumnsTable from "views/manager/components/ColumnsTable";
import ComplexTable from "views/manager/components/ComplexTable";
import Manager_Report from "views/manager/components/Manager_Report";
import Support_Tick from "views/manager/components/support_tickblue";
import Manager_Live from "views/manager/components/manager_livestream";
import Manager_Room from "views/manager/components/manager_roomcall";
import Manager_Post from "views/manager/components/manager_Post";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
  columnsReport,
  columnsTickBlue,
  columnsLivestream,
  columnsRoomCall,
  columnsPost,
} from "views/manager/variables/columnsData";
import { pets as petsArray } from "views/manager/variables/listUser";
import { report as reportArray } from "views/manager/variables/listReport";
import { tickblue as tickblueArray } from "views/manager/variables/listtickblue";
import { livestream as livestreamArray } from "views/manager/variables/listLiveStream";
import { RoomCall as RoomCallArray } from "views/manager/variables/listRoomCall";
import { PostData as PostDataArray } from "views/manager/variables/listPost";

import React, { useEffect, useState } from "react";

export default function Manager() {
  // Chakra Color Mode
  const [pets, setPets] = useState(petsArray);
  const [report, setReport] = useState(reportArray);
  const [tickblue, settickblue] = useState(tickblueArray);
  const [livestream, setlivestream] = useState(livestreamArray);
  const [RoomCall, setRoomCall] = useState(RoomCallArray);
  const [PostData, setPostData] = useState(PostDataArray);

  useEffect(() => {
    if (!pets.length) {
      setPets(petsArray);
    }
    if (!report.length) {
      setReport(reportArray);
    }
    if (!tickblue.length) {
      settickblue(tickblueArray);
    }
    if (!livestream.length) {
      setlivestream(livestreamArray);
    }
    if (!RoomCall.length) {
      setRoomCall(RoomCallArray);
    }
    if (!PostData.length) {
      setPostData(PostDataArray);
    }
  }, [pets.length]);
  console.log("User pets: ", pets);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        row={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <ComplexTable columnsData={columnsDataComplex} tableData={pets} />
        <Manager_Report columnsData={columnsReport} tableData={report} />
        <Support_Tick columnsData={columnsTickBlue} tableData={tickblue} />
        <Manager_Live columnsData={columnsLivestream} tableData={livestream} />
        <Manager_Room columnsData={columnsRoomCall} tableData={RoomCall} />
        <Manager_Post columnsData={columnsPost} tableData={PostData} />
      </SimpleGrid>
    </Box>
  );
}
