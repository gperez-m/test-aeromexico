import Filter from "components/landing/Filter";
import Header from "components/landing/Header";
import { useState } from "react";




export default function Landing() {
    const [active, setActive] = useState(1)
    const reloadPage = () => {
        setActive(active + 1);
    }

    return (
        <div className="bgHP">
            <Header reloadServices={() => reloadPage()} />
            <Filter key={active}/>
        </div>
    )
}