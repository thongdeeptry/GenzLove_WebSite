import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/manager/components/DevelopmentTable";
import CheckTable from "views/manager/components/CheckTable";
import ColumnsTable from "views/manager/components/ColumnsTable";
import ComplexTable from "views/manager/components/ComplexTable";
import Manager_Report from "views/manager/components/Manager_Report";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
  columnsReport,
} from "views/manager/variables/columnsData";
import { pets as petsArray } from "views/manager/variables/listUser";
import { report as reportArray } from "views/manager/variables/listReport";
import React, { useEffect, useState } from "react";

export default function Manager() {
  // Chakra Color Mode
  const [pets, setPets] = useState(petsArray);
  const [report, setReport] = useState(reportArray);
  useEffect(() => {
    if (!pets.length) {
      setPets(petsArray);
    }
    if (!report.length) {
      setReport(reportArray);
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
        <ComplexTable columnsData={columnsDataComplex} tableData={pets} />
        <Manager_Report columnsData={columnsReport} tableData={report} />
      </SimpleGrid>
    </Box>
  );
}
