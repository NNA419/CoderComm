import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddRoudedIcon from "@mui/icons-material/PersonAddRounded";

import Profile from '../features/user/Profile';
import FriendList from '../features/friend/FriendList';
import FriendRequests from '../features/friend/FriendRequests';
import AddFriend from '../features/friend/AddFriend';
import { Box, Card, Container, Tab, Tabs } from '@mui/material';

import { capitalCase } from 'change-case';
import ProfileCover from '../features/user/ProfileCover';
import { styled } from "@mui/material/styles";
import RequestList from '../features/friend/RequestList';
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
    zIndex: 9,
    bottom: 0,
    width: "100%",
    display: "flex",
    position: "absolute",
    backgroundColor: "#fff",
        [theme.breakpoints.up("sm")]: {
        justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
        justifyContent: "flex-end",
        paddingRight: theme.spacing(3),
    }
}));

function HomePage() {
    const { user } = useAuth();
    const [currentTab, setCurrentTab] = useState("profile");

    const handleChangeTab = (newValue) => {
        setCurrentTab(newValue);
    };

    const PROFILE_TABS = [
      {
        value: "profile",
        icon: <AccountBoxIcon sx={{ fontsize: 24 }} />,
        component: <Profile profile={user} />,
      },
      {
        value: "friends",
        icon: <PeopleAltIcon sx={{ fontsize: 24 }} />,
        component: <FriendList />,
      },
      {
        value: "request",
        icon: <ContactMailIcon sx={{ fontsize: 24 }} />,
        component: <FriendRequests />,
      },
      {
        value: "add_friend",
        icon: <PersonAddRoudedIcon sx={{ fontsize: 24 }} />,
        component: <AddFriend />,
      },
      {
        value: "request_list",
        icon: <PendingActionsIcon sx={{ fontsize: 24 }} />,
        component: <RequestList />,
      },
    ];

    return (
      <Container>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <ProfileCover profile={user} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
                
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    );
}

export default HomePage;