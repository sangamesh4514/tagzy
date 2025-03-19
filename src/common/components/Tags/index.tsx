import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
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

const languages = [
  { label: "English", code: "en" },
  { label: "Kannada", code: "kn" },
  { label: "Hindi", code: "hi" },
];

const CreateTags = () => {
  interface Tag {
    id: number;
    name: { lang: string; value: string }[];
    code: string;
    categoryId: number;
  }

  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newTag, setNewTag] = useState({
    name: [{ lang: "en", value: "" }],
    code: "",
    categoryId: 0,
  });
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: "error" | "warning" | "info" | "success";
  }>({ open: false, message: "", severity: "error" });

  const fetchTags = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/all`);
      data.sort((a: Tag, b: Tag) => a.id - b.id);
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
    setLoading(false);
  }, []); // Empty dependency array for useCallback

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleCreate = async () => {
    try {
      if (
        !languages.some((lang) =>
          newTag.name.some(
            (name) => name.lang === lang.code && name.value.trim()
          )
        )
      ) {
        setAlert({
          open: true,
          message: "At least one name must be filled in any language.",
          severity: "error",
        });
        return;
      }

      if (
        !newTag.name.some((name) => name.value.trim()) ||
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
      setNewTag({ name: [{ lang: "en", value: "" }], code: "", categoryId: 0 });
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
      if (!editingTag) return;

      if (
        !languages.some((lang) =>
          editingTag.name.some(
            (name) => name.lang === lang.code && name.value.trim()
          )
        )
      ) {
        setAlert({
          open: true,
          message: "At least one name must be filled in any language.",
          severity: "error",
        });
        return;
      }

      if (
        !editingTag.name.some((name) => name.value.trim()) ||
        !editingTag.code.trim() ||
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

  const handleAddLanguage = () => {
    if (editingTag) {
      setEditingTag({
        ...editingTag,
        name: [...editingTag.name, { lang: "", value: "" }],
      });
    } else {
      setNewTag({
        ...newTag,
        name: [...newTag.name, { lang: "", value: "" }],
      });
    }
  };

  const handleRemoveLanguage = (index: number) => {
    if (editingTag) {
      setEditingTag({
        ...editingTag,
        name: editingTag.name.filter((_, i) => i !== index),
      });
    } else {
      setNewTag({
        ...newTag,
        name: newTag.name.filter((_, i) => i !== index),
      });
    }
  };

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="p-6 bg-gray-40 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Tag'z {loading && <CircularProgress size={24} color="inherit" />}
        </h2>
        <Button
          className="!bg-colorA hover:bg-colorB !border-1 w-1/4  !text-sm !px-2 !py-2"
          onClick={() => {
            setNewTag({
              name: [{ lang: "en", value: "" }],
              code: "",
              categoryId: 0,
            });
            setEditingTag(null);
            setDialogOpen(true);
          }}
          startIcon={<Add className="text-white" />}
          variant="contained"
        >
          Create
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto">
        <Chip
          label="All"
          className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium transition
      ${
        selectedCategory === null
          ? "!bg-colorA !text-white !font-bold"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
          onClick={() => handleCategoryFilter(null)}
        />

        {/* Category Chips */}
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium transition
        ${
          selectedCategory === category.id
            ? "!bg-colorA !text-white !font-bold"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
            onClick={() => handleCategoryFilter(category.id)}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {tags
          .filter(
            (tag) => !selectedCategory || tag.categoryId === selectedCategory
          )
          .map((tag,index) => (
            <Card
              key={tag.id}
              className="p-4 flex flex-col justify-between transition-shadow hover:shadow-lg"
            >
              <CardContent className={`flex flex-col p-4 rounded-lg `}>
                <p className="text-lg font-semibold">
                  {index+1}.{""}
                  {tag.code}
                </p>
                <p className="text-sm text-gray-500">
                  ID:{" "}
                  {tag.id}
                </p>
                <p className="text-sm text-gray-500">
                  Category:{" "}
                  {categories.find((c) => c.id === tag.categoryId)?.name ||
                    "Unknown"}
                </p>

                <ul className="list-disc list-inside text-sm text-gray-500">
                  {tag.name.map((n) => (
                    <li key={n.lang} className="ml-4">
                      {languages.find((lang) => lang.code === n.lang)?.label}:{" "}
                      <strong>{n.value}</strong>
                    </li>
                  ))}
                </ul>
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
                  startIcon={<Edit className="text-white" fontSize="small" />}
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                      : setNewTag({
                          ...newTag,
                          categoryId: Number(e.target.value),
                        })
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
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
            </Grid>

            {editingTag
              ? editingTag.name.map((entry, index) => (
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={2}
                    key={index}
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>Language</InputLabel>
                        <Select
                          value={entry.lang}
                          onChange={(e) => {
                            const updatedNames = [...editingTag.name];
                            updatedNames[index].lang = e.target.value;
                            setEditingTag({
                              ...editingTag,
                              name: updatedNames,
                            });
                          }}
                        >
                          {languages.map((lang) => (
                            <MenuItem key={lang.code} value={lang.code}>
                              {lang.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Tag Name"
                        fullWidth
                        value={entry.value}
                        onChange={(e) => {
                          const updatedNames = [...editingTag.name];
                          updatedNames[index].value = e.target.value;
                          setEditingTag({ ...editingTag, name: updatedNames });
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        onClick={() => handleRemoveLanguage(index)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))
              : newTag.name.map((entry, index) => (
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={2}
                    key={index}
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel>Language</InputLabel>
                        <Select
                          value={entry.lang}
                          onChange={(e) => {
                            const updatedNames = [...newTag.name];
                            updatedNames[index].lang = e.target.value;
                            setNewTag({ ...newTag, name: updatedNames });
                          }}
                        >
                          {languages.map((lang) => (
                            <MenuItem key={lang.code} value={lang.code}>
                              {lang.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Tag Name"
                        fullWidth
                        value={entry.value}
                        onChange={(e) => {
                          const updatedNames = [...newTag.name];
                          updatedNames[index].value = e.target.value;
                          setNewTag({ ...newTag, name: updatedNames });
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        onClick={() => handleRemoveLanguage(index)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
          </Grid>
        </DialogContent>
        <div className="flex justify-between w-full px-6 py-3 gap-2">
          <Button
            startIcon={<Add />}
            onClick={handleAddLanguage}
            className="!bg-colorA !border-1 !text-sm !px-2 !py-2"
            variant="contained"
          >
            Add Language
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              color="error"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={editingTag ? handleUpdate : handleCreate}
              className="!bg-colorA !border-1 w-1/2 !text-sm !px-2 !py-2"
              variant="contained"
            >
              {editingTag ? "Update" : "Create"}
            </Button>
          </div>
        </div>
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
