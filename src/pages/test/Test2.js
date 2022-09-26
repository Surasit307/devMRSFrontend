import { Button, Checkbox } from 'antd';
import React, { useState } from 'react';

const App = () => {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const toggleDisable = () => {
    setDisabled(!disabled);
  };

  const onChange = (e) => {
    console.log('checked = ', e.target.checked);
    setChecked(e.target.checked);
  };

  const label = `${checked}`;
  return (
    <>
      <p
        style={{
          marginBottom: '20px',
        }}
      >
        <Checkbox checked={checked} disabled={disabled} onChange={onChange}>
          Video
        </Checkbox>
      </p>
      <p>
        <Button type="primary" size="small" onClick={toggleChecked}>
       Uncheck
        </Button>
        <Button
          style={{
            margin: '0 10px',
          }}
          type="primary"
          size="small"
          onClick={toggleDisable}
        >
          {!disabled ? 'Disable' : 'Enable'}
        </Button>
      </p>
    </>
  );
};

export default App;