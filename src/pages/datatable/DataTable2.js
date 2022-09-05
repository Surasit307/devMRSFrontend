import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Popconfirm, Button, Space, Form, Input } from "antd";
import { isEmpty } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
// import "antd/dist/antd.css";
import 'antd/dist/antd.min.css';
const DataTable = () => {
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [sortedInfo, setSortedInfo] = useState({});
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [searchColText, setSearchColText] = useState("");
  const [searchedCol, setSearchedCol] = useState("");
  let [filteredInfo, setFilteredInfo] = useState({});
  let [filteredData] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const response = await axios.get(
      "http://localhost:8083/api/v1/account"
    );
    setGridData(response.data);
    setLoading(false);
  };

  const handleDelete = async (value) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.accountId !== value.accountId);
    setGridData(filteredData);
    const response = await axios.delete(
      `http://localhost:8083/api/v1/deleteaccount/${value.accountId}`
      );
    // setGridData(response.data);
    // setLoading(false);
  };

  // const save = async (value) => {
  //   const response = await axios.put(
  //     `http://localhost:8083/api/v1/updateaccount`, {
  //       accountId: value.accountId,
  //       username : value.username,
  //       password : value.password,
  //       firstname : value.firstname,
  //       lastname : value.lastname,
  //       gender : value.gender,
  //       email : value.email,
  //       address : value.address,
  //     });
      // try {
      //   const row = await form.validateFields();
      //   const newData = [...modifiedData];
      //   const index = newData.findIndex((item) => value === item.value);
          
      //   if (index > -1) {
      //     const item = newData[index];
      //     newData.splice(index, 1, { ...item, ...row });
      //     setGridData(newData);
      //     setEditingKey("");
      //   }
      // } catch (error) {
      //   console.log("Error", error);
      // }
  
      
      // console.log(value)
  //     console.log(response)
  // };

  const modifiedData = gridData.map(({ body, ...item }) => ({
    ...item,
    key: item.accountId,
    username : item.username,
    password : item.password,
    firstname : item.firstname,
    lastname : item.lastname,
    gender : item.gender,
    email : item.email,
    address : item.address,
    
  }));
  console.log("modifiedData", modifiedData);  


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 0, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleResetCol(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedCol === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchColText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearchCol = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchColText(selectedKeys[0]);
    setSearchedCol(dataIndex);
  };

  const handleResetCol = (clearFilters) => {
    clearFilters();
    setSearchColText("");
  };

  const edit = (record) => {
    form.setFieldsValue({
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      gender: "",
      email: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
    //setEditingKey(record);
    
  };
  const cancel = () => {
    setEditingKey("");
  };

  const handleChange = async (_, filters, sorter) => {
    console.log("sorter", sorter);
    console.log("filters", filters);
    const { order, field } = sorter;
    setFilteredInfo(filters);
    setSortedInfo({ columnKey: field, order });
  };



  console.log("filteredInfo", filteredInfo);
  const save = async (key) => {
    // const response = await axios.put("http://localhost:8083/api/v1/updateaccount" , {
    //     accountId: key.accountId,
    //     username : key.username,
    //     password : key.password,
    //     firstname : key.firstname,
    //     lastname : key.lastname,
    //     gender : key.gender,
    //     email : key.email,
    //     address : key.address,
    //   },
      // console.log("key :", key)
      //   );

    try {
      const row = await form.validateFields();
      const newData = [...modifiedData];
      const index = newData.findIndex((item) => key === item.key);
        
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setGridData(newData);
        setEditingKey("");
      }
    } catch (error) {
      console.log("Error", error);
    }
    console.log("data : " ,(key.username))
  };



  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    const input = <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
           name={dataIndex} //edit show text
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please input ${title}`,
              },
            ]}
          >
            {input}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "accountId",
    },
    {
      title: "Username",
      dataIndex: "username",
      align: "center",
      editable: true,
      sorter: (a, b) => a.username.length - b.username.length,
      sortOrder: sortedInfo.columnKey === "username" && sortedInfo.order,
      ...getColumnSearchProps("username"),
    },
    {
      title: "Password",
      dataIndex: "password",
      align: "center",
      editable: true,
      sorter: (a, b) => a.password.length - b.password.length,
      sortOrder: sortedInfo.columnKey === "password" && sortedInfo.order,
      ...getColumnSearchProps("password"),
    },
    {
      title: "Firstname",
      dataIndex: "firstname",
      align: "center",
      editable: true,
      sorter: (a, b) => a.firstname.length - b.firstname.length,
      sortOrder: sortedInfo.columnKey === "firstname" && sortedInfo.order,
      ...getColumnSearchProps("firstname"),
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      align: "center",
      editable: true,
      sorter: (a, b) => a.lastname.length - b.lastname.length,
      sortOrder: sortedInfo.columnKey === "lastname" && sortedInfo.order,
      ...getColumnSearchProps("lastname"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      align: "center",
      editable: true,
      sorter: (a, b) => a.gender.length - b.gender.length,
      sortOrder: sortedInfo.columnKey === "gender" && sortedInfo.order,
      ...getColumnSearchProps("gender"),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      editable: true,
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Address",
      dataIndex: "address",
      align: "center",
      editable: true,
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return modifiedData.length >= 1 ? (
          <Space>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <Button type="primary" disabled={editable} danger>
                Delete
              </Button>

            </Popconfirm>
            {editable ? (
              <span>
                <Space size="middle">
                  <Button
                    onClick={(e) => save(record.key)}
                    //onClick={(e) => save(record)}
                    type="primary"
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </Button>
                  <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <Button>Cancel</Button>
                  </Popconfirm>
                </Space>
              </span>
            ) : (
              <Button onClick={() => edit(record)} type="primary">
                Edit
              </Button>
            )}
          </Space>
        ) : null;
      },
    },
  ];

  const isEditing = (record) => {
   return record.key === editingKey
   //return record.key === editingKey
  };

  

  const clearAll = () => {
    setSortedInfo({});
    setFilteredInfo({});
    setSearchText("");
    loadData();
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      loadData();
    }
  };
  const globalSearch = () => {
    filteredData = modifiedData.filter((value) => {
      return (
        value.username.toLowerCase().includes(searchText.toLowerCase()) || 
        value.password.toLowerCase().includes(searchText.toLowerCase()) || 
        value.firstname.toLowerCase().includes(searchText.toLowerCase()) || 
        value.lastname.toLowerCase().includes(searchText.toLowerCase()) || 
        value.gender.toLowerCase().includes(searchText.toLowerCase()) || 
        value.email.toLowerCase().includes(searchText.toLowerCase()) || 
        value.address.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setGridData(filteredData);
  };

  return (
    <div>
      <center>
        <h1>Data Account Table</h1>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Enter Search Text"
          onChange={handleSearch}
          type="text"
          allowClear
          value={searchText}
        />
        <Button type="primary" onClick={globalSearch}>
          Search
        </Button>
        <Button onClick={clearAll}>Clear All</Button>
      </Space>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          // expandable={{
          //   expandedRowRender: (record) => (
          //     <p style={{ margin: 0 }}>{record.info}</p>
          //   ),
          //   rowExpandable: (record) => record.info !== "Not Expandable",
          // }}
          dataSource={
            filteredData && filteredData.length ? filteredData : modifiedData
          }
          bordered
          loading={loading}
          onChange={handleChange}
        />
      </Form>
      </center>
    </div>
  );
};

export default DataTable;