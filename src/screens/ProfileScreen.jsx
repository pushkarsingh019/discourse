import Header from "../components/Header";
import Menu from "../components/Menu";

const ProfileScreen = () => {
    return (
        <section className="layout">
            <Header />
            <Menu />
            <main className="main-content">
                <h3>the profile page</h3>
            </main>
        </section>
    );
};

export default ProfileScreen;
