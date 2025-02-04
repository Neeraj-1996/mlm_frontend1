import React from 'react';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem,  SubMenu ,useProSidebar } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Navigation = () => {

  const { collapseSidebar} = useProSidebar();

  const sidebarStyle = {
    background: 'linear-gradient(to bottom, #007bff, #00ff99)',
    height: "100vh" 
  };
  
  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
    <Sidebar      
        style={sidebarStyle}
        rtl={false}
        
        transitionDuration={800}>
      <Menu>
        <MenuItem  
         icon={<MenuOutlinedIcon />}
         onClick={() => {
           collapseSidebar();
         }}
         style={{ textAlign: "center"  }}
        
        component={<Link to="/dashboard" />}>Dashboard</MenuItem>
        <SubMenu icon={<HomeOutlinedIcon />} label="Home">
        <MenuItem icon={<PeopleOutlinedIcon />}  component={<Link to="/" />}>item 1</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>item 2</MenuItem>
        </SubMenu>
        {/* <MenuItem icon={<CalendarTodayOutlinedIcon/>} component={<Link to="/settings" />}>Settings</MenuItem> */}
        <MenuItem icon={<CalendarTodayOutlinedIcon/>} component={<Link to="/UserRecords" />}>User</MenuItem>
        <MenuItem icon={<CalendarTodayOutlinedIcon/>} component={<Link to="/ProductTable" />}>Product</MenuItem>
        <MenuItem icon={<CalendarTodayOutlinedIcon/>} component={<Link to="/CountryTable" />}>Country</MenuItem>
        <MenuItem icon={<CalendarTodayOutlinedIcon/>} component={<Link to="/EventTable" />}>Event</MenuItem>
        <MenuItem icon={<CalendarTodayOutlinedIcon/>} component={<Link to="/PlanTable" />}>Plan</MenuItem>
        <MenuItem icon={<CalendarTodayOutlinedIcon/>} component={<Link to="/LevelTable" />}>Level</MenuItem>
        <MenuItem icon={<CalendarTodayOutlinedIcon/>} component={<Link to="/Support" />}>Support</MenuItem>

        {/* <SubMenu icon={<HomeOutlinedIcon />} label="React liberary">
        <MenuItem icon={<PeopleOutlinedIcon />}  component={<Link to="/FormRegister" />}>React Form</MenuItem>
        <MenuItem icon={<PeopleOutlinedIcon />}  component={<Link to="/ReactDnd" />}>React Dnd</MenuItem>
      
        <MenuItem icon={<PeopleOutlinedIcon />}  component={<Link to="/Reactproper" />}>React Proper</MenuItem>
        </SubMenu> */}
      </Menu>
      </Sidebar>
     
      </div>
  );
};

export default Navigation;