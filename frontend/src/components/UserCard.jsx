import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useState } from 'react';
import EditModal from './EditModal';
import { BASE_URL } from "../App";

const UserCard = ({ user, setUsers }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/friends/${user.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      setSnackbar({
        open: true,
        message: 'Friend deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error'
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar src={user.imgUrl} />}
          action={
            <Box>
              <EditModal user={user} setUsers={setUsers} />
              <IconButton onClick={handleDeleteUser} size="small" color="error">
                <Delete />
              </IconButton>
            </Box>
          }
          title={user.name}
          subheader={user.role}
        />
        <CardContent>
          <Typography variant="body2">{user.description}</Typography>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

