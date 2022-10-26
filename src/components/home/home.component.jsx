import NavScrollExample from "../navbar/navbar.component";
import RecentlyUpdatedSection from "../recently_updated_section/recently_updated_section.component";
import PopularSection from "../popular_section/popular_section.component";


function Home() {
    return (
        <div>
            <NavScrollExample/>
            <RecentlyUpdatedSection/>
            <PopularSection/>
        </div>
    )
}

export default Home;