import React, { useEffect, useState } from 'react'
import QrReader from 'react-qr-reader'
 
function QrScanner(){
  const [result, setResult] = useState();
  

  const handleScan = data => {
    if (data) {
      setResult(data)
    }
  }

  const handleError = err => {
    console.error(err)
  }

  function enterActivity(parsedResults){
    let form=new FormData();
    form.append("linkAgencyManagerToken",localStorage.getItem("userToken"));
    form.append("mentorToken",parsedResults[0])
    form.append("activityCode",parsedResults[2]);
  }
  function exitActivity(parsedResults){

  }

  useEffect(()=>{
    if(result){
      let parsedResults = [];
      parsedResults=result.split(',');
      if(parsedResults[1]===0){
        enterActivity();
      }else if(parsedResults[1]===0){
        exitActivity();
      }

    }
  },[result])
 
    return (
      <div>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: window.innerHeight*0.6 }}
        />
        <p>{result}</p>
      </div>
    )
  
}
export default QrScanner;