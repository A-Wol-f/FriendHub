import { Grid, CircularProgress, Typography, Box } from '@mui/material';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';
import { BASE_URL } from "../App";

const UserGrid = ({ users, setUsers }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/friends`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, [setUsers]);

  return (
    <>
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : users.length === 0 ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h5">
            <Box component="span" fontWeight="bold" mr={1}>Poor you! 🥺</Box>
            No friends found.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} md={6} lg={4} key={user.id}>
              <UserCard user={user} setUsers={setUsers} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
