import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import { List, ListItem, Tab, Tabs} from '@mui/material';
import Categories from '../Objects/Categories'
import Items from '../Objects/Items'

import React from 'react';
import { LoginP, CheckSessionAccess, LogOut, OnlyUser, OnlyOrganizer, OnlyAdmin, OrganizerUser, OrganizerAdmin, LoggedIn } from "./Session";

export default function HomePage() {

  const navButtonStyles = {
    color: "brown",
    textDecoration: 'none',
    '&:hover': {
        color: "solid #43464B 1px",
        
    },
    '&.active': {
        color: 'text.secondary'
    },
    width: 80,
    height: 20, 
    border: '1px solid',
    borderColor: "solid #43464B 1px",
    fontSize: "10px",
    alignItems: 'center',
    }

  const [dataList, setDataList] = useState([]);
  const mapJsonToItem = (jsonItem) => {

    const category = new Categories(
      jsonItem.category.id,
      jsonItem.category.name,
      jsonItem.category.description
    );
  
    return new Items(
      jsonItem.id,
      jsonItem.name,
      jsonItem.price,
      jsonItem.description,
      category
    );
  };
  async function fetchData() {
    CheckSessionAccess();
    const url = "/api/categories/0/items/All";
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not in JSON format");
      }
  
      const data = await response.json();
      const items = data.map(mapJsonToItem);
      setDataList(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  },
  []);
  return (
      <Box>
        {dataList.map((EventItem) => (
          <React.Fragment key={EventItem.id}>
            <Button component={Link} to={"/categories/" + EventItem.category.id + "/items/" + EventItem.id}>
              <Grid item xs={4} sx={{ border: 1, borderRadius: '5px' }}>
                <List>
                  <ListItem>{EventItem.name}</ListItem>
                  <ListItem>
                    <Typography>Aprašymas:</Typography>
                    {EventItem.description}
                  </ListItem>
                  <ListItem>Kaina: {EventItem.price}</ListItem>
                  <ListItem>Kategorija: {EventItem.category.name}</ListItem>
                  {OrganizerAdmin() && (
                    <>
                      <ListItem sx={{ color: 'gray' }}>Id: {EventItem.id}</ListItem>
                      <ListItem sx={{ color: 'gray' }}>
                        CategoryId: {EventItem.category.id}
                      </ListItem>
                    </>
                  )}
                </List>
              </Grid>
            </Button>
          </React.Fragment>
        ))}
      </Box>
  );}
