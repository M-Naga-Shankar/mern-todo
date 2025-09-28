import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  Grid,
  TextField,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Avatar,
  Fab,
  Divider,
  Chip,
  Slide,
  Stack,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#0b1020", paper: "#0f1724" },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

const sampleTodos = [
  { id: 1, text: "Plan weekly study schedule", done: false },
  { id: 2, text: "Finish React landing page UI", done: true },
  { id: 3, text: "Push project to GitHub", done: false },
];

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem("dark-mui-todos");
      return raw ? JSON.parse(raw) : sampleTodos;
    } catch (e) {
      return sampleTodos;
    }
  });
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("dark-mui-todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    const text = value.trim();
    if (!text) return;
    const next = { id: Date.now(), text, done: false };
    setTodos((s) => [next, ...s]);
    setValue("");
  }

  function toggleDone(id) {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTodo(id) {
    setTodos((s) => s.filter((t) => t.id !== id));
  }

  function startEdit(id) {
    const t = todos.find((x) => x.id === id);
    if (!t) return;
    setEditingId(id);
    setValue(t.text);
  }

  function saveEdit() {
    if (!editingId) return addTodo();
    setTodos((s) => s.map((t) => (t.id === editingId ? { ...t, text: value } : t)));
    setEditingId(null);
    setValue("");
  }

  const filtered = todos.filter((t) => t.text.toLowerCase().includes(query.toLowerCase()));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" elevation={6}>
        <Toolbar sx={{ gap: 2 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>TD</Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">TodoDark — Beautiful MUI Landing</Typography>
            <Typography variant="caption" color="text.secondary">
              Fast. Focused. Functional.
            </Typography>
          </Box>
          <Chip label={`${todos.length} items`} color="primary" />
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 6 }} maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          {/* Left: Hero / Intro */}
          <Grid item xs={12} md={5}>
            <Paper elevation={8} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Keep your day focused ✨
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                A minimal, dark-themed Todo landing page built with Material UI. Add tasks,
                search, mark done, and keep everything synced to localStorage.
              </Typography>

              <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                <Button variant="contained" onClick={() => {
                  setValue("Quick add: Review PRs");
                }}>
                  Quick Add Sample
                </Button>
                <Button variant="outlined" onClick={() => {
                  setTodos(sampleTodos);
                }}>
                  Reset Sample
                </Button>
              </Stack>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Search
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Search your todos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Highlights
                </Typography>
                <Stack direction="column" spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    • Dark-first accessible palette
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • LocalStorage persistence
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Keyboard-friendly controls
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Right: Todo panel */}
          <Grid item xs={12} md={7}>
            <Paper elevation={8} sx={{ p: 3, borderRadius: 3 }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Add a new todo..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (editingId) saveEdit(); else addTodo();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    if (editingId) saveEdit(); else addTodo();
                  }}
                  startIcon={<AddIcon />}
                >
                  {editingId ? "Save" : "Add"}
                </Button>
              </Box>

              <Box sx={{ maxHeight: "55vh", overflow: "auto" }}>
                <List disablePadding>
                  {filtered.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No todos found" secondary="Try adding something new." />
                    </ListItem>
                  )}

                  {filtered.map((t) => (
                    <Slide key={t.id} direction="up" in={true} mountOnEnter unmountOnExit>
                      <ListItem
                        sx={{
                          bgcolor: t.done ? "rgba(144,202,249,0.06)" : "transparent",
                          borderRadius: 2,
                          mb: 1,
                        }}
                        secondaryAction={
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => startEdit(t.id)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" onClick={() => removeTodo(t.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        }
                      >
                        <Checkbox checked={t.done} onChange={() => toggleDone(t.id)} />
                        <ListItemText
                          primary={t.text}
                          secondary={t.done ? "Completed" : null}
                          sx={{ textDecoration: t.done ? "line-through" : "none" }}
                        />
                      </ListItem>
                    </Slide>
                  ))}
                </List>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" color="text.secondary">
                  Pro tip: press Enter to add. Click a todo to toggle.
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="text" onClick={() => setTodos([])}>
                    Clear all
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setTodos((s) => s.filter((t) => !t.done))}
                  >
                    Remove completed
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Fab
        color="secondary"
        sx={{ position: "fixed", right: 24, bottom: 24 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <AddIcon />
      </Fab>
    </ThemeProvider>
  );
}
