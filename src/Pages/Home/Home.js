import React, { useState } from 'react'
import style from "./Home.module.scss"
import Form from '../Form/Form'
import Details from '../Details/Details'

const Home = () => {

  const [amount, setAmount] = useState(null);

  const handleGet= (a) => {
    setAmount(a);
  };

  return (
    <div className={style.Home}>
       <div className={style.imageDiv}> <img src="https://kseb.in/frontend/assets/img/logo.png" alt="" /></div>
        <div className={style.containerBox}>
          <div className={style.innerContainer}>

            <div className={style.formBox}>
          <Form handleGet = {handleGet} />
          
          </div>

          <div className={style.detailBox}>
          <Details amount = {amount} />
          </div>

          </div> 
       
      </div>
    </div>
  )
}

export default Home