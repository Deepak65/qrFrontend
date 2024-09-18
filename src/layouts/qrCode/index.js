
import React, { useEffect, useState, useRef } from 'react';
import QRCode from "react-qr-code";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { getData, addValue, updateValue,getAllFirm } from '../../service/authService';
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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import {  Tooltip } from '@mui/material';
import { saveAs } from 'file-saver';

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
    justify-content: space-between;
    background:linear-gradient(195deg, #49a3f1, #e8851a) !important; 
}
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
const ButtonDiv = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`
const UrlSpan = styled.span`
display: block;
max-width: 200px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`
function QrCode() {
  const [data, setData] = useState([]);
  const [firms, setFirms] = useState([]);
  const qrRefs = useRef({});

  useEffect(() => {
    async function fetchFirmDetails() {
      try {
        const response = await getAllFirm();
        setFirms(response?.data);
        console.log(response?.data, "199");
      } catch (error) {
        console.error("Error fetching firm details:", error);
      }
    }
    fetchFirmDetails();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData();
      setData(response);
    };
    fetchData();
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const temp = [...data];
    temp[index][name] = value;
    setData(temp);
  };

  const handleSelectCompany = (e, index) => {
    const selectedFirm = e.target.value;
    const temp = [...data];
    temp[index].company = selectedFirm;
    temp[index].url = `https://qrcode-api.indicold.in/redirect/?company=${selectedFirm}`;
    setData(temp);
  };

  const handleAddValue = async (item, index) => {
    await addValue(item.company, item.value);
    const temp = [...data];
    temp[index].isNew = false;
    setData(temp);
  };

  const handleUpdateValue = async (item, index) => {
    await updateValue(item.company, item.value);
  };
// const handleDownloadQRCode = async (index) => {
//     const canvas = await html2canvas(qrRefs.current[index]);
//     const dataURL = canvas.toDataURL("image/png");
//     const link = document.createElement('a');
//     link.href = dataURL;
//     link.download = `qrcode-${index}.png`;
//     link.click();
//   };
// const downloadQRCode = (url, index) => {
//     const canvas = document.createElement('canvas');
//     const qr = qrRefs.current[index];
//     const svg = qr.querySelector('svg');
//     const svgData = new XMLSerializer().serializeToString(svg);
//     const img = new Image();
    
//     img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0);
//       canvas.toBlob((blob) => {
//         saveAs(blob, `qrcode-${index}.png`);
//       });
//     };
//   };
const downloadQRCode = (url, index) => {
  const scale = 4; // Increase scale factor for higher resolution
  const canvas = document.createElement('canvas');
  const svgElement = qrRefs.current[index]?.querySelector('svg');
  const svgData = new XMLSerializer().serializeToString(svgElement);
  
  // Set canvas dimensions
  const img = new Image();
  img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  img.onload = () => {
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    
    // Convert canvas to Blob and save it
    canvas.toBlob((blob) => {
      saveAs(blob, `qrcode-${index}.png`);
    }, 'image/png');
  };
};
  const handleAddRow = () => {
    setData([...data, {
      url: 'https://qrcode-api.indicold.in/redirect/',
      value: "",
      company: "",
      isNew: true,
    }]);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="p-lg-4 p-3">
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6} className="firm_details_table">
            <Grid item xs={12} className="p-0">
              <Card>
                <MainDiv
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
                    ADD QR
                  </MDTypography>
                  <AddButton  onClick={handleAddRow}>ADD</AddButton>
                </MainDiv>
                <MDBox pt={3} ps={4}>
                  <>
                    <CustomTableContainer component={Paper} className="partner_detials_table">
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <CustomTableHead>
                          <TableRow>
                            <CustomTableCellHeading className="white-space">Company</CustomTableCellHeading>
                            <CustomTableCellHeading className="white-space">URL</CustomTableCellHeading>
                            <CustomTableCellHeading className="white-space">Value</CustomTableCellHeading>
                            <CustomTableCellHeading className="white-space">Actions</CustomTableCellHeading>
                            <CustomTableCellHeading className="white-space">QR Code</CustomTableCellHeading>
                          </TableRow>
                        </CustomTableHead>
                        <TableBody>
                        {data.map((item, index) => (
                          <TableRow key={index}>
                            <CustomTableCell className="white-space">
                              <select
                              className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                value={item.company}
                                onChange={(e) => handleSelectCompany(e, index)}
                              >
                                <option value="" disabled>Select a firm</option>
                                {firms.map(firm => (
                                  <option key={firm.firm_name} value={firm.firm_name}>
                                    {firm.firm_name}
                                  </option>
                                ))}
                              </select>
                            </CustomTableCell>
                            <CustomTableCell className="white-space">
                            <Tooltip title={item.url} arrow>
                                <UrlSpan >{item.url}</UrlSpan>
                              </Tooltip>
                            </CustomTableCell>
                            <CustomTableCell className="white-space">
                              <input
                              className="form-control" 
                                type="text"
                                placeholder="VALUE"
                                name="value"
                                onChange={(e) => handleChange(e, index)}
                                value={item.value}
                              />
                            </CustomTableCell>
                            <CustomTableCell className="white-space">
                                <ButtonDiv>
                              <SubmitButton
                                disabled={!item.company || !item.value}
                                onClick={() => handleAddValue(item, index)}
                              >
                               Save
                              </SubmitButton>
                              {!item.isNew && (
                                <SubmitButton onClick={() => handleUpdateValue(item, index)}>
                                  UPDATE
                                </SubmitButton>
                              )}
                              {/* {!item.isNew && (
                                  <SubmitButton onClick={() => handleUpdateValue(item, index)}>
                                    UPDATE
                                  </SubmitButton>
                                )}
                                <SubmitButton onClick={() => handleDownloadQRCode(index)}>
                                  Download QR Code
                                </SubmitButton> */}
                                <SubmitButton onClick={() => downloadQRCode(item.url, index)}>
                                  Download QR Code
                                </SubmitButton>
                              </ButtonDiv>
                            </CustomTableCell>
                            <CustomTableCell className="white-space">
                                <div ref={(el) => (qrRefs.current[index] = el)}>
                              <QRCode
                                size={128}
                                style={{ height: "auto", maxWidth: "100%", width: "100px" }}
                                value={item.url}
                                viewBox={`0 0 128 128`}
                              />
                              </div>
                            </CustomTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CustomTableContainer>
                  </>
                 </MDBox>
               </Card>
            </Grid>
          </Grid>
        </MDBox>
      </div>
    </DashboardLayout>
  );
}

export default QrCode;
