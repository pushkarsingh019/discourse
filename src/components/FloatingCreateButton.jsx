import React from "react";
import { useNavigate } from "react-router-dom";

import edit from "../assets/edit.svg";

const FloatingCreateButton = () => {
    const navigate = useNavigate();
    return (
        <div
            className="bg-indigo-600 z-50 text-white fixed right-3 bottom-20 px-3.5 py-3.5 rounded-full md:hidden shadow-xl"
            onClick={() => navigate("/create")}
        >
            <img src={edit} alt="new post" />
        </div>
    );
};

export default FloatingCreateButton;
