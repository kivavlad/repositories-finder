import { Header } from "../components/header"
import { Search } from "../containers/search"

export const App: React.FC = () => {

    return (
        <div className="container">
            <Header />
            <Search />
        </div>
    )
}