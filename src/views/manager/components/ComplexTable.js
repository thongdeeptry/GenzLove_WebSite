import {
  Flex,
  Table,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
// Custom components
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config";
import {
  getDatabase,
  ref,
  remove,
  set,
  onValue,
  update,
} from "firebase/database";
import * as firebase from "firebase/database";
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
  console.log("Dataa bên user --------> ", data);
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
  let subtitle;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
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
  const Yes = (idd, ndx, ttx) => {
    setIsOpen(true);
    setidx(idd);
    setnoidungx(ndx);
    setthaotacx(ttx);
  };

  const updateData = () => {
    setIsOpen(false);
    const db = getDatabase();
    const reference = ref(db, "users/" + idx);
    onValue(reference, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const trangthai = noidungx;
        update(reference, {
          trangthai: trangthai,
        });
      });
      console.log(thaotacx + " thành công");
      alert(thaotacx + " tài khoản thành công");
      window.location = "https://genzlove.onrender.com/#/admin/home";
    });
  };
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

        <div>Bạn có chắc chắn muốn {thaotacx} tài khoản này ?</div>
        <Flex direction={"row"} justifyContent={"space-between"}>
          <button style={style} onClick={updateData}>
            Có
          </button>
          <button onClick={updateData}>Không</button>
        </Flex>
      </Modal>
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Quản lý tài khoản {data.length}
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
                            cell.value === "Hoạt Động"
                              ? "green.500"
                              : cell.value === "Khóa"
                              ? "red.500"
                              : cell.value === "Error"
                              ? "orange.500"
                              : "green.500"
                          }
                          as={
                            cell.value === "Hoạt Động"
                              ? MdCheckCircle
                              : cell.value === "Khóa"
                              ? MdCancel
                              : cell.value === "Error"
                              ? MdOutlineError
                              : MdCheckCircle
                          }
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "TÊN") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "GIỚI TÍNH") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "THEO DÕI") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "THAO TÁC") {
                    data = (
                      <Flex align="center">
                        <Button
                          onClick={() =>
                            (window.location =
                              "https://genzlove.onrender.com/#/update/info/" +
                              cell.value)
                          }
                        >
                          Sửa
                        </Button>
                        <Button onClick={() => Yes(cell.value, "Khóa", "Khóa")}>
                          Khóa
                        </Button>
                        <Button
                          onClick={() =>
                            Yes(cell.value, "Hoạt Động", "Mở Khóa")
                          }
                        >
                          Mở
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
