import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const task = tasks.find((t) => t.id === Number(id));

    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDueDate(task.dueDate);
    }
  }, [id]);

  const updateTask = () => {
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      dueDate === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updatedTasks = tasks.map((task) =>
      task.id === Number(id)
        ? {
            ...task,
            title,
            description,
            priority,
            dueDate,
          }
        : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    alert("Task Updated Successfully");

    navigate("/tasks");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#EEF1FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Navigation */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          gap: "15px",
        }}
      >
        <Link to="/">
          <button style={navBtn}>Dashboard</button>
        </Link>

        <Link to="/tasks">
          <button style={navBtn}>Tasks</button>
        </Link>
      </div>

      <div
        style={{
          background: "white",
          width: "500px",
          padding: "35px",
          borderRadius: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#7C63F5",
          }}
        >
          Edit Task
        </h1>

        <input
          type="text"
          placeholder="Task Title"
          style={inputStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          rows="4"
          style={inputStyle}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          style={inputStyle}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          style={inputStyle}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button
          style={btnStyle}
          onClick={updateTask}
        >
          Update Task
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  fontSize: "16px",
  outline: "none",
};

const btnStyle = {
  width: "100%",
  padding: "14px",
  background: "#7C63F5",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  cursor: "pointer",
};

const navBtn = {
  background: "#7C63F5",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

export default EditTask;