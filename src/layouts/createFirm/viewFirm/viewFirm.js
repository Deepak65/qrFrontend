

// import React, { useEffect, useState } from 'react';
// import QRCode from "react-qr-code";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { getData, addValue, updateValue } from '../../service/authService';

// function QrCode() {
//   const [data, setData] = useState([]);

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const temp = [...data];
//     temp[index][name] = value;
//     setData(temp);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getData();
//       setData(data);
//     };
//     fetchData();
//   }, []);

//   const handleAddValue = async (item, index) => {
//     await addValue(item.company, item.value);
//     const temp = [...data];
//     temp[index].isNew = false;
//     setData(temp);
//   };

//   const handleUpdateValue = async (item, index) => {
//     await updateValue(item.company, item.value);
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <div style={{
//         display: "flex",
//         alignItems: "center",
//         flexWrap: "wrap",
//         gap: "10px",
//       }}>
//         {data?.map((item, index) => (
//           <div key={index} style={{
//             border: "1px solid #000",
//             width: 'fit-content',
//             marginTop: "10px",
//             padding: "10px",
//             minWidth: "380px",
//           }}>
//             <input
//               type="text"
//               placeholder="Enter company name"
//               name='company'
//               onChange={(e) => handleChange(e, index)}
//               value={item.company}
//             />
//             <br />
//             <input
//               type="text"
//               placeholder="URL"
//               name='url'
//               onChange={(e) => handleChange(e, index)}
//               value={item.url}
//               disabled
//             />
//             <br />
//             <input
//               type="text"
//               placeholder="VALUE"
//               name='value'
//               onChange={(e) => handleChange(e, index)}
//               value={item.value}
//             />
//             <br />
//             <button
//               disabled={!item.company || !item.value}
//               onClick={() => handleAddValue(item, index)}
//             >
//               Generate
//             </button>
//             {!item.isNew && (
//               <button onClick={() => handleUpdateValue(item, index)}>
//                 UPDATE
//               </button>
//             )}
//             <p>{item.company}, {item.value}, {item.url}</p>
//             <div>
//               <QRCode
//                 size={256}
//                 style={{ height: "auto", maxWidth: "100%", width: "100px", margin: "10px" }}
//                 value={item.url}
//                 viewBox={`0 0 256 256`}
//               />
//             </div>
//           </div>
//         ))}
//         <button onClick={() => setData([...data, {
//           url: 'https://qrcode-api.indicold.in/redirect/',
//           value: "",
//           company: "",
//           isNew: true,
//         }])} style={{
//           margin: "10px"
//         }}>
//           Add New
//         </button>
//       </div>
//     </DashboardLayout>
//   );
// }

// export default QrCode;
// import React, { useEffect, useState } from 'react';
// import QRCode from "react-qr-code";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { getData, addValue, updateValue,getAllFirm } from '../../service/authService';
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import styled from "styled-components";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { Button, Modal, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// // Custom Styled Components
// const CustomTableHead = styled(TableHead)`
//   display: contents !important;
// `;

// const CustomTableContainer = styled(TableContainer)`
// box-shadow: none !important;
//   &::-webkit-scrollbar {
//     width: 0px;
//     height:0px;
//     background: transparent; 
//   }
//   &::-webkit-scrollbar-thumb {
//     background: #aaa; 
//   }
//   overflow-x: auto; 
// `;

// const CustomTableCellHeading = styled(TableCell)`
// white-space:nowrap;
// `
// const CustomTableCell = styled(TableCell)`
// color: #777777 !important;
// white-space:nowrap;
// `

// const MainDiv = styled(MDBox)`
// display: flex;
//     justify-content: space-between;
//     background:linear-gradient(195deg, #49a3f1, #e8851a) !important; 
// }
// `
// const AddButton = styled.button`
// border: none;
//     background: none;
//     color: white;
// `;
// const ModalDiv= styled.div`
// display: flex;
//     padding: var(--bs-modal-padding);
// `
// const CloseButton = styled.button`
// border: none;
// background: none;
// `;
// const SubmitButton = styled.button`
// border-radius: 8px;
// border:none;
// color:white;
// padding:8px;
// background:linear-gradient(195deg, #49a3f1, #e8851a)

// `;
// function QrCode() {
//   const [data, setData] = useState([]);
//   const [firm, setFirm] = useState([]);
//   useEffect(() => {
//     async function fetchFirmDetails() {
//       try {
//         const data = await getAllFirm();
//         setFirm(data?.data);
//         console.log(data?.data,"199")
       
//         // setloading(false)
//       } catch (error) {
       
//         console.error("Error fetching partner details:", error);
//       }
//     }
//     fetchFirmDetails();
//   }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getData();
//       setData(data);
//     };
//     fetchData();
//   }, []);

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const temp = [...data];
//     temp[index][name] = value;
//     setData(temp);
//   };

//   const handleAddValue = async (item, index) => {
//     await addValue(item.company, item.value);
//     const temp = [...data];
//     temp[index].isNew = false;
//     setData(temp);
//   };

//   const handleUpdateValue = async (item, index) => {
//     await updateValue(item.company, item.value);
//   };

//   const handleAddRow = () => {
//     setData([...data, {
//       url: 'https://qrcode-api.indicold.in/redirect/',
//       value: "",
//       company: "",
//       isNew: true,
//     }]);
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <div className="p-lg-4 p-3">
//         <MDBox pt={6} pb={3}>
//           <Grid container spacing={6} className="firm_details_table">
//             <Grid item xs={12} className="p-0">
//               <Card>
//                 <MainDiv
//                   mx={2}
//                   mt={-3}
//                   py={3}
//                   px={2}
//                   variant="gradient"
//                   borderRadius="lg"
//                   bgColor="info"
//                   coloredShadow="info"
//                 >
//                   <MDTypography variant="h6" color="white">
//                     ADD QR
//                   </MDTypography>
//                   <AddButton  onClick={handleAddRow}>ADD</AddButton>
//                 </MainDiv>
//                 <MDBox pt={3} ps={4}>
//                   <>
//                     <CustomTableContainer component={Paper} className="partner_detials_table">
//                       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                         <CustomTableHead>
//                           <TableRow>
//                             <CustomTableCellHeading className="white-space">Company</CustomTableCellHeading>
//                             <CustomTableCellHeading className="white-space">URL</CustomTableCellHeading>
//                             <CustomTableCellHeading className="white-space">Value</CustomTableCellHeading>
//                             <CustomTableCellHeading className="white-space">Actions</CustomTableCellHeading>
//                             <CustomTableCellHeading className="white-space">QR Code</CustomTableCellHeading>
//                           </TableRow>
//                         </CustomTableHead>
//                         <TableBody>
                          
//                             {data?.map((item,index)=> (
//                          <TableRow key={index} style={{ cursor: 'pointer' }}>
//                             <CustomTableCell className="white-space">  <input
//                     type="text"
//                     placeholder="Enter company name"
//                     name="company"
//                     onChange={(e) => handleChange(e, index)}
//                     value={item.company}
//                   /></CustomTableCell>
//                             <CustomTableCell className="white-space"><input
//                     type="text"
//                     placeholder="URL"
//                     name="url"
//                     onChange={(e) => handleChange(e, index)}
//                     value={item.url}
//                     disabled
//                   /></CustomTableCell>
//                             <CustomTableCell className="white-space"> <input
//                     type="text"
//                     placeholder="VALUE"
//                     name="value"
//                     onChange={(e) => handleChange(e, index)}
//                     value={item.value}
//                   /></CustomTableCell>
//                             <CustomTableCell className="white-space"> <button
//                     disabled={!item.company || !item.value}
//                     onClick={() => handleAddValue(item, index)}
//                   >
//                     Generate
//                   </button>
//                   {!item.isNew && (
//                     <button onClick={() => handleUpdateValue(item, index)}>
//                       UPDATE
//                     </button>
//                   )}</CustomTableCell>
//                             <CustomTableCell className="white-space"> <QRCode
//                     size={128}
//                     style={{ height: "auto", maxWidth: "100%", width: "100px" }}
//                     value={item.url}
//                     viewBox={`0 0 128 128`}
//                   /></CustomTableCell>
//                             </TableRow>
//                            )
                            

//                             )}
                            
                        
//                         </TableBody>
//                       </Table>
//                     </CustomTableContainer>
//                   </>
//                 </MDBox>
//               </Card>
//             </Grid>
//           </Grid>
//         </MDBox>
//       </div>
//     </DashboardLayout>
//   );
// }

// export default QrCode;
import React, { useEffect, useState} from 'react';
import QRCode from "react-qr-code";
import { getFirmDetails,getFirmCount} from '../../../service/authService';
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {  Tooltip } from '@mui/material';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// Custom Styled Components
const CustomTableHead = styled(TableHead)`
  display: contents !important;
`;

const CustomTableContainer = styled(TableContainer)`
box-shadow: none !important;
  &::-webkit-scrollbar {
    width: 0px;
    height:0px;
    background: transparent; 
  }
  &::-webkit-scrollbar-thumb {
    background: #aaa; 
  }
  overflow-x: auto; 
`;

const CustomTableCellHeading = styled(TableCell)`
white-space:nowrap;
`
const CustomTableCell = styled(TableCell)`
color: #777777 !important;
white-space:nowrap;
`

const MainDiv = styled(MDBox)`
display: flex;
flex-direction: column;
align-items: center;
background: linear-gradient(195deg, #49a3f1, #e8851a) !important;
padding: 20px;
`
const MainSecondDiv = styled(MDBox)`
display: flex;
    justify-content: space-between;
    background:linear-gradient(195deg, #49a3f1, #e8851a) !important; 
`

const AddButton = styled.button`
border: none;
    background: none;
    color: white;
`;
const ModalDiv= styled.div`
display: flex;
    padding: var(--bs-modal-padding);
`
const CloseButton = styled.button`
border: none;
background: none;
`;
const SubmitButton = styled.button`
border-radius: 8px;
border:none;
color:white;
padding:8px;
background:linear-gradient(195deg, #49a3f1, #e8851a)

`;
const CustomModal = styled(Modal)`
z-index:99999;
`


const FirmDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const DetailItem = styled.div`
  margin: 10px 0;
  font-size: 18px;
  color: #fff;
`;

const QRCodeContainer = styled.div`
  margin-top: 20px;
`;
function ViewFirm() {
    const { id } = useParams();
    const [firmDetails, setFirmDetails] = useState(null);
    const [firmCount, setFirmCount] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
  
    useEffect(() => {
      async function fetchFirmDetails() {
        try {
          const response = await getFirmDetails(id);
          setFirmDetails(response?.data);
        } catch (error) {
          console.error("Error fetching firm details:", error);
        }
      }
      fetchFirmDetails();
      async function fetchFirmCount() {
        try {
          const response = await getFirmCount(id,selectedDate);
          setFirmCount(response?.data);
        } catch (error) {
          console.error("Error fetching firm details:", error);
        }
      }
      fetchFirmCount();
    }, [selectedDate]);
    const formatDateToDelhiTime = (dateString) => {
      const date = new Date(dateString);
  
      // Adjust for UTC+5:30 (Delhi time)
      const utcOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
      const localDate = new Date(date.getTime() + utcOffset);
  
      // Format the date to a readable string
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
  
      return localDate.toLocaleString('en-IN', options).replace(',', ''); // Format for India
    };
    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
    };
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <div className="p-lg-4 p-3">
          <MDBox pt={6} pb={3}>
            {firmDetails ? (
              <MainDiv>
                <MDTypography variant="h5" color="white">
                  Firm Details
                </MDTypography>
                <FirmDetailDiv>
                  <DetailItem><strong>Firm Name:</strong> {firmDetails.firm.firm_name}</DetailItem>
                  <DetailItem><strong>Email:</strong> {firmDetails.firm.email}</DetailItem>
                  <DetailItem><strong>Phone:</strong> {firmDetails.firm.phone}</DetailItem>
                  <DetailItem><strong>PAN:</strong> {firmDetails.firm.pan}</DetailItem>
                  <DetailItem><strong>Status:</strong> {firmDetails.firm.status}</DetailItem>
                  <DetailItem><strong>Created At:</strong> {new Date(firmDetails.firm.created_at).toLocaleDateString()}</DetailItem>
                  <DetailItem><strong>Created By:</strong> {firmDetails.firm.created_by}</DetailItem>
                </FirmDetailDiv>
                <QRCodeContainer>
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "200px" }}
                    value={`https://qrcode-api.indicold.in/redirect/${firmDetails.firm.firm_name}`}
                    viewBox={`0 0 256 256`}
                  />
                </QRCodeContainer>
              </MainDiv>
            ) : (
              <p>Loading...</p>
            )}
          </MDBox>
          <br></br>
          <div className="p-lg-4 p-3">
          <MDBox pt={3} pb={3}>
            
         
          <Grid container spacing={6} className="firm_details_table">
            <Grid item xs={12} className="p-0">
              <Card>
                <MainSecondDiv
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  borderRadius="lg"
                  bgColor="info"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Qr Count
                  </MDTypography>
                  <div> <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              style={{ marginBottom: '20px',backgroundColor: 'transparent',
              border: 'none' }}
            /></div>
                </MainSecondDiv>
                <MDBox pt={3} ps={4}>
                  <CustomTableContainer component={Paper} className="partner_detials_table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <CustomTableHead>
                        <TableRow>
                          <CustomTableCellHeading className="white-space">Date</CustomTableCellHeading>
                          <CustomTableCellHeading className="white-space">Count</CustomTableCellHeading>
                        </TableRow>
                      </CustomTableHead>
                      <TableBody>
      {firmCount && firmCount?.length > 0 ? (
        firmCount?.map((row, index) => (
          <TableRow key={index} style={{ cursor: 'pointer' }}>
            <CustomTableCell className="white-space">{formatDateToDelhiTime(row?.date)}</CustomTableCell>
            <CustomTableCell className="white-space">{row?.count}</CustomTableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <CustomTableCell colSpan={2} className="white-space" align="center">
            No data found
          </CustomTableCell>
        </TableRow>
      )}
    </TableBody>
                    </Table>
                  </CustomTableContainer>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        </div>
          </div>
          
      </DashboardLayout>
    );
  }
  
  export default ViewFirm;