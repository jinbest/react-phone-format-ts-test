import React, { useState, useEffect } from "react";
import CustomInput from "./CustomInput";
import { phoneFormatString } from "./helper";
import { Button } from "@material-ui/core";
import "./App.css";

const App = () => {
  const [val, setVal] = useState("");
  const [errVal, setErrVal] = useState("");
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    if (val && !(val.match(/^[0-9]+$/) != null)) {
      setErrVal("You need to input only Number");
      setTimeout(() => {
        setErrVal("");
        setVal("");
      }, 3000);
    }
  }, [val]);

  const handleInput = (event: React.ChangeEvent<{ value: string }>) => {
    if (event.target.value.length > 10 || errVal) {
      return;
    }
    setVal(event.target.value);
  };

  const handleCreateList = () => {
    if (val.length < 10) {
      setErrVal("Phone Number length is short");
      setTimeout(() => {
        setErrVal("");
        setVal("");
      }, 3000);
      return;
    }
    const cntList: string[] = list;
    const newList = [val].concat(cntList);
    setList([...newList]);
    setVal("");
  };

  const handleArrange = () => {
    const cntList: string[] = list;
    cntList.sort();
    setList([...cntList]);
  };

  const onKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleCreateList();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [val]);

  return (
    <div className="App">
      <CustomInput
        value={val}
        placeholder={"Input PhoneNumber*"}
        handleChange={handleInput}
        errorText={errVal}
        border="#eee"
      />
      <div className="button-div">
        <Button variant="contained" color="primary" onClick={handleCreateList}>
          Create
        </Button>
        <Button variant="contained" color="secondary" onClick={handleArrange}>
          Arrange
        </Button>
      </div>
      <ul>
        {list.map((item: string, index: number) => {
          return <li key={index}>{phoneFormatString(item)}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
