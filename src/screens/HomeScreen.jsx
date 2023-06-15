import Header from "../components/Header";
import Menu from "../components/Menu";

const HomeScreen = () => {
    return (
        <section className="layout">
            <Header />
            <Menu />
            <main className="main-content">
                <h3 className="text-4xl font-serif font-extrabold">title</h3>
                <p className="text-lg">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Neque quasi reprehenderit nesciunt officia quo laborum, sint
                    laudantium id cupiditate inventore voluptas repellat ab
                    possimus voluptatum iusto reiciendis voluptatem explicabo
                    dolorum autem fugit? Incidunt delectus veniam excepturi
                    rerum saepe, eligendi natus consequatur enim iste dolorum
                    exercitationem suscipit reiciendis porro error ipsum?
                </p>
            </main>
            <div className="aside-content">
                <p className="text-red-500">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptas nihil laborum voluptatibus eius? Provident corrupti
                    ullam asperiores sequi in quasi reiciendis accusamus ex,
                    nostrum quae!
                </p>
            </div>
        </section>
    );
};

export default HomeScreen;
