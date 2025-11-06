import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
const SignIn = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleChanges = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email: values.email,
          password: values.password,
        }
      );

      if (response.data.success) {
        await signin(response.data.user, response.data.token);
        const role = response.data.user.role.toUpperCase();
        if (role === "ADMIN") {
          navigate("/admin-dashboard");
        } else if (role === "USER") {
          navigate("/user-dashboard");
        }
      } else {
        alert(response.data.error);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else setError("Invalid email or password");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-green-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="text-3xl text-white">Inventory Management System</h2>
      <div className="border shadow-lg p-6 w-88 bg-white">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && (
          <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border"
              name="email"
              required
              onChange={handleChanges}
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border"
              name="password"
              required
              onChange={handleChanges}
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2"
            >
              {loading ? "Loading..." : "Signin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
