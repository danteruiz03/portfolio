import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dev, Linkedin, Github } from '../../assets/assets';
import { change } from "../../actions";
import './home.css'


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(change('home'));
    }, [dispatch])

    const openLinkedIn = () => {
        window.open("https://www.linkedin.com/in/danteruiz03/");
    };

    const openGitHub = () => {
        window.open("https://github.com/danteruiz03");
    };

    return (
        <div className="home">
            <div className="home-left">
                <div className="description-1">
                    Application Developer Seeking New Career Opportunities
                </div>
                <div className="description-2">
                    Bringing Your Services to Life
                </div>
                <div className="description-3">
                    Developer with almost 4 yrs of experience doing software development
                    using technologies like HTML, CSS, Javascript, ReactJS, AngularJS,
                    .NET Core, SQL Server, Azure Cloud Services, and Power Platform
                </div>
                <div className="description-4">
                    <img src={Linkedin} alt="linkedin" onClick={openLinkedIn}></img>
                    <img src={Github} alt="github" onClick={openGitHub}></img>
                </div>
            </div>
            <div className="home-right">
                <img src={Dev} alt="dev"></img>
            </div>
        </div >
    )
}

export default Home;