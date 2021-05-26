import React, { useState } from 'react';
import './App.css';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';
import ParticlesBg from 'particles-bg';
import logo from './s-logo.png';
import { Segment } from 'semantic-ui-react';
function App() {
  const [searchValue, setSearchValue] = useState('');
  const onChangeSearch = query => setSearchValue(query);

  const [value, setValue] = useState('');
  

  return (
    <div className="App">
      <div className = "particles">
        <ParticlesBg type = "custom" bg = {true}   />
      </div>
      <div className="container">
        <header className="App-header">
          {/* <img src = {logo} /> */}
        </header>
        <div className="Subtitle-area">
          <h4>Shorten your URL!</h4> <br />
        </div>
        <div className="Search-area">

          <SearchBar className='Search-bar' placeholder='Paste your url here' onChange={onChangeSearch} value={searchValue}
            onRequestSearch={() => {
              try {
                const response = axios.post('https://skmsi.herokuapp.com/url', { url: searchValue });
                console.log('👉 Returned data:', response.then((res) => {
                    if (res.status == 200) {
                      console.log(res.data.slug);
                      setValue('https://skmsi.herokuapp.com/'+res.data.slug);
                    } else {
                      setValue('Enter a valid URL!!');
                      console.log('error');
                    }
                })
                .catch((err) => {
                  setValue('Enter a valid URL!!');
                  console.log('error');
                  throw err;
                }));
               
              } catch (e) {
                console.log(`😱 Axios request failed: ${searchValue}`);
              }
            }}
          />
          <card>
            <br />
          {value && <>
          <Segment piled>
            <h3><a href={value} target="_blank">{value}</a></h3>
          </Segment> </>
          }
          
          </card>

          
        </div>
        

      </div>
      <br />
      <footer>
        <h3>Made with ❤️  by <a style={{color: "black"}}href="http://sahinur.netlify.app">Sahinur Islam</a></h3>
      </footer>
    </div>

  );
}





export default App;
