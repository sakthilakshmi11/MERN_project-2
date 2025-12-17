import { Link } from "react-router-dom";
export default function Home() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Home Page</h1>
            <p>Welcome to our simple React Store.</p>
            
            <Link to="/products">
            <img 
            src="img1_fassion.jpg"
            alt="store banner"
            style={{width:"100%", cursor:"pointer "}}
            />
            </Link>
            
        </div>
    )
}