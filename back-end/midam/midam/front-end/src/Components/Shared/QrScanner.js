import React, { useEffect, useState } from 'react'
import QrReader from 'react-qr-reader'
import axios from 'axios';
 
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

  function enterActivity(parsedResults){ // userToken, isSelected(0: enter, 1:exit), activityCode(historyCode) 순서
    let form=new FormData();
    form.append("linkAgencyManagerToken",localStorage.getItem("userToken"));
    form.append("mentorToken",parsedResults[1]);
    form.append("activityCode",parsedResults[2]);
    axios.post("/activityHistory/enterActivity/linkAgencyManager",form).then((response)=>{
      alert(response.data.responseMsg);
    })
  }
  function exitActivity(parsedResults){
    let form=new FormData();
    form.append("linkAgencyManagerToken",localStorage.getItem("userToken"));
    form.append("mentorToken",parsedResults[1]);
    form.append("activityHistoryCode",parsedResults[2]);
    axios.post("/activityHistory/exitActivity/linkAgencyManager",form).then((response)=>{
      alert(response.data.responseMsg);
    })
  }

  useEffect(()=>{
    if(result){
      let parsedResults = [];
      parsedResults=result.split(',');
      console.log(parsedResults);
      if(parsedResults[0]==='0'){
        enterActivity(parsedResults);
      }else if(parsedResults[0]==='1'){
        exitActivity(parsedResults);
      }
    }
  },[result])
 
    return (
      <div className="container">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          
          style={{ 
            width: window.innerHeight*0.5
            
           }}
        />
        {result}
      </div>
    )
}
export default QrScanner;