import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavRoot from "examples/Sidenav/SidenavRoot";
// import LogoImage from "assets/images/indilink_logo.png";
import { useMaterialUIController } from "context";
import { Typography } from "@mui/material";

function Sidenav({ routes, ...rest }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState([]);

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const section = pathSegments[0];
    if (section === "customer" || section === "partner" || section === "general-settings") {
      setExpandedSections([section]);
    } else {
      setExpandedSections([]);
    }
  }, [location.pathname]);

  const toggleSection = (section) => {
    setExpandedSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((s) => s !== section)
        : [...prevSections, section]
    );
  };

  const renderRoutes = routes.map(({ type, name, icon, route, key, collapse }) => {
    if (type === "collapse") {
      const isExpanded = expandedSections.includes(key);
      const hasNestedComponents = collapse && collapse.length > 0;

      return (
        <div key={key}>
          <NavLink to={route} onClick={() => toggleSection(key)}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={route === location.pathname}
              expand={hasNestedComponents}
              isExpanded={isExpanded}
            />
          </NavLink>
          {collapse && isExpanded && (
            <div>
              {collapse.map(({ name, route, key, icon }) => (
                <NavLink
                  key={key}
                  to={route}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSection(key);
                  }}
                >
                  <SidenavCollapse
                    name={name}
                    icon={icon}
                    active={route === location.pathname}
                    expand={false} // Nested components shouldn't have an expand icon
                    isExpanded={expandedSections.includes(key)}
                  />
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  });

  if (location.pathname === '/login') {
    return null;
  }

  return (

    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
      className="main-drawer deepak"
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center" className="main-drawer-box">
        {/* <img src={LogoImage} /> */}
        {/* <img
          src={LogoImage}
          alt="Logo"
          style={{
            width: miniSidenav ? "50px" : "150px",
            transition: "width 0.3s ease-in-out",
          }}
        /> */}
        <Typography style={{color:"white"}}>QR Code Indicold</Typography>
      </MDBox>
      <Divider />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

Sidenav.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
