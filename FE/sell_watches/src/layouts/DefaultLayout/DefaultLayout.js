import Header from "~/layouts/Component/Header";
import Footer from "~/layouts/Component/Footer";

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;