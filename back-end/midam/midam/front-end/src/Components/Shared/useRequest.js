// /* useReqeust.js */
// import React, {useEffect, useState} from 'react';
// import axios from 'axios';

// const useRequest = (url) => {
//     const [loading, setLoading] = useState(false);
//     const [response, setResponse] = useState(null);
//     const [error, setError] = useState(null);
    
//     useEffect(
//         async () => {
           
//             setError(false);

//             try {
//                 setLoading(true);
                
//                 const res = await axios.get(url);
              
//                 setResponse(res);
              
//             } catch (e) {
//                 setError(e);
//             }

//             setLoading(false);
           
//         },
//         [url]
//     );
   
//     return [response, loading, error];
// }

// export default useRequest;