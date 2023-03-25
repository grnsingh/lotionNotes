// import React, { useState, useEffect } from 'react';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// function Login({ profile, setProfile }) {
//     const [ user, setUser ] = useState([]);

//     const login = useGoogleLogin({
//         onSuccess: (codeResponse) => setUser(codeResponse),
//         onError: (error) => console.log('Login Failed:', error)
//     });

//     useEffect(
//         () => {
//             if (user) {
//                 axios
//                     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                         headers: {
//                             Authorization: `Bearer ${user.access_token}`,
//                             Accept: 'application/json'
//                         }
//                     })
//                     .then((res) => {
//                         setProfile(res.data);
//                     })
//                     .catch((err) => console.log(err));
//             }
//         },
//         [ user ]
//     );

//     // log out function to log the user out of google and set the profile array to null
//     const logOut = () => {
//         googleLogout();
//         setProfile(null);
//     };

//   return (
//     <div>
//       {profile ? (
//         <div style={{ display: "flex", flexDirection: "row" }}>
//           <img
//             src={profile.imageUrl}
//             alt="user image"
//             style={{
//               borderRadius: "50%",
//               width: "30px",
//               height: "30px",
//               margin: "5px",
//               marginTop: "17px",
//               padding: "5px",
//             }}
//           />
//           <p
//             style={{
//               fontSize: "15px",
//               fontWeight: "bold",
//               margin: "5px",
//               marginTop: "23px",
//               padding: "5px",
//             }}
//           >
//             {profile.name}
//           </p>
//           <button style={{
//             backgroundColor: "orange",
//             color: "white",
//             padding: "8px 16px",
//             borderRadius: "4px",
//             cursor: "pointer",
//             marginTop: "20px",
//           }} 
//           onClick={logOut}>
//             Log out
//             </button>
//         </div>
//       ) : (
//         <button
//           onClick={login}
//           style={{
//             backgroundColor: "blue",
//             color: "white",
//             padding: "8px 16px",
//             borderRadius: "4px",
//             cursor: "pointer",
//             marginTop: "20px",
//           }}
//         >
//           Sign in with Google
//         </button>
//       )}
//     </div>
//   );
// }

// export default Login;