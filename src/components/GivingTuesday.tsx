import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const GivingTuesday: React.FC = () => {
    return (
        <>
            <Navbar />
            <section
                id="giving-tuesday"
                className="min-h-screen w-screen flex flex-col justify-center items-center p-0 relative"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(255, 60, 60, 0.25) 0%, rgba(120, 0, 0, 0.15) 30%, rgba(30, 0, 0, 0.1) 55%, rgba(0, 0, 0, 1) 100%)",
                }}
            >
                <div className="z-10 text-center px-6">
                    <h2
                        className="text-4xl font-bold mb-6 text-white"
                        style={{
                            textShadow:
                                "0 0 20px rgba(255, 200, 200, 0.2), 0 0 40px rgba(255, 100, 100, 0.1)",
                        }}
                    >
                        Giving Tuesday
                    </h2>
                    <p
                        className="max-w-3xl mx-auto text-gray-200"
                        style={{
                            textShadow:
                                "0 0 10px rgba(255, 200, 200, 0.15)",
                        }}
                    >
                        <b>Make a Difference Today.</b>
                        <br /><br />
                        Giving Tuesday is just around the corner here at Andrews University! The AUAG has a few very important projects we are working to raise money for, and we need your help.
                        <br /><br />

                        <a
                            href="https://www.andrews.edu/services/development/givingday/givingdaydeps/changemaker.html"
                            className="text-red-300 underline hover:text-red-400"
                            target="_blank"
                        >
                            Changemaker Non-Endowed Scholarship
                        </a>
                        <br />
                        $5,000/$100,000 raised so far — for students committed to improving Andrews and its community.
                        <br /><br />

                        <a
                            href="https://www.andrews.edu/services/development/givingday/givingdaydeps/engineering.html"
                            className="text-red-300 underline hover:text-red-400"
                            target="_blank"
                        >
                            Advancing Lab Infrastructure to Support Engineering Projects Beyond the Classroom (BAJA SAE)
                        </a>
                        <br />
                        Goal: $20,000
                        <br /><br />

                        <a
                            href="https://vault.andrews.edu/vault/app/pages/advancement/login/development?desg=INNOP&only=y"
                            className="text-red-300 underline hover:text-red-400"
                            target="_blank"
                        >
                            Andrews Innovation Strategic Initiatives
                        </a>
                        <br />
                        Used for all other funds — donors can specify the project under "My Instructions".
                        <br /><br /><br />

                        These projects directly support the next generation of leaders and innovators here at Andrews — your generosity makes a tremendous difference!
                        <br /><br />

                        <span className="text-white">
                            Many thanks and kind regards,
                            <br />
                            Andrew Dombrowski
                            <br />
                            AUAG President
                        </span>
                    </p>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default GivingTuesday;
