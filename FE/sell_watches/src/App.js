import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRouters } from "./routers";
import DefaultLayout from "./layouts/DefaultLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from "react";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {publicRouters.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout === null) {
              Layout = Fragment;
            } else if (route.layout) {
              Layout = route.layout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
