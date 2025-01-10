import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
function Home(){

    const navigate = useNavigate(); // utilisation de useNavigate
    return (
        <div>
                <h1>
                    welcom to your ORACLE DATABASE
                </h1>
        </div>
    );
}



export default Home;