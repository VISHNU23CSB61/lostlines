import "./App.css";
import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import StatsCard from "./components/StatsCard";

function App() {
    return (
        <div>
            <Header />

            <main>
                <section>
                    <ProfileCard />

                    <h2>Dashboard Stats</h2>

                    <div className="stats">
                        <StatsCard title="Total" count={0} />
                        <StatsCard title="Lost" count={0} />
                        <StatsCard title="Found" count={0} />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;