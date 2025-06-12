import './Home.css';

function Home() {
    return (
        <div className="outer-container home-wrapper">
            <div className="inner-container home-page">
                <h1>Bij Blogventure geloven we in de kracht van woorden<span>*</span></h1>
                <img
                    src="./assets/billboard.png"
                    alt="Afbeelding van een schreeuwerig billboard"
                    className="billboard-img"
                />
                <p className="footnote">* En in billboards. Die zijn niet te missen namelijk.</p>
            </div>
        </div>
    );
}

export default Home;