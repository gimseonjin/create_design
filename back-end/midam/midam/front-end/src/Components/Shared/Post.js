// /* Post.js */
// import React from 'react';
// import useRequest from './useRequest';

// const Post = () => {
//     console.log('1');
//     const [response, loading, error] = useRequest('/testGet');
//     console.log('1-1');
    
//     if (loading) {
//         return <div>loading...</div>;
//     }

//     if (error) {
//         return <div>Error!</div>;
//     }

//     if (!response) {
//         console.log('1-2');
//         return null;
//     }

//     const data = response.data.message;
//     const header = response.header;
//     console.log('1-3');
//     return (
//         <div>
//             <h1>{data}</h1>
//             <hr></hr>
//             {header}
         
//         </div>
//     );
// };

// export default Post;