
import React, { useState,useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
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
import {addFirm,getAllFirm} from "../../service/authService"
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
const CustomModal = styled(Modal)`
z-index:99999;
`

function CreateFirm() {
  const [show, setShow] = useState(false);
  const [firm, setFirm] = useState([]);
  const [formData, setFormData] = useState({
    firm_name: "",
    email: "",
    phone: "",
    pan: "",
    created_by: "Admin",
    status: "" // Status is now a dropdown
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firm_name) newErrors.firm_name = "Firm name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.pan) newErrors.pan = "PAN number is required";
    if (!formData.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addFirm(formData)
        .then(() => {
          getAllFirm()
            .then((data) => setFirm(data?.data))
            .catch((error) => console.error('Error fetching data:', error));
        })
        .catch((error) => {
          console.error('Error updating data', error);
        });
      handleClose();
    }
  };

  useEffect(() => {
    async function fetchFirmDetails() {
      try {
        const data = await getAllFirm();
        setFirm(data?.data);
        if (data.code === 400) {
          navigate('/login');
        }
      } catch (error) {
        if (error.message === 'Not_found') {
          navigate('/pagenotfound');
        }
        console.error("Error fetching partner details:", error);
      }
    }
    fetchFirmDetails();
  }, [navigate]);
  const handleClick = (id) => {
    navigate(`/viewStore/${id}`)
  }
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
                    Firm Details
                  </MDTypography>
                  <AddButton onClick={handleShow}>ADD</AddButton>
                </MainDiv>
                <MDBox pt={3} ps={4}>
                  <CustomTableContainer component={Paper} className="partner_detials_table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <CustomTableHead>
                        <TableRow>
                          <CustomTableCellHeading className="white-space">Name</CustomTableCellHeading>
                          <CustomTableCellHeading className="white-space">Email</CustomTableCellHeading>
                          <CustomTableCellHeading className="white-space">Phone Number</CustomTableCellHeading>
                          <CustomTableCellHeading className="white-space">Pan Number</CustomTableCellHeading>
                          <CustomTableCellHeading className="white-space">Created at</CustomTableCellHeading>
                          <CustomTableCellHeading className="white-space">Created by</CustomTableCellHeading>
                          <CustomTableCellHeading className="white-space">Action</CustomTableCellHeading>
                        </TableRow>
                      </CustomTableHead>
                      <TableBody>
                        {firm?.map((row, index) => (
                          <TableRow key={index} style={{ cursor: 'pointer' }}>
                            <CustomTableCell className="white-space">{row?.firm_name}</CustomTableCell>
                            <CustomTableCell className="white-space">{row?.email}</CustomTableCell>
                            <CustomTableCell className="white-space">{row?.phone}</CustomTableCell>
                            <CustomTableCell className="white-space">{row?.pan}</CustomTableCell>
                            <CustomTableCell className="white-space">{row?.created_at}</CustomTableCell>
                            <CustomTableCell className="white-space">{row?.created_by}</CustomTableCell>
                            <CustomTableCell className="white-space">
                              <div className="d-flex justify-content-center ">
                                <VisibilityIcon color="secondary" style={{ cursor: 'pointer' }} onClick={()=>handleClick(row?.firm_name)}/>
                              </div>
                            </CustomTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CustomTableContainer>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </div>

      <CustomModal show={show} onHide={handleClose} className="deepak">
        <ModalDiv>
          <p className="m-0">Add New Firm</p>
        </ModalDiv>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter firm name"
                name="firm_name"
                value={formData.firm_name}
                onChange={handleInputChange}
                className={`form-control ${errors.firm_name ? 'is-invalid' : ''}`}
              />
              {errors.firm_name && <div className="invalid-feedback">{errors.firm_name}</div>}
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
            <div className="mb-3">
              <label>PAN</label>
              <input
                type="text"
                placeholder="Enter PAN number"
                name="pan"
                value={formData.pan}
                onChange={handleInputChange}
                className={`form-control ${errors.pan ? 'is-invalid' : ''}`}
              />
              {errors.pan && <div className="invalid-feedback">{errors.pan}</div>}
            </div>
            <div className="mb-3">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={`form-control ${errors.status ? 'is-invalid' : ''}`}
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && <div className="invalid-feedback">{errors.status}</div>}
            </div>
            <SubmitButton onClick={handleSubmit} className="mt-3">
              Submit
            </SubmitButton>
          </div>
        </Modal.Body>
      </CustomModal>
    </DashboardLayout>
  );
}

export default CreateFirm;
