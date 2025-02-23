import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="flex justify-end items-center p-3 bg-black text-yellow-400">
            <Link to="/login" className="text-xl">Login</Link>
        </nav>
    )
}

export default Navbar
