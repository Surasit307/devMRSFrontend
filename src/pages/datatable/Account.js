import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Popconfirm, Button, Space, Form, Input } from "antd";
import { isEmpty } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
// import "antd/dist/antd.css";
import 'antd/dist/antd.min.css';


const Account = () => {
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
      "http://localhost:8083/api/v1/selectAllAccount"

      );
    setGridData(response.data);
    setLoading(false);
  };


  const handleDelete = async (value) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.accountId !== value.accountId);
    setGridData(filteredData);
    const response = await axios.delete(
      `http://localhost:8083/api/v1/deleteAccount/${value.accountId}`
      
      ).then(res => { console.log(res)
      })
     .catch(err => {  
         console.error(err)
     });
  };
  
  const DeleteAll = async (value) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.accountId !== value.accountId);
    setGridData(filteredData);
    const response = await axios.delete(
      `http://localhost:8083/api/v1/deleteAllAccount`
      ).then(res => { console.log(res)
      })
     .catch(err => {  
         console.error(err)
     });
     loadData();
  };


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
      accountId: "",
      username : "",
      password : "",
      firstname : "",
      lastname : "",
      gender : "",
      email : "",
      address : "",
      ...record,
    });
    setEditingKey(record.key);
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

  const save = async (value,key) => {
    const Username = document.getElementById("username").value;
    const Password = document.getElementById("password").value;
    const Firstname = document.getElementById("firstname").value;
    const Lastname = document.getElementById("lastname").value;
    const Gender = document.getElementById("gender").value;
    const Email = document.getElementById("email").value;
    const Address = document.getElementById("address").value;
    const response = await axios.put("http://localhost:8083/api/v1/updateAccount" , {

      accountId : value.accountId,
      username : Username,
      password : Password,
      firstname : Firstname,
      lastname : Lastname,
      gender : Gender,
      email : Email,
      address : Address,

    },
      ).then(res => { console.log(res)
      })
     .catch(err => {  
         console.error(err)
     });


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
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
    
  }) => {
    const input = <Input />
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
      id: "accountId",
      title: "ID",
      dataIndex: "accountId",
      name: "accountId",
      
    },
    {
      id: "username",
      title: "Username",
      dataIndex: "username",
      name: "username",
      align: "center",
      editable: true,
      sorter: (a, b) => a.username.length - b.username.length,
      sortOrder: sortedInfo.columnKey === "username" && sortedInfo.order,
      ...getColumnSearchProps("username"),
    },
    {
      id: "password",
      title: "Password",
      dataIndex: "password",
      name: "password",
      align: "center",
      editable: true,
      sorter: (a, b) => a.password.length - b.password.length,
      sortOrder: sortedInfo.columnKey === "password" && sortedInfo.order,
      ...getColumnSearchProps("password"),
      
    },
    {
      id: "firstname",
      title: "Firstname",
      dataIndex: "firstname",
      name: "firstname",
      align: "center",
      editable: true,
      sorter: (a, b) => a.firstname.length - b.firstname.length,
      sortOrder: sortedInfo.columnKey === "firstname" && sortedInfo.order,
      ...getColumnSearchProps("firstname"),
    },
    {
      id: "lastname",
      title: "Lastname",
      dataIndex: "lastname",
      name: "lastname",
      align: "center",
      editable: true,
      sorter: (a, b) => a.lastname.length - b.lastname.length,
      sortOrder: sortedInfo.columnKey === "lastname" && sortedInfo.order,
      ...getColumnSearchProps("lastname"),
    },
    {
      id: "gender",
      title: "Gender",
      dataIndex: "gender",
      name: "gender",
      align: "center",
      editable: true,
      sorter: (a, b) => a.gender.length - b.gender.length,
      sortOrder: sortedInfo.columnKey === "gender" && sortedInfo.order,
      ...getColumnSearchProps("gender"),
    },
    {
      id: "email",
      title: "Email",
      dataIndex: "email",
      name: "email",
      align: "center",
      editable: true,
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
      ...getColumnSearchProps("email"),
    },
    {
      id: "address",
      title: "Address",
      dataIndex: "address",
      name: "address",
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
            <Popconfirm disabled={editable} danger
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
                <Popconfirm title="Sure to save?" onConfirm={() => save(record,record.key)}>
                  <Button            
                    type="primary"
                   //style={{ marginRight: 8 }}
                  >
                    Save
                  </Button>
                  </Popconfirm>
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
        <Button onClick={clearAll}>Refresh</Button>
        
        <Popconfirm
        
              title="Sure to delete all data?"
              onConfirm={(e) => DeleteAll(e)}
            >
        <Button type="primary" danger>Delete All</Button>
        </Popconfirm>
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
  )
};

export default Account;