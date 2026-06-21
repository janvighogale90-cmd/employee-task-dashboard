import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Tasks() {
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    setTasks(savedTasks);
  }, [location]);

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, status: "Completed" }
        : task
    );

    setTasks(updatedTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "Completed")
      return matchSearch && task.status === "Completed";

    if (filter === "Pending")
      return matchSearch && task.status === "Pending";

    if (filter === "High")
      return matchSearch && task.priority === "High";

    return matchSearch;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#EEF1FF",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        All Tasks
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <Link to="/">
          <button style={navBtn}>Home</button>
        </Link>

        <Link to="/add">
          <button style={navBtn}>Add Task</button>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          placeholder="Search Task..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          style={{
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>High</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <h3>No Tasks Found</h3>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            style={{
              background: "white",
              width: "100%",
              maxWidth: "550px",
              padding: "30px",
              borderRadius: "25px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.1)",
              marginBottom: "20px",
            }}
          >
            <h2>{task.title}</h2>

            <p
              style={{
                color: "gray",
                marginTop: "10px",
              }}
            >
              {task.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              <span
                style={{
                  background:
                    task.priority === "High"
                      ? "#FFE5E5"
                      : "#E5F6FF",
                  color:
                    task.priority === "High"
                      ? "red"
                      : "blue",
                  padding: "8px 15px",
                  borderRadius: "20px",
                }}
              >
                {task.priority}
              </span>

              <span
                style={{
                  background:
                    task.status === "Completed"
                      ? "#D4F8D4"
                      : "#FFF4CC",
                  padding: "8px 15px",
                  borderRadius: "20px",
                }}
              >
                {task.status}
              </span>
            </div>

            <p style={{ marginTop: "20px" }}>
              Due Date : {task.dueDate}
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "25px",
              }}
            >
              <Link to={`/edit/${task.id}`}>
                <button style={btn1}>
                  Edit
                </button>
              </Link>

              <button
                style={btn2}
                onClick={() =>
                  deleteTask(task.id)
                }
              >
                Delete
              </button>

              <button
                style={btn3}
                onClick={() =>
                  completeTask(task.id)
                }
              >
                Complete
              </button>
                          </div>
          </div>
        ))
      )}
    </div>
  );
}

const navBtn = {
  background: "#7C63F5",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

const btn1 = {
  background: "#7C63F5",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

const btn2 = {
  background: "#FF5D73",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

const btn3 = {
  background: "#32C48D",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

export default Tasks;