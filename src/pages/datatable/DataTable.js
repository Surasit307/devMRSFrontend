import './DataTable.css';
import 'styled-components'
import React, {useState, useEffect} from 'react';
import DataTable , {createTheme} from 'react-data-table-component';

const App = () => {
  //1 - Configurar los hooks
  const [account, setAccount] = useState( [] )

  //2 - Función para mostrar los datos con fetch
  const URL = 'http://localhost:8083/api/v1/account'
  const showData = async () => {
    const response = await fetch(URL)
    const data     = await response.json()
    console.log(data)
    setAccount(data)
  }

  useEffect( ()=>{
    showData()
  }, [])

  //3 - Configuramos las columns para Datatable
  const columns = [
    {
      name: 'AccountID',
      selector: row => row.accountId
    },
    {
      name: 'Username',
      selector: row => row.username
    },
    {
      name: 'Password',
      selector: row => row.password
    },
    {
        name: 'Firstname',
        selector: row => row.firstname
      },
      {
        name: 'Lastname',
        selector: row => row.lastname
      },
      {
        name: 'Gender',
        selector: row => row.gender
      },
      {
        name: 'Email',
        selector: row => row.email
      },
      {
        name: 'Address',
        selector: row => row.address
      },
  ]

  //personalizar temas
 /*  createTheme('custom', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark'); */
  
  const MyComponent = () => (
    <DataTable
      title="Data Table"
      columns={columns}
      theme="solarized"
    />
  );

  //4 - Mostramos la data en DataTable
  return (
    <div className="DataTable">
        <center>
      <h1>Account Data Table</h1>
      </center>

      
     <DataTable 
      columns={columns}
      data={account}
      //theme='custom' //habilitar esta linea y descomentar createTheme()
      pagination
      
     />
    </div>
  );
}

export default App;