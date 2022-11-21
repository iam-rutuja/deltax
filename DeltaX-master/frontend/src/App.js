import Layout from './core/Layout';
import img from './img/car.jpg'
import './styles/home.css'

const App = () => {
  return(
    <Layout>
      <div>
        <div class="img" style={{ backgroundImage:`url(${img})` }}></div>
        <div class="center">
          <div class="title">Amazing Website For Car's</div>
          <div class="btns">
            <button>Buy Now</button>
            <button>More</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App;
