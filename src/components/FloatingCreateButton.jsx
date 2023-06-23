import React from "react";
import { useNavigate } from "react-router-dom";

import edit from "../assets/edit.svg";

const FloatingCreateButton = () => {
    const navigate = useNavigate();
    return (
        <div
            className="bg-indigo-600 text-white fixed right-3 bottom-20 px-3.5 py-3.5 rounded-full md:hidden z-0 shadow-xl"
            onClick={() => navigate("/create")}
        >
            <img src={edit} alt="new post" />
        </div>
    );
};

export default FloatingCreateButton;
