import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { AddToPhotos } from '@mui/icons-material';
import { useState } from 'react';
import { BASE_URL } from "../App";

const CreateUserModal = ({ setUsers }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    description: "",
    gender: "",
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSnackbar({
        open: true,
        message: 'Friend created successfully',
        severity: 'success'
      });
      setOpen(false);
      setUsers((prevUsers) => [...prevUsers, data]);
      setInputs({ name: "", role: "", description: "", gender: "" });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <AddToPhotos />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <form onSubmit={handleCreateUser}>
          <DialogTitle>My new BFF 😍</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="John Doe"
                  value={inputs.name}
                  onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Role"
                  placeholder="Software Engineer"
                  value={inputs.role}
                  onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={inputs.description}
                  onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  row
                  value={inputs.gender}
                  onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={isLoading}>Add</Button>
          </DialogActions>
        </form>
      </Dialog>

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

