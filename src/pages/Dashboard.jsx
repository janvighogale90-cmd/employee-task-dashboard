import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    setTasks(savedTasks);
  }, [location]);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

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
        display: "flex",
        minHeight: "100vh",
        background: "#EEF1FF",
      }}
    >
      <div
        style={{
          width: "220px",
          background: "#7C63F5",
          color: "white",
          padding: "30px",
          borderRadius: "0 30px 30px 0",
        }}
      >
        <h2 style={{ marginBottom: "50px" }}>Employee</h2>

        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            display: "block",
            marginBottom: "25px",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/tasks"
          style={{
            color: "white",
            textDecoration: "none",
            display: "block",
            marginBottom: "25px",
          }}
        >
          Tasks
        </Link>

        <Link
          to="/add"
          style={{
            color: "white",
            textDecoration: "none",
            display: "block",
          }}
        >
          Add Task
        </Link>
      </div>

      <div style={{ flex: 1, padding: "40px" }}>
        <h1>Employee Task Dashboard</h1>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "25px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "12px",
              width: "250px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="High">High Priority</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "#7C63F5",
              color: "white",
              padding: "30px",
              width: "220px",
              borderRadius: "20px",
            }}
          >
            <h3>Total Tasks</h3>
            <h1>{totalTasks}</h1>
          </div>

          <div
            style={{
              background: "#FF74A4",
              color: "white",
              padding: "30px",
              width: "220px",
              borderRadius: "20px",
            }}
          >
            <h3>Completed</h3>
            <h1>{completedTasks}</h1>
          </div>

          <div
            style={{
              background: "white",
              padding: "30px",
              width: "220px",
              borderRadius: "20px",
            }}
          >
            <h3>Pending</h3>
            <h1>{pendingTasks}</h1>
          </div>
        </div>

        <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
          Recent Tasks
        </h2>
                {filteredTasks.length === 0 ? (
          <p>No Tasks Available</p>
        ) : (
          filteredTasks
            .slice(-5)
            .reverse()
            .map((task) => (
              <div
                key={task.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "15px",
                  marginBottom: "15px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                }}
              >
                <h3>{task.title}</h3>

                <p
                  style={{
                    color: "gray",
                    marginTop: "8px",
                  }}
                >
                  {task.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                    flexWrap: "wrap",
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
                      padding: "6px 12px",
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
                      padding: "6px 12px",
                      borderRadius: "20px",
                    }}
                  >
                    {task.status}
                  </span>
                </div>

                <p style={{ marginTop: "12px" }}>
                  Due: {task.dueDate}
                </p>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;