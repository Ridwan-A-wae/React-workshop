import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';
import './App.css';
import ReactLoading from 'react-loading';

// component
import FavPoke from './components/FavPoke';

function App() {

  const [poke, setPoke] = useState()
  const [load, setLoad] = useState(false)
  const [err, setError] = useState()
  const [number, setNumber] = useState(1)
  const [fav, setFav] = useState([])


  useEffect(() => {

    let abortcontroller = new AbortController();

    const loadPoke = async () => {
      try {
        setLoad(true)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {
          signal: abortcontroller.signal
        })
        setPoke(response.data)
      } catch (err) {
        setError('Something went wrong.')
      } finally {
        setLoad(false)

      }
    }
    loadPoke();
    return () => abortcontroller.abort();
  }, [number])

  const nextPoke = () => {
    setNumber((number) => number + 1)
  }

  const prevPoke = () => {
    setNumber((number) => number - 1)
  }

  const getFav = () => {
    setFav((oldState) => [...oldState, poke])
  }

  console.log(fav)


  return <div className="block max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
      {load ? <ReactLoading type='spin'color='black' width={'20%'} height={'20%'} /> : <div>
        <div>
        <button onClick={getFav}>Favorite</button>

          <h1> {poke?.species?.name} </h1>
          <img src={poke?.sprites?.other?.home?.front_default} alt={poke?.species.name} />
          <ul> {poke?.abilities?.map((abi, idx) => (
            <li key={idx} style={{ listStyle: "none" }}> {abi.ability.name}  </li>
          ))} </ul>
          <button onClick={prevPoke}>PrevPoke</button>
          <button onClick={nextPoke}>NextPoke</button>

        </div>
      </div>}
      <div>      
        <div>
        <h2>Your favorite pokemon</h2>
        {fav.length > 0 ? <FavPoke fav={fav}    /> :<div className= "flex h-full justify-center items-center"><h1>No favorite Pokemon</h1></div>}
      </div>

      </div>
      <br />


    </div>
  </div>
}
export default App;
