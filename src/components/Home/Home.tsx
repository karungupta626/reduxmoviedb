import Sidebar from "../SideBar/Sidebar";
import "./Home.css";
import Cards from "../Cards/Cards";
import Slide from "../Slide/Slide";
import Join from "./JoinToAccess/Join";
import CardsSecond from "../Cards/CardsSecond";
import Drawer from "./Drawer/Drawer";

const Home = () => {
  return (
    <div className="home-div">
      
     <Sidebar />
      <Slide />
      <br/>
      <Cards/>
      <br/>
      <Drawer />
      <br/>
      <CardsSecond/>
      <br/>
      <Join />
      <br/> 
    </div>
  );
};
export default Home;
