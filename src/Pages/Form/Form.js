import React, { useEffect, useState } from 'react';
import style from './Form.module.scss';
import axios from 'axios';
import Details from '../Details/Details'; // Import the Details component

const Form = ({ handleGet }) => {
  const [activeTab, setActiveTab] = useState('generic');
  const [inputTariff, setInputTariff] = useState('');
  const [inputPurpose, setInputPurpose] = useState('');
  const [inputBillingCycle, setInputBillingCycle] = useState('');
  const [inputConsumerUnits, setInputConsumerUnits] = useState('');
  const [inputPhase, setInputPhase] = useState('');
  const [amount, setAmount] = useState(null);

  const URL = process.env.REACT_APP_SERVER_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      inputTariff,
      inputPurpose,
      inputBillingCycle,
      inputConsumerUnits,
      inputPhase,
    };

    console.log(formData);

    axios.post(`${URL}/submit`, formData)
      .then(response => {
        console.log('Form submitted successfully:', response);
        const responseString = response.data; 
        const amountValue = parseFloat(responseString.match(/Rs (\d+\.\d+)/)[1]);
        handleGet(amountValue)
      })
      .catch(error => {
        console.error('Error submitting the form:', error);
      });
  };

  useEffect(() => {}, []);

  const handleTariffChange = (e) => {
    setInputTariff(e.target.value);
  };

  const handlePurposeChange = (e) => {
    setInputPurpose(e.target.value);
  };

  const handleBillingCycleChange = (e) => {
    setInputBillingCycle(e.target.value);
  };

  const handleConsumerUnitsChange = (e) => {
    setInputConsumerUnits(e.target.value);
  };

  const handlePhaseChange = (e) => {
    setInputPhase(e.target.value);
  };

  const renderForm = () => {
    return (
      <div className={`${style.tabContent} ${activeTab === "generic" ? style.active : ""}`}>
        <div className={style.inputBox}>
          <div className={style.fieldName}>Tariff</div>
          <select className={style.selectField} value={inputTariff} onChange={handleTariffChange}>
            <option value="">--Please select a tariff--</option>
            <option value="Tariff 1">Tariff 1</option>
          </select>
        </div>

        <div className={style.inputBox}>
          <div className={style.fieldName}>Purpose</div>
          <select className={style.selectField} value={inputPurpose} onChange={handlePurposeChange}>
            <option value="">--Please select a purpose--</option>
            <option value="Domestic">Domestic</option>
          </select>
        </div>

        <div className={style.inputBox}>
          <div className={style.fieldName}>Billing Cycle</div>
          <div className={style.radioBox}>
            <input type="radio" name="billingCycle" value={"2 months"} onChange={handleBillingCycleChange} />
            <span>2 months</span>
          </div>
        </div>
        <div className={style.inputBox}>
          <div className={style.fieldName}>Consumer Units</div>
          <input type="number" value={inputConsumerUnits} className={style.input} name="consumerUnits" onChange={handleConsumerUnitsChange} />
        </div>

        <div className={style.inputBox}>
          <div className={style.fieldName}>Phase</div>
          <div className={style.radioBox}>
            <input type="radio" name="phase" value="Single Phase" onChange={handlePhaseChange} />
            <span>Single Phase</span>
          </div>
        </div>

        <div className={style.inputBox}>
          <button className={style.submitBtn} type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    );
  };

  return (
    <div className={style.formContainer}>
      <div className={style.headerName}>Electricity Bill Calculator</div>
      <div className={style.main}>
        <div className={style.container}>
          <div className={style.tabContainer}>
            <button className={`${style.tabButton} ${activeTab === 'generic' ? style.active : ''}`} onClick={() => setActiveTab('generic')}>Generic</button>
            <button className={`${style.tabButton} ${activeTab === 'advanced' ? style.active : ''}`} onClick={() => setActiveTab('advanced')}>Advanced</button>
          </div>
          <div className={style.innerContainer}>
            {activeTab === "generic" ? renderForm() : <> Page Not Found</>}
          </div>
        </div>
      </div>  
    </div>
  );
}

export default Form;
