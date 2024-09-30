// pages/Home.js
import { useEffect, useState, useMemo } from "react";
import ProjectCategory from "../components/ProjectCategory";
import Error from "../components/Error";
import Hero from "../components/Hero";
import Project from "../components/Project";

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null); // Reset error before new request

            try {
                const response = await fetch(
                    "https://one00jsprojects-t2pk.onrender.com/api/project"
                );

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setProjects(data); // Safe access with optional chaining
                document.title = "Projects Loaded";
            } catch (err) {
                setError(err.message);
                document.title = "Error loading projects";
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const renderedProjects = useMemo(() => {
        return projects.map((project, index) => (
            <Project project={project} key={index} />
        ));
    }, [projects]);

    if (loading) {
        return (
            <section>
                <div className="loading-container container">
                    <p>Loading...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <Error
                errorMessage={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <main id="content" className="main-content" role="main">
            <Hero />
            <section className="category-section">
                <div className="container">
                    <h2 className="category-level">Beginner </h2>
                    <div className="projects">{renderedProjects}</div>
                </div>
            </section>
        </main>
    );
};

export default Home;