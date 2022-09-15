import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Popconfirm, Button, Space, Form, Input ,Upload} from "antd";
import { isEmpty } from "lodash";
import { RightCircleTwoTone, SearchOutlined ,UploadOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
// import "antd/dist/antd.css";
import 'antd/dist/antd.min.css';
import './DataTable.css';



const List_Auction = () => {
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
      "http://localhost:8083/api/v1/ListAuction",
      ).then(res => { console.log(res)
        // const dataByte = res.data[0].image1;
        // const base64String = btoa(String.fromCharCode(...new Uint8Array(dataByte)));
        // let base64ImageString = Buffer.from(dataByte).toString('base64')
        // console.log("image1 :" ,base64ImageString)
        // console.log("image1 :" ,res.data[0].image1)
        setGridData(res.data);
        setLoading(false);

      })
     .catch(err => {  
         console.error(err)
     });;

    
  };

  const handleDelete = async (value) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.accountId !== value.accountId);
    setGridData(filteredData);
    const response = await axios.delete(
      `http://localhost:8083/api/v1/deleteaccount/${value.accountId}`
      
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
      `http://localhost:8083/api/v1/DeleteAllAccount`
      ).then(res => { console.log(res)
      })
     .catch(err => {  
         console.error(err)
     });
     loadData();
  };

  const [selectImage,setSelectImage] = useState();
  // On file select (from the pop up)
  // const onFileChange = (event) => {
  //   // Update the state
  //  const value =  setSelectImage(event.target.files) ;
  // };

  console.log("selectImage: ",selectImage)

  // On file upload (click the upload button)
  const onFileUpload = () => {
    
    // console.log(this.state.selectedFile)
    // Create an object of formData
    const formData = new FormData();
    formData.append("auctionId", "1");
    Array.from(selectImage).forEach((file) => {
      // Update the formData object
      formData.append("fileImage", file);
    });
    // Request made to the backend api
    // Send formData object
    axios.post("http://localhost:8083/api/v1/updateAuctionImages", formData);
  };


  const modifiedData = gridData.map(({ body, ...item }) => ({
    ...item,
    key: item.id,
    product_id : item.product_id,
    username : item.username,
    product_name : item.productName,
    // image_1 : item.image1,  
    // image_2 : item.image2,  
    // image_3 : item.image3,  
    // image_4 : item.image4,  
    // image_5 : item.image5,  
    // video_1 : item.video1,  
    // video_2 : item.video2,  
    price : item.price,
    user_bid : item.userBid,
    price_winner : item.priceWinner,
    view : item.view,

    
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
    const response = await axios.put("http://localhost:8083/api/v1/updateaccount" , {

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
      id: "id",
      title: "ID",
      dataIndex: "id",
      name: "id",
      align : "center",
      width : 100,
      
    },
    {
        id: "product_id",
        title: "Product_id",
        dataIndex: "product_id",
        name: "product_id",
        align : "center",   
        width : 150,
        
      },
    {
      id: "username",
      title: "Username",
      dataIndex: "username",
      name: "username",
      align: "center",
      width : 150,
      editable: true,
      sorter: (a, b) => a.username.length - b.username.length,
      sortOrder: sortedInfo.columnKey === "username" && sortedInfo.order,
      ...getColumnSearchProps("username"),
    },
    {
      id: "product_name",
      title: "Product_name",
      dataIndex: "product_name",
      name: "product_name",
      align: "center",
      width : 150,
      editable: true,
      sorter: (a, b) => a.product_name.length - b.product_name.length,
      sortOrder: sortedInfo.columnKey === "product_name" && sortedInfo.order,
      ...getColumnSearchProps("product_name"),
      
    },
    {
        id: "image_1",
        title: "Image_1",
        dataIndex: "image_1",
        name: "image_1",
        align: "center",
        width : 300,
        type : "file",
        editable: false ,
        // sorter: (a, b) => a.image_1.length - b.image_1.length,
        // sortOrder: sortedInfo.columnKey === "image_1" && sortedInfo.order,
        // ...getColumnSearchProps("image_1"),  
        render: (_, record) => {
          const editable = isEditing(record);
          return modifiedData.length >= 1 ? (
            <Space>
              {editable ? (
                  
                <span>

              <div>
              {/* <input type="file" onChange={onFileChange}  />
              <button onClick={onFileUpload}>Upload!</button> */}

                <Upload
                id ="uploadImage1"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                // action={"http://localhost:3000/list_auction"}
                maxCount={1}
                accept=".png,.jpeg,.jpg"
                // showUploadList={{showRemoveIcon :true}}
                beforeUpload={(fileImage) => {
                  // setSelectImage (fileImage)
                   console.log("file : ",fileImage);
                return true;
              }}
              >
                <Button icon={<UploadOutlined /> }>Upload (Max: 1)</Button>

              </Upload>
              </div>

                </span>
              ) 
              : (
                <div>
                {/* <Upload
                id ="uploadImage1"
                //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                action={"http://localhost:3000/list_auction"}
                maxCount={1}
                accept=".png,.jpeg,.jpg"
                beforeUpload={(fileImage) => {
                  setSelectImage(fileImage)
                  console.log("file : ",test);
                  return true;
                }}
              >
                <Button icon={<UploadOutlined /> }>Upload (Max: 1)</Button>
              </Upload> */}

                </div>
                // <td> 

                // </td>  
             
               )
            }
  
             </Space >
            
          ) : null;
          
        },
      
      },    
      {
        id: "image_2",
        title: "Image_2",
        dataIndex: "image_2",
        name: "image_2",
        align: "center",
        width : 150,
        // editable: true,
        // sorter: (a, b) => a.image_2.length - b.image_2.length,
        // sortOrder: sortedInfo.columnKey === "image_2" && sortedInfo.order,
        // ...getColumnSearchProps("image_2"),
        
      },    
      {
        id: "image_3",
        title: "Image_3",
        dataIndex: "image_3",
        name: "image_3",
        align: "center",
        width : 150,
        // editable: true,
        // sorter: (a, b) => a.image_3.length - b.image_3.length,
        // sortOrder: sortedInfo.columnKey === "image_3" && sortedInfo.order,
        // ...getColumnSearchProps("image_3"),
        
      },    
      {
        id: "image_4",
        title: "Image_4",
        dataIndex: "image_4",
        name: "image_4",
        align: "center",
        width : 150,
        // editable: true,
        // sorter: (a, b) => a.image_4.length - b.image_4.length,
        // sortOrder: sortedInfo.columnKey === "image_4" && sortedInfo.order,
        // ...getColumnSearchProps("image_4"),
        
      },    
      {
        id: "image_5",
        title: "Image_5",
        dataIndex: "image_5",
        name: "image_5",
        align: "center",
        width : 150,
        // editable: true,
        // sorter: (a, b) => a.image_5.length - b.image_5.length,
        // sortOrder: sortedInfo.columnKey === "image_5" && sortedInfo.order,
        // ...getColumnSearchProps("image_5"),
      },    
      {
        id: "video_1",
        title: "Video_1",
        dataIndex: "video_1",
        name: "video_1",
        align: "center",
        width : 150,
        // editable: true,
        sorter: (a, b) => a.video_1.length - b.video_1.length,
        sortOrder: sortedInfo.columnKey === "video_1" && sortedInfo.order,
        ...getColumnSearchProps("video_1"),
      },  
      {
        id: "video_2",
        title: "Video_2",
        dataIndex: "video_2",
        name: "video_2",
        align: "center",
        width : 150,
        // editable: true,
        sorter: (a, b) => a.video_2.length - b.video_2.length,
        sortOrder: sortedInfo.columnKey === "video_2" && sortedInfo.order,
        ...getColumnSearchProps("video_2"),
        
      },
      {
        id: "time",
        title: "Time",
        dataIndex: "time",
        name: "time",
        align: "center",
        width : 150,
        editable: true,
        sorter: (a, b) => a.time.length - b.time.length,
        sortOrder: sortedInfo.columnKey === "time" && sortedInfo.order,
        ...getColumnSearchProps("time"),
      },
      {
        id: "date",
        title: "Date",
        dataIndex: "date",
        name: "date",
        align: "center",
        width : 150,
        editable: true,
        sorter: (a, b) => a.date.length - b.date.length,
        sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order,
        ...getColumnSearchProps("date"),
      },
    {
      id: "price",
      title: "Price",
      dataIndex: "price",
      name: "price",
      align: "center",
      width : 150,
      editable: true,
      sorter: (a, b) => a.price.length - b.price.length,
      sortOrder: sortedInfo.columnKey === "price" && sortedInfo.order,
      ...getColumnSearchProps("price"),
    },
    {
        id: "user_bid",
        title: "User_bid",
        dataIndex: "user_bid",
        name: "user_bid",
        align: "center",
        width : 150,
        editable: true,
        sorter: (a, b) => a.user_bid.length - b.user_bid.length,
        sortOrder: sortedInfo.columnKey === "user_bid" && sortedInfo.order,
        ...getColumnSearchProps("user_bid"),
      },
    {
        id: "price_winner",
        title: "price_winner",
        dataIndex: "price_winner",
        name: "price_winner",
        align: "center",
        width : 150,
        editable: true,
        sorter: (a, b) => a.price_winner.length - b.price_winner.length,
        sortOrder: sortedInfo.columnKey === "price_winner" && sortedInfo.order,
        ...getColumnSearchProps("price_winner"),
      },
    {
      id: "view",
      title: "view",
      dataIndex: "view",
      name: "view",
      align: "center",
      width : 150,
      editable: true,
      sorter: (a, b) => a.view.length - b.view.length,
      sortOrder: sortedInfo.columnKey === "view" && sortedInfo.order,
      ...getColumnSearchProps("view"),
    },
    {
      
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      fixed : 'right',    
      width : 270,
      render: (_, record) => {
        const editable = isEditing(record);
        return modifiedData.length >= 1 ? (
          <Space>
            <Popconfirm type="primary" disabled={editable} danger
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

          </Space >
          
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
    if (!col.editable) { //Button after edit
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
        <h1>Data List Auction Table</h1>
      
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
        
        <Popconfirm
              title="Sure to delete all data?"
              onConfirm={(e) => DeleteAll(e)}
            >
        <Button type="primary" danger>Delete All</Button>
        </Popconfirm>
      </Space>
      <Form form={form} component={false}>
        <Table scroll={{ x: 1300}}    
        width = {1000}
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
      <div>
          {/* <center>
      <div>
        <h3>Test File Upload using FormData Type</h3>
        <div>
          <input type="file" onChange={onFileChange}  />
          <button onClick={onFileUpload}>Upload!</button>

        </div>
      </div>
      </center> */}
      </div>
    </div>
    
    
    ) 
        
  
};

export default List_Auction;