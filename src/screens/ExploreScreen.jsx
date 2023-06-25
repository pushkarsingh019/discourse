import { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Modal from "../components/Modal";

const ExploreScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const handleToggleState = (toggleState) => setShowModal(toggleState);
    return (
        <section className="layout">
            <Header />
            <Menu />
            <main className="main-content">
                <h3>the explore page</h3>
                <button onClick={() => setShowModal(true)}>open modal</button>
                <Modal isOpen={showModal} toggleIsOpen={handleToggleState}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nostrum nesciunt ipsam beatae facere, eaque dolor ipsum
                        eligendi illo voluptas ducimus. Necessitatibus odit nam
                        minus odio temporibus numquam adipisci ut, dignissimos,
                        error dolores labore magni quae debitis saepe asperiores
                        est. Enim vel, sequi consectetur beatae consequatur
                        voluptatibus temporibus ex provident et.
                    </p>
                    <button onClick={() => setShowModal(false)}>cancel</button>
                </Modal>
            </main>
        </section>
    );
};

export default ExploreScreen;
