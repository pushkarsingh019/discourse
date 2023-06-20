import React from "react";
import { Link } from "react-router-dom";

const ErrorScreen = () => {
    return (
        <section className="h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-3xl font-serif font-semibold">OOPS!</h1>
                <p className="text-xl text-wrap w-96">
                    you were not supposed to see this, these are unchartered
                    waters..
                </p>
                <br />
                <Link
                    to={"/"}
                    className="text-lg text-white px-3 py-2 bg-indigo-600 shadow-sm rounded-md"
                >
                    re-route
                </Link>
            </div>
        </section>
    );
};

export default ErrorScreen;
