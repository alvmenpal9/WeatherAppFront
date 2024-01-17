import axios from "axios";
import { useState } from "react";
import Result from "./Result";
import { base_url } from "../api/config";

const Home = () => {

    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [result, setResult] = useState([]);
    const [error, setError] = useState(false);

    const getWeather = async (e) => {
        e.preventDefault();
        if (city && country) {
            try {
                const response = await axios.get(`${base_url.href}?city=${city}&country=${country}`);
                if (response?.status === 200) {
                    setResult(result => [...result, response?.data]);
                    e.target.city.disabled = true;
                    e.target.country.disabled = true;
                    e.target.city.value = '';
                    e.target.country.value = '';
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <main className='content'>
            <h2>GET CURRENT WEATHER IN YOUR LOCATION!</h2>
            <form className='form' onSubmit={getWeather}>
                <label htmlFor='city'>City</label>
                <input type="text" name="city" id="city" placeholder='Type a city' onChange={e => setCity(e.target.value)} required />
                <label htmlFor='country'>Country</label>
                <input type="text" name="country" id="country" placeholder='Type a country' onChange={e => setCountry(e.target.value)} required minLength='2' />
                <p>Note: Country must be in ISO 3166 format</p>
                <a href="https://www.iso.org/obp/ui/#search">Find ISO 3166 Country codes here</a>
                <input type="submit" value="Check" />
            </form><br />
            {result.length > 0 && (
                <Result result={result[0]} setResult={setResult} />
            )}
        </main>
    )
}

export default Home;