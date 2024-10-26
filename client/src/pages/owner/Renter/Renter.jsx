import React from 'react'

export default function Renter() {
  return (
    <div>
      renter
    </div>
  )
}

// import { useState, useEffect ,useContext} from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';
// import { UserContext } from "../../../context/UserData";
// const serverapiUrl = import.meta.env.VITE_API_URL;

// export default function Renter() {
//   const { user } = useContext(UserContext);
//   const [renters, setRenters] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
    
//     const fetchRenters = async () => {
//       try {
//         const response = await axios.get(`${serverapiUrl}/owner/renter/allrenter/${user._id}`);
//         setRenters(response.data);
//       } catch (error) {
//         console.error("Error fetching renters:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRenters();
//   }, []);

//   const columns = [
//     { field: 'renterId', headerName: 'Renter ID', width: 200 },
//     { field: 'renterName', headerName: 'Renter Name', width: 200 },
//     { field: 'renterEmail', headerName: 'Email', width: 250 },
//     { field: 'paymentDate', headerName: 'Payment Date', width: 200, type: 'date' },
//   ];

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <h2>Successful Renters</h2>
//       <DataGrid
//         rows={renters.map((renter, index) => ({ id: index, ...renter }))}
//         columns={columns}
//         pageSize={5}
//         loading={loading}
//         rowsPerPageOptions={[5, 10, 20]}
//       />
//     </div>
//   );
// }
