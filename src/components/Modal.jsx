import { useEffect } from "react";

const Modal = ({ isOpen, toggleIsOpen, children }) => {
    const closeModal = () => toggleIsOpen(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
        // eslint-disable-next-line
    }, []);

    return isOpen ? (
        <div className="modal flex justify-center items-center md:fixed md:inset-0">
            <div
                onClick={closeModal}
                className="fixed inset-0 bg-zinc-300 opacity-75 z-50"
            ></div>
            <div className="fixed bottom-0 left-0 right-0 h-max bg-white rounded-t-xl rounded-r-xl shadow-2xl z-[9999] px-8 py-8 md:static md:rounded-lg md:px-12">
                {children}
            </div>
        </div>
    ) : (
        ""
    );
};

export default Modal;
