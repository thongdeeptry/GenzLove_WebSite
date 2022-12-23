import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Alert,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config";
import { getDatabase, ref, remove, set, onValue } from "firebase/database";
import * as firebase from "firebase/database";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const style = {
    content: {
      padding: 10,
      borderColor: 1,
    },
  };

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  //Modal.setAppElement("#yourAppElement");

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [idx, setidx] = useState();
  const [noidungx, setnoidungx] = useState();
  const [thaotacx, setthaotacx] = useState();

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 1000;

  const buttonMove = (data) => {
    window.location = "" + data;
  };
  const Yes = (idd, ndx, ttx) => {
    setIsOpen(true);
    setidx(idd);
    setnoidungx(ndx);
    setthaotacx(ttx);
  };

  const updateData = () => {
    setIsOpen(false);
    const db = getDatabase();
    const reference = ref(db, "reports/" + idx);
    onValue(reference, (childSnapshot) => {
      const id = childSnapshot.child("id").exportVal();
      const noidung = childSnapshot.child("noidung").exportVal();
      const id_send = childSnapshot.child("id_send").exportVal();
      const id_vipham = childSnapshot.child("id_vipham").exportVal();
      const trangthai = noidungx;
      const phanhoi = childSnapshot.child("phanhoi").exportVal();
      const link = childSnapshot.child("link").exportVal();
      const thaotac = childSnapshot.child("thaotac").exportVal();
      set(reference, {
        id: id,
        noidung: noidung,
        id_send: id_send,
        id_vipham: id_vipham,
        trangthai: trangthai,
        phanhoi: phanhoi,
        link: link,
        thaotac: thaotac,
      });
      console.log(thaotacx + " thành công");
      alert(thaotacx + " đơn báo cáo thành công");
      window.location = "https://genzlove.onrender.com/#/admin/home";
    });
  };
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          Thông báo từ GenzLove
        </h2>

        <div>Bạn có chắc chắn muốn {thaotacx} nội dung này ?</div>
        <Flex direction={"row"} justifyContent={"space-between"}>
          <button style={style} onClick={updateData}>
            Có
          </button>
          <button onClick={closeModal}>Không</button>
        </Flex>
      </Modal>
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Quản lý báo cáo
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "ID") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "TRẠNG THÁI") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "Hoàn Tất"
                              ? "green.500"
                              : cell.value === "Hủy Yêu Cầu"
                              ? "red.500"
                              : cell.value === "Chờ Xử Lý"
                              ? "orange.500"
                              : null
                          }
                          as={
                            cell.value === "Hoàn Tất"
                              ? MdCheckCircle
                              : cell.value === "Hủy Yêu Cầu"
                              ? MdCancel
                              : cell.value === "Chờ Xử Lý"
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "NỘI DUNG") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "ID SEND") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "ID REPORT") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "THAO TÁC") {
                    data = (
                      <Flex align="center">
                        <Button
                          onClick={() => Yes(cell.value, "Hoàn Tất", "Xử lý")}
                        >
                          Xử Lý
                        </Button>
                        <Button
                          onClick={() => Yes(cell.value, "Hủy Yêu Cầu", "Hủy")}
                        >
                          Hủy
                        </Button>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Link") {
                    data = (
                      <Flex align="center">
                        <Button onClick={() => buttonMove(cell.value)}>
                          Xem
                        </Button>
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
