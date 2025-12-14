// import { Link, useNavigate } from "react-router-dom";
// import { logout, isAuthenticated } from "../services/auth";

// export default function Header() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <header className="bg-pink-600 text-white p-4 flex justify-between">
//       <Link to="/" className="font-bold">
//         Maternal Health
//       </Link>

//       {isAuthenticated() && (
//         <div className="space-x-4">
//           <Link to="/vitals">Add Vitals</Link>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}
//     </header>
//   );
// }
