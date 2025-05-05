// App.jsx

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//  Initial task data
const initialTasks = [
  { id: '1', text: 'Send a compliment to someone 👍', completed: false },
  { id: '2', text: 'Give a shout-out to felix, callista and chineye 🎉', completed: false },
  { id: '3', text: 'Cook indomie 😋', completed: false },
];

export default function App() {
  // State: tasks array & text input
  const [tasks, setTasks] = useState(initialTasks);
  const [input, setInput] = useState('');

  // Toggle complete/incomplete and reorder list
  const toggleCompleteAndReorder = (id) => {
    setTasks((prev) => {
      // a) Toggle the task's completed value
      const updatedTasks = prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

      // b) Reorder: incomplete tasks first, completed last
      updatedTasks.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });

      return updatedTasks;
    });
  };

  // Add a new task to the top
  const addTask = () => {
    if (input.trim().length === 0) return;
    const newTask = {
      id: Date.now().toString(),
      text: input.trim(),
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  // Render each row in the list
  const renderItem = ({ item, drag }) => (
    <TouchableOpacity
      style={styles.taskButton}
      onLongPress={drag}
      onPress={() => toggleCompleteAndReorder(item.id)}
    >
      <View style={styles.checkbox}>
        {item.completed && <View style={styles.checked} />}
      </View>
      <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Today's tasks</Text>

      {/*Draggable task list */}
      <DraggableFlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onDragEnd={({ data }) => setTasks(data)}
      />

      {/* Input + Add button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addText}>＋</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

// 8. Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  taskText: {
    fontSize: 16,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  addText: {
    fontSize: 24,
    color: '#333',
  },
});
