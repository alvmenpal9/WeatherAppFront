import { useEffect, useState } from "react";

const Result = ({ result, setResult }) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (result.hasOwnProperty('location')) {
            setIsLoading(false);
        }

        return () => {
            setResult([]);
        }

    }, [])

    return (
        isLoading
            ? 'Loading...'
            : (
                <section className="result">
                    <div className="result_info">
                        <h1>{result?.temperature?.temp_c}C° / {result?.temperature?.temp_f}F°</h1>
                        <h3>{result?.location?.city} - {result?.location?.country}</h3>
                        <h4>Conditions: <span>{result?.temperature?.condition}</span></h4>
                        <h4>Feels Like: <span>{result?.current?.feels_like}</span></h4>
                        <h4>Humidity: <span>{result?.current?.humidity}</span></h4>
                        <h4>Wind: <span>{result?.current?.wind}</span></h4>
                        <h4>Wind Direction: <span>{result?.current?.wind_direction}</span></h4>
                        <button onClick={e => {
                            document.querySelector('#city').disabled = false;
                            document.querySelector('#country').disabled = false;
                            setResult([]);
                        }}>Search another</button>
                    </div>
                    <div className="img_result">
                        {(result?.temperature?.condition === 'Sunny' || result?.temperature?.condition === 'Clear') ? <img src="/img/dom.png" /> : ''}
                        {(result?.temperature?.condition === 'Cloudy' || result?.temperature?.condition === 'Partly cloudy') ? <img src="/img/nubes.png" /> : ''}
                        {(result?.temperature?.condition === 'Moderate snow') ? <img src="/img/copo-de-nieve.png" /> : ''}
                        {(result?.temperature?.condition === 'Mist') ? <img src="/img/neblina-densa.png" /> : ''}
                    </div>
                </section>
            )
    )
};

export default Result;