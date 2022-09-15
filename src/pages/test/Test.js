import axios from "axios";
import React, { useState } from "react";

const Test = () =>  {
 
  const [selectImage,setSelectImage] = useState(null);
  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
   const value =  setSelectImage(event.target.files) ;
  };

  console.log(selectImage)

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

    return (
      <div>
        <h3>Test File Upload using FormData Type</h3>
        <div>
          <input type="file" onChange={onFileChange} multiple />
          <button onClick={onFileUpload}>Upload!</button>
        </div>
      </div>

      
    );
    
}

export default Test;