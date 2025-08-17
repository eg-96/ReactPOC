import React, { useState } from 'react';
import { useFilteredTodos } from '../hooks/useFilteredTodos';
import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    CircularProgress,
    Alert,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

const FilteredTodosExample: React.FC = () => {
    const [user, setUser] = useState('');
    const [status, setStatus] = useState<'all' | 'completed' | 'pending'>('all');
    const { filteredTodos, loading, error } = useFilteredTodos(user, status);

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Filtered Todos Example (Complex Custom Hook)
            </Typography>
            <Box display="flex" alignItems="center" mb={2} gap={2}>
                <TextField
                    label="User"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    placeholder="user1, user2..."
                    variant="outlined"
                    size="small"
                />
                <FormControl variant="outlined" size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                        label="Status"
                        value={status}
                        onChange={e => setStatus(e.target.value as any)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {loading && (
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <CircularProgress size={20} />
                    <Typography>Loading todos...</Typography>
                </Box>
            )}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Error: {error}
                </Alert>
            )}
            <List>
                {filteredTodos.map(todo => (
                    <ListItem key={todo.id} divider>
                        <ListItemText
                            primary={todo.title}
                            secondary={`${todo.completed ? 'Completed' : 'Pending'} (User: ${todo.user})`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default FilteredTodosExample;
