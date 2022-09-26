import React, { useState, useEffect} from "react";
import axios from "axios";
import { Table, Popconfirm, Button, Space, Form, Input ,Upload , Image , Checkbox, message } from "antd";
import { RightCircleTwoTone, SearchOutlined ,UploadOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
// import "antd/dist/antd.css";
import 'antd/dist/antd.min.css';
import './DataTable.css'; 
import Moment from 'moment';


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
        setGridData(res.data);
        setLoading(false);
      })
     .catch(err => {  
         console.error(err)
     });;
  };

  const handleDelete = async (value) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.auctionId !== value.auctionId);
    setGridData(filteredData);
    const response = await axios.delete(
      `http://localhost:8083/api/v1/deleteAuctionById/${value.auctionId}`

      ).then(res => { console.log(res)
      })
     .catch(err => {  
         console.error(err)
     });
  };
  
  const DeleteAll = async (value) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.auctionId !== value.auctionId);
    setGridData(filteredData);
    const response = await axios.delete(
      `http://localhost:8083/api/v1/DeleteAllAuction`
      ).then(res => { console.log(res)
      })
     .catch(err => {  
         console.error(err)
     });
     loadData();
  };

  const [selectImage1,setSelectImage1] = useState();
  const [selectImage2,setSelectImage2] = useState();
  const [selectImage3,setSelectImage3] = useState();
  const [selectImage4,setSelectImage4] = useState();
  const [selectImage5,setSelectImage5] = useState();
  const [selectVideo1,setSelectVideo1] = useState();
  const [selectVideo2,setSelectVideo2] = useState();


  const onFileUploadImage1 = async (value,key) => {
    const formData = new FormData();
    formData.append("auctionId", value.id);
    Array.from(selectImage1).forEach((file) => {
      formData.append("fileImage",file);
      console.log("file" ,file)
  })
    const response = await axios.post("http://localhost:8083/api/v1/updateAuctionImages1" , formData
      ).then(res => { console.log(res)
        message.success("Upload Success")
      })
     .catch(err => {  
         console.error(err)
         message.error("The file size may be too large")
     });
  };

  const onFileUploadImage2 = async (value,key) => {
    const formData = new FormData();
    formData.append("auctionId", value.id);
    Array.from(selectImage2).forEach((file) => {
      formData.append("fileImage",file);
      console.log("file" ,file)
  })
    const response = await axios.post("http://localhost:8083/api/v1/updateAuctionImages2" , formData
      ).then(res => { console.log(res)
        message.success("Upload Success")
      })
     .catch(err => {  
         console.error(err)
         message.error("The file size may be too large")
     });
  };

  const onFileUploadImage3 = async (value,key) => {
    const formData = new FormData();
    formData.append("auctionId", value.id);
    Array.from(selectImage3).forEach((file) => {
      formData.append("fileImage",file);
      console.log("file" ,file)
  })
    const response = await axios.post("http://localhost:8083/api/v1/updateAuctionImages3" , formData
      ).then(res => { console.log(res)
        message.success("Upload Success")
      })
     .catch(err => {  
         console.error(err)
         message.error("The file size may be too large")
     });
  };

  const onFileUploadImage4 = async (value,key) => {
    const formData = new FormData();
    formData.append("auctionId", value.id);
    Array.from(selectImage4).forEach((file) => {
      formData.append("fileImage",file);
  })
    const response = await axios.post("http://localhost:8083/api/v1/updateAuctionImages4" , formData
      ).then(res => { console.log(res)
        message.success("Upload Success")
      })
     .catch(err => {  
         console.error(err)
         message.error("The file size may be too large")
     });
  };

  const onFileUploadImage5 = async (value,key) => {
    const formData = new FormData();
    formData.append("auctionId", value.id);
    Array.from(selectImage5).forEach((file) => {
      formData.append("fileImage",file);
  })
    const response = await axios.post("http://localhost:8083/api/v1/updateAuctionImages5" , formData
      ).then(res => { console.log(res)
        message.success("Upload Success")
      })
     .catch(err => {  
         console.error(err)
         message.error("The file size may be too large")
     });

  };

    const onFileUploadVideo1 = async (value,key) => {
    const formData = new FormData();
    formData.append("auctionId", value.id);
    Array.from(selectVideo1).forEach((file) => {
      formData.append("fileVideo",file);
  })
    const response = await axios.post("http://localhost:8083/api/v1/updateAuctionVideo1" , formData
      ).then(res => { console.log(res)
        message.success("Upload Success")
      })
     .catch(err => {  
         console.error(err)
         message.error('Maximum file video size 5MB')
     });
  };

  const onFileUploadVideo2 = async (value,key) => {
    const formData = new FormData();
    formData.append("auctionId", value.id);
    Array.from(selectVideo2).forEach((file) => {
      formData.append("fileVideo",file);
  })
    const response = await axios.post("http://localhost:8083/api/v1/updateAuctionVideo2" , formData
      ).then(res => { console.log(res)
        message.success("Upload Success")
      })
     .catch(err => {  
         console.error(err)
         message.error('Maximum file video size 5MB')
     });
  };

  //Show Output DataTalble use dataIndex from column
  const modifiedData = gridData.map(({ body, ...item }) => ({ 
    ...item,
    key: item.id,
    productId : item.idProduct,
    username : item.username,
    productName : item.productName,
    image1 : item.image1,  
    image2 : item.image2,  
    image3 : item.image3,  
    image4 : item.image4,  
    image5 : item.image5,  
    video1 : item.video1,  
    video2 : item.video2,  
    price : item.price,
    userBid : item.userBid,
    priceWinner : item.priceWinner,
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
      auctionId : "",
      username : "",
      productId : "",
      productName : "",
      image1 : "",
      image2 : "",
      image3 : "",
      image4 : "",
      image5 : "",
      price : "",
      userBid : "",
      priceWinner : "",
      view : "",
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
    const ProductName = document.getElementById("productName").value;
    const Price = document.getElementById("price").value;
    const Userbid = document.getElementById("userBid").value;
    const PriceWinner = document.getElementById("priceWinner").value;
    const View = document.getElementById("view").value;

    const formData = new FormData();
    formData.append("auctionId", value.id);
    formData.append("username", Username);
    formData.append("productId", value.idProduct);
    formData.append("productName", ProductName);
    formData.append("price", Price);
    formData.append("userBid", Userbid);
    formData.append("priceWinner", PriceWinner);
    formData.append("view", View);

    const response = await axios.post("http://localhost:8083/api/v1/updateListAuction" , formData
      ).then(res => { console.log(res)
        message.success("Update Success")
      })
     .catch(err => {  
         console.error(err)
         message.success("Update Failed")
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
    // loadData();
    window.location.reload();
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
    { //Column ID
      id: "id",
      title: "ID",
      dataIndex: "id",
      name: "id",
      align : "center",
      width : 100,
    },
    { //Column Username
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
    { //Column ProductId
      id: "idProduct",
      title: "Product_Id",
      dataIndex: "idProduct",
      name: "idProduct",
      align : "center",   
      width : 150,
    },
    { //Column ProductName
      id: "productName",
      title: "Product_name",
      dataIndex: "productName",
      name: "productName",
      align: "center",
      width : 150,
      editable: true,
      sorter: (a, b) => a.productName.length - b.productName.length,
      sortOrder: sortedInfo.columnKey === "productName" && sortedInfo.order,
      ...getColumnSearchProps("productName"),
    },
    {
        id: "image1",
        title: "Image1",
        dataIndex: "image1",
        name: "image1",
        align: "center",
        width : 300,
        editable: false ,  
        
        render: (_, record) => {
          const editable = isEditing(record); 
          return modifiedData.length >= 1 ? (
            
            <Space>
              {editable ? ( 
                
              <div>
                <div className = "imageUpload">
                <Upload
                id ="uploadImage1"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                defaultFileList={selectImage1}
                // fileList={selectImage1}
                // listType="picture"
                // action={"http://localhost:3000/list_auction"}
                maxCount={1}
                accept=".png,.jpeg,.jpg,.gif,image/*"
                beforeUpload={(ImageFile) => {    
                  // console.log("ImageFile1",ImageFile) 
                  const isLt2M = ImageFile.size / 1024 / 1024 < 1;
                  if(!isLt2M){
                    ImageFile.flag=true;
                    message.error('Maximum file image size 1MB')
                    return true
                  }  
                setSelectImage1([ImageFile])    
                return true;  
              }}    
              >
                <Button>Browser Image (Max: 1)</Button>
              </Upload>
              
              </div>
              <br></br>
              {/* <Button onClick ={onFileUpload} icon={<UploadOutlined /> }>Upload</Button> */}
              <Space size="middle">
                <Popconfirm title="Sure to save?" onConfirm={() => onFileUploadImage1(record,record.key)}>
                  <Button       
                    icon={<UploadOutlined /> }     
                    type="primary"
                   //style={{ marginRight: 8 }}
                  >
                    Upload
                  </Button>
                  </Popconfirm>
                  </Space>
              </div>
              ) 
              : (
                <div> 
                 <Image 
                 width = {200} 
                 height = {120} 
                 src = {`data:image/jpg;base64,${record.image1} `}/>
              </div>
               )
            }
             </Space >         
          ) : null;    
              
        },
      
      },    
      {
        id: "image2",
        title: "Image2",
        dataIndex: "image2",
        name: "image2",
        align: "center",
        width : 300,
        editable : false,
        render: (_, record) => {
          const editable = isEditing(record);
          return modifiedData.length >= 1 ? (
            <Space>
              {editable ? (
                  
                <span>

              <div>
                <div className = "imageUpload">
                <Upload
                id ="uploadImage2"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                defaultFileList={selectImage2}
                // listType="picture"
                // action={"http://localhost:3000/list_auction"}
                maxCount={1}
                accept=".png,.jpeg,.jpg,.gif,image/*"
                beforeUpload={(ImageFile) => {  
                  const isLt2M = ImageFile.size / 1024 / 1024 < 1;
                  if(!isLt2M){
                    ImageFile.flag=true;
                    message.error('Maximum file image size 1MB')
                    return true
                  }    
                  setSelectImage2([ImageFile])
                  //  console.log("file : ",[ImageFile]);
                return false;
              }}
              >
                <Button>Browser Image (Max: 1)</Button>
                
              </Upload>
              </div>
              <br></br>
              <Space size="middle">
                <Popconfirm title="Sure to save?" onConfirm={() => onFileUploadImage2(record,record.key)}>
                  <Button       
                      icon={<UploadOutlined /> }     
                    type="primary"
                   //style={{ marginRight: 8 }}
                  >
                    Upload
                  </Button>
                  </Popconfirm>
                  </Space>
              </div>

                </span>
              ) 
              : (
                <div> 
                 <Image 
                 width = {200} 
                 height = {120} 
                 src = {`data:image/jpg;base64,${record.image2} `}/>
              </div>
               )
            }
             </Space >         
          ) : null;         
        },
        
      },    
      {
        id: "image3",
        title: "Image3",
        dataIndex: "image3",
        name: "image3",
        align: "center",
        width : 300,
        render: (_, record) => {
          const editable = isEditing(record);
          return modifiedData.length >= 1 ? (
            <Space>
              {editable ? (
                  
                <span>

              <div>
                <div className = "imageUpload">
                <Upload
                id ="uploadImage3"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                defaultFileList={selectImage3}
                // listType="picture"
                // action={"http://localhost:3000/list_auction"}
                maxCount={1}
                accept=".png,.jpeg,.jpg,.gif,image/*"
                showUploadList={{showRemoveIcon :true}}
                beforeUpload={(ImageFile) => {    
                  const isLt2M = ImageFile.size / 1024 / 1024 < 1;
                  if(!isLt2M){
                    ImageFile.flag=true;
                    message.error('Maximum file image size 1MB')
                    return true
                  }  
                  setSelectImage3([ImageFile])
                  //  console.log("file : ",fileImage);
                return false;
              }}
              >
                <Button>Browser Image (Max: 1)</Button>
                
              </Upload>
              </div>
              <br></br>
              <Space size="middle">
                <Popconfirm title="Sure to save?" onConfirm={() => onFileUploadImage3(record,record.key)}>
                  <Button       
                      icon={<UploadOutlined /> }     
                    type="primary"
                   //style={{ marginRight: 8 }}
                  >
                    Upload
                  </Button>
                  </Popconfirm>
                  </Space>
              </div>

                </span>
              ) 
              : (
                <div> 
                 <Image 
                 width = {200} 
                 height = {120} 
                 src = {`data:image/jpg;base64,${record.image3} `}/>
              </div>
               )
            }
             </Space >         
          ) : null;         
        },
        
      },    
      {
        id: "image4",
        title: "Image4",
        dataIndex: "image4",
        name: "image4",
        align: "center",
        width : 300,
        render: (_, record) => {
          const editable = isEditing(record);
          return modifiedData.length >= 1 ? (
            <Space>
              {editable ? (
                  
                <span>

              <div>
              <div className = "imageUpload">
                <Upload
                id ="uploadImage4"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // listType="picture"
                defaultFileList={selectImage4}
                // action={"http://localhost:3000/list_auction"}
                maxCount={1}
                accept=".png,.jpeg,.jpg,.gif,image/*"
                beforeUpload={(ImageFile) => {  
                  const isLt2M = ImageFile.size / 1024 / 1024 < 1;
                  if(!isLt2M){
                    ImageFile.flag=true;
                    message.error('Maximum file image size 1MB')
                    return true
                  }    
                  setSelectImage4([ImageFile])
                  //  console.log("file : ",fileImage);
                return false;
              }}
              >
                <Button>Browser Image (Max: 1)</Button>
                
              </Upload>
              </div>
              <br></br>
              <Space size="middle">
                <Popconfirm title="Sure to save?" onConfirm={() => onFileUploadImage4(record,record.key)}>
                  <Button       
                      icon={<UploadOutlined /> }     
                    type="primary"
                   //style={{ marginRight: 8 }}
                  >
                    Upload
                  </Button>
                  </Popconfirm>
                  </Space>
              </div>

                </span>
              ) 
              : (
                <div> 
                 <Image 
                 width = {200} 
                 height = {120} 
                 src = {`data:image/jpg;base64,${record.image4} `}/>
              </div>
               )
            }
             </Space >         
          ) : null;         
        },
        
      },    
      {
        id: "image5",
        title: "Image5",
        dataIndex: "image5",
        name: "image5",
        align: "center",
        width : 300,
        render: (_, record) => {
          const editable = isEditing(record);
          return modifiedData.length >= 1 ? (
            <Space>
              {editable ? (
                  
                <span>

              <div>
              <div className = "imageUpload">
                <Upload
                id ="uploadImage5"
                action="https://www.mocky.io/v2/5cc8019d30000980a055e76"
                // listType="picture"
                defaultFileList={selectImage5}
                // action={"http://localhost:3000/list_auction"}
                maxCount={1}
                accept=".png,.jpeg,.jpg,.gif,image/*"
                beforeUpload={(ImageFile) => {    
                  const isLt2M = ImageFile.size / 1024 / 1024 < 1;
                  if(!isLt2M){
                    ImageFile.flag=true;
                    message.error('Maximum file image size 1MB')
                    return true
                  }  
                  setSelectImage5([ImageFile])
                  //  console.log("file : ",selectImage5);
                return false;
              }}
              >
                <Button>Browser Image (Max: 1)</Button>
                
              </Upload>
              </div>
              <br></br>
              <Space size="middle">
                <Popconfirm title="Sure to save?" onConfirm={() => onFileUploadImage5(record,record.key)}>
                  <Button       
                      icon={<UploadOutlined /> }     
                    type="primary"
                   //style={{ marginRight: 8 }}
                  >
                    Upload
                  </Button>
                  </Popconfirm>
                  </Space>
              </div>

                </span>
              ) 
              : (
                <div> 
                 <Image   
                 width = {200} 
                 height = {120} 
                 src = {`data:image/jpg;base64,${record.image5} `}/>
              </div>
               )
            }
             </Space >         
          ) : null;         
        },
      },    
      {
        id: "video1",
        title: "Video1",
        dataIndex: "video1",
        name: "video1",
        align: "center",
        width : 300,
        render: (_, record) => {
          const editable = isEditing(record);
          return modifiedData.length >= 1 ? (
            <Space>
              {editable ? (
                  
                <span>
              <div>
              <div className="imageUpload">
                <Upload
                id ="uploadVideo1"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // listType="video"
                // action={"http://localhost:3000/list_auction"}
                defaultFileList={selectVideo1}
                maxCount={1}
                accept=".mp4"
                beforeUpload={(VideoFile) => {    
                  const isLt2M = VideoFile.size / 1024 / 1024 < 5;
                  if(!isLt2M){
                    VideoFile.flag=true;
                    message.error('Maximum file video size 5MB')
                    return true
                  }
                  setSelectVideo1([VideoFile])
                  //  console.log("file : ",fileImage);
                return true;
              }}
              >
                <Button>Browser Video (Max: 1)</Button>
                
              </Upload>
              </div>
              <br></br>
              <Space size="middle">
                <Popconfirm title="Sure to save?" onConfirm={() => onFileUploadVideo1(record,record.key)}>
                  <Button       
                      icon={<UploadOutlined /> }     
                    type="primary"
                   //style={{ marginRight: 8 }}
                  >
                    Upload
                  </Button>
                  </Popconfirm>
                  </Space>
              </div>

                </span>
              )   
              : (           
                <div>
                <video controls ={true}
                src = {`data:video/mp4;base64,${record.video1} `}         
               type="video/mp4" 
               width = {200} 
               height = {120} 
               /> 
              </div>
               )
            }
             </Space >         
          ) : null;         
        },
        
      },  
      {
        id: "video_2",
        title: "Video_2",
        dataIndex: "video_2",
        name: "video_2",
        align: "center",
        width : 300,
        render: (_, record) => {
          const editable = isEditing(record);
          return modifiedData.length >= 1 ? (
            <Space>
              {editable ? (
                <span>
              <div>
              <div className="imageUpload">
                <Upload
                id ="uploadVideo2"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                defaultFileList={selectVideo2}
                // action={"http://localhost:3000/list_auction"}
                maxCount={1}
                accept=".mp4"
                beforeUpload={(VideoFile) => {    
                  const isLt5M = VideoFile.size / 1024 / 1024 < 5;
                  if(!isLt5M){
                    VideoFile.flag=true;
                    message.error('Maximum file video size 5MB')
                    return true
                  }
                  setSelectVideo2([VideoFile])
                  //  console.log("file : ",fileImage);
                return true;
              }}
              >
                <Button>Browser Video (Max: 1)</Button>
                
              </Upload>
              </div>
              <br></br>
              {/* <Button onClick ={onFileUpload} icon={<UploadOutlined /> }>Upload</Button> */}
              <Space size="middle">
                <Popconfirm title="Sure to save?" onConfirm={() => onFileUploadVideo2(record,record.key)}>
                  <Button       
                      icon={<UploadOutlined /> }     
                    type="primary"
                   //style={{ marginRight: 8 }}
                  >
                    Upload
                  </Button>
                  </Popconfirm>
                  </Space>
              </div>
                </span>
              ) 
              : (
                <div>
              <video controls ={true}
              src = {`data:video/mp4;base64,${record.video2} `}
              type="video/mp4"
              width = {200} 
              height = {120} 
              />
                </div>
               )
            }
             </Space >         
          ) : null;         
        },
        
      },
      {//Column Time
        id: "time",
        title: "Time",
        dataIndex: "time",
        name: "time",
        align: "center",
        width : 150,
        // editable: true,
        // sorter: (a, b) => a.time.length - b.time.length,
        // sortOrder: sortedInfo.columnKey === "time" && sortedInfo.order,
        // ...getColumnSearchProps("time"),
      },
      { //Column Date
        id: "date",
        title: "Date",
        dataIndex: "date",
        name: "date",
        align: "center",
        width : 250,
        render: (_,record) => {
          const formatDate = Moment(record.date).format('DD-MM-YYYY')
                return (
          <div>
            {formatDate}
          </div>
        );
      }
        // editable: true,
        // sorter: (a, b) => a.date.length - b.date.length,
        // sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order,
        // ...getColumnSearchProps("date"),
      },
    { //Column Price
      id: "price",
      title: "Price",
      dataIndex: "price",
      name: "price",
      align: "center",
      width : 150,
      editable: true,
      // sorter: (a, b) => a.price.length - b.price.length,
      // sortOrder: sortedInfo.columnKey === "price" && sortedInfo.order,
      // ...getColumnSearchProps("price"),
    },
    { //Column UserBid
        id: "userBid",
        title: "UserBid",
        dataIndex: "userBid",
        name: "userBid",
        align: "center",
        width : 300,
        editable: true,
        sorter: (a, b) => a.userBid.length - b.userBid.length,
        sortOrder: sortedInfo.columnKey === "userBid" && sortedInfo.order,
        ...getColumnSearchProps("userBid"),
      },
    { //Column PriceWinner
        id: "priceWinner",
        title: "Price winner",
        dataIndex: "priceWinner",
        name: "priceWinner",
        align: "center",
        width : 150,
        editable: true,
        // sorter: (a, b) => a.priceWinner.length - b.priceWinner.length,
        // sortOrder: sortedInfo.columnKey === "priceWinner" && sortedInfo.order,
        // ...getColumnSearchProps("priceWinner"),
      },
    { //Column View
      id: "view",
      title: "view",
      dataIndex: "view",
      name: "view",
      align: "center",
      width : 150,
      editable: true,
      // sorter: (a, b) => a.view.length - b.view.length,
      // sortOrder: sortedInfo.columnKey === "view" && sortedInfo.order,
      // ...getColumnSearchProps("view"),
    },
    { //Column Action
      
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
    window.location.reload();

      
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

  const onCheckVideo = (e) => {
    console.log(`checked = ${e.target.checked}`);
    if(e.target.checked === true){
    const response = axios.get(
      "http://localhost:8083/api/v1/ListVideoNotNull",
      ).then(res => { console.log(res)
        setGridData(res.data);
        setLoading(false);
      })
     .catch(err => {  
         console.error(err)
     });;
    }if(e.target.checked === false){
      loadData();
    }
  }


  const globalSearch = () => {

    filteredData = modifiedData.filter((value) => {
      return (
        value.username.toLowerCase().includes(searchText.toLowerCase()) ||
        value.productName.toLowerCase().includes(searchText.toLowerCase()) ||
        value.userBid.toLowerCase().includes(searchText.toLowerCase()) 
      
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
        <Checkbox onChange={onCheckVideo}>Video</Checkbox>
        <Button onClick={clearAll}  >Refresh</Button>
        
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

export default List_Auction;