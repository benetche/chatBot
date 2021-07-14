import Header from '../../components/header';
import ChatBox from '../../components/chatbox';
import './styles.css';

function HomePage() {
  return (
    <div className="homepage">
      <Header/>
      <div className="main-div">
        <ChatBox/>
      </div>
    </div>
  );
}

export default HomePage;
