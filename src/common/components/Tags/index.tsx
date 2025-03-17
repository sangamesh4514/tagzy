import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const API_URL = "https://web-production-ff56.up.railway.app/tags";

const categories = [
  { name: "Parlour & Spa", id: 3 },
  { name: "Task Master", id: 4 },
  { name: "Health & Wellness", id: 1 },
  { name: "Tutors & Coaches", id: 2 },
  { name: "Design & Construction", id: 5 },
  { name: "Vehicle & Transportation", id: 6 },
];

const CreateTags = () => {
  interface Tag {
    id: number;
    name: string;
    code: string;
    categoryId: number;
  }

  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newTag, setNewTag] = useState({ name: "", code: "", categoryId: 0 });
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: "error" | "warning" | "info" | "success";
  }>({ open: false, message: "", severity: "error" });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/all`);
      data.sort((a: Tag, b: Tag) => a.id - b.id);
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    
    try {
      if (
        !newTag.name.trim() ||
        !newTag.code.trim() ||
        newTag.categoryId === 0
      ) {
        setAlert({
          open: true,
          message: "Please fill out all fields.",
          severity: "error",
        });
        return;
      }
      setLoading(true);

      await axios.post(`${API_URL}/create`, newTag);
      fetchTags();
      setNewTag({ name: "", code: "", categoryId: 0 });
      setDialogOpen(false);
    } catch (error) {
      console.error("Error creating tag:", error);
      setAlert({
        open: true,
        message: `Error: ${
          (error as any).response?.data?.message || (error as any).message
        }`,
        severity: "error",
      });
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    
    try {
      if(!editingTag) return;
      if (
        !editingTag.name.trim() ||
        !editingTag?.code.trim() ||
        editingTag.categoryId === 0
      ) {
        setAlert({
          open: true,
          message: "Please fill out all fields.",
          severity: "error",
        });
        return;
      }
      setLoading(true);
      await axios.post(`${API_URL}/update`, editingTag);
      fetchTags();
      setEditingTag(null);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating tag:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchTags();
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-40 min-h-screen">
      
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">All Tag'z  {loading && <CircularProgress size={24} color="inherit" />}</h2>
      <Button
      className="!bg-colorA hover:bg-colorB !border-1 w-1/4  !text-sm !px-2 !py-2"
        onClick={() => {
          setEditingTag(null);
          setDialogOpen(true);
        }}
        startIcon={<Add className="text-white" />}
        variant="contained"
      >
        Create
      </Button>
    </div>

      <div className="grid grid-cols-3 gap-4">
        
        {tags.map((tag) => (
          <Card
            key={tag.id}
            className="p-4 flex flex-col justify-between transition-shadow hover:shadow-lg"
          >
            <CardContent className="flex flex-col">
              <p className="text-lg font-semibold">
                {tag.id}. {tag.name.toUpperCase()}
              </p>
              <p className="text-sm text-gray-500">Code: {tag.code}</p>
              <p className="text-sm text-gray-500">
                Category:{" "}
                {categories.find((c) => c.id === tag.categoryId)?.name ||
                  "Unknown"}
              </p>
            </CardContent>

            {/* Buttons at the bottom, side by side */}
            <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => handleDelete(tag.id)}
              >
                <Delete fontSize="small" /> Delete
              </Button>
              <Button
                fullWidth
                className="!bg-colorA  !border-1 w-1/4  !text-sm !px-2 !py-2"
                variant="contained"
                onClick={() => {
                  setEditingTag(tag);
                  setDialogOpen(true);
                }}
                startIcon={<Edit className="text-white" fontSize="small"/>}
              >
                Edit
              </Button>
              
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editingTag ? "Edit Tag" : "Create New Tag"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Tag Name"
            fullWidth
            value={editingTag ? editingTag.name : newTag.name}
            onChange={(e) =>
              editingTag
                ? setEditingTag({ ...editingTag, name: e.target.value })
                : setNewTag({ ...newTag, name: e.target.value })
            }
            margin="dense"
          />
          <TextField
            label="Tag Code"
            fullWidth
            value={editingTag ? editingTag.code : newTag.code}
            onChange={(e) =>
              editingTag
                ? setEditingTag({ ...editingTag, code: e.target.value })
                : setNewTag({ ...newTag, code: e.target.value })
            }
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel shrink>Category</InputLabel>
            <Select
              displayEmpty
              value={editingTag ? editingTag.categoryId : newTag.categoryId}
              onChange={(e) =>
                editingTag
                  ? setEditingTag({
                      ...editingTag,
                      categoryId: Number(e.target.value),
                    })
                  : setNewTag({ ...newTag, categoryId: Number(e.target.value) })
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined"
                color="error" onClick={() => setDialogOpen(false)}>Cancel</Button>
                
          <Button
            onClick={editingTag ? handleUpdate : handleCreate}
            className="!bg-colorA  !border-1 w-1/4 !text-sm !px-2 !py-2"
                variant="contained"
          >
            {editingTag ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateTags;
