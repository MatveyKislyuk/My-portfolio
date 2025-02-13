    import React from 'react';
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import { Header } from './components/Header';
    import { Footer } from './components/Footer';
    import { HomePage } from './pages/HomePage';
    import { AboutPage } from './pages/AboutPage';
    import { SkillsPage } from './pages/SkillsPage';
    import { ProjectsPage } from './pages/ProjectsPage';
    import { ContactPage } from './pages/ContactPage';
    import './styles/App.css';
    import { HelmetProvider } from 'react-helmet-async';
    import { useTheme } from './context/ThemeContext';
    import { AnimatePresence, motion } from "framer-motion";
    import { pageTransition } from './animations/Animations.ts';



    const App: React.FC = () => {
        const { theme } = useTheme();

        return (
            <div className={`app ${theme}`}>
                <HelmetProvider>
                    <BrowserRouter>
                        <Header/>
                        <AnimatePresence>
                            <Routes>
                                <Route path="/" element={
                                    <motion.div { ...pageTransition } key="home">
                                        <HomePage/>
                                    </motion.div>
                                }
                                />
                                <Route path="/about" element={
                                    <motion.div {...pageTransition} key="about">
                                        <AboutPage/>
                                    </motion.div>
                                }
                                />
                                <Route path="/skills" element={
                                    <motion.div {...pageTransition} key="skills">
                                        <SkillsPage/>
                                    </motion.div>
                                }
                                />
                                <Route path="/projects" element={
                                    <motion.div {...pageTransition} key="projects">
                                        <ProjectsPage/>
                                    </motion.div>
                                }
                                />
                                <Route path="/contact" element={
                                    <motion.div {...pageTransition} key="contact">
                                        <ContactPage/>
                                    </motion.div>
                                }
                                />
                            </Routes>
                        </AnimatePresence>
                        <Footer/>
                    </BrowserRouter>
                </HelmetProvider>
            </div>
        );
    };

    export default App;
