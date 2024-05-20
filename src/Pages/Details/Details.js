import React from 'react'
import style from './Details.module.scss'

const Details = ({ amount }) => {
  return (
    <div className={style.detailsContainer}>
        <div className={style.headerDiv}>
          <div>Bill Details</div>
          <div>Amount(₹)</div>
        </div>
        <div className={style.container}>
        <div className={style.innerContainer}>
        <span className={style.energyValue}>Energy Charge (EC)* </span> 
        <span>{amount? amount : "0"}</span>
        </div>
        
        <div className={style.totalAmount}>
            <div className={style.amountGroup}>
                  <span>Total Amount</span><span>{amount? amount : "0"}</span>
            </div>
        <span className={style.fixedChargeTxt}>* Fraction of rupees rounded off in total amount, is adjusted in Energy Charge/Fixed Charge.</span>
        </div>
        </div>
        
    </div>
  )
}

export default Details