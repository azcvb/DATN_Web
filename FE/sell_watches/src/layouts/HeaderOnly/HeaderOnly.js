import Header from "../Component/Header";

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
        </div>
    );
}

export default HeaderOnly;