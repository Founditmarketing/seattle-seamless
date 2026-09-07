import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

/* Browser entry. The route table lives in AppRoutes so the build-time
 * prerender (entry-server.jsx) can render the identical tree under a
 * StaticRouter. */
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
