import { useState, useEffect } from "react";
import App from "./App";
import GivingTuesday from "./components/GivingTuesday";

export default function Router() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  if (path === "/") return <App />;
  if (path === "/giving") return <GivingTuesday />;
  return <h1>404 Not Found</h1>;
}
