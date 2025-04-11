import Header from "~/layouts/Component/Header";
import Footer from "~/layouts/Component/Footer";
import MainMenu from "~/layouts/Component/MainMenu";

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <MainMenu />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;