import NavScrollExample from "../navbar/navbar.component";
import RecentlyUpdatedSection from "../recently_updated_section/recently_updated_section.component";
import PopularSection from "../popular_section/popular_section.component";
import Footer from "../footer/footer.component";
import GreyBubble from "../grey_bubble/grey.bubble.component";


function Home() {
    let isExpanded = window.screen.width > 600;
    return (
        <div>
            <NavScrollExample/>
            { isExpanded && <GreyBubble/>}
            <RecentlyUpdatedSection/>
            <PopularSection/>
            <Footer/>
        </div>
    )
}

export default Home;