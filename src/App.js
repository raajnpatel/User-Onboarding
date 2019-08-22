import React, {useState} from 'react';
import { Form } from 'formik';
import './App.css';
import FormikLoginForm from "./Form.js";

function App() {
  return (
    <div className="App">
        <h1>Onboarding</h1>
      <FormikLoginForm />
    </div>
  );
}

export default App;
