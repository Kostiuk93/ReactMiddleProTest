import {useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const calcValue = () => {
    console.log('random')
    return Math.random() * (50 - 1) +1
}

const countTotal = (num) => {
    console.log('counting...')
    return num + 10
}

const Slider = (props) => {

    const [slide, setSlide]= useState(0);
    const [autoplay, setAutiplay]= useState(false);

    // при useCallback() кэшируется ФУНКЦИЯ
    const getSomeImg = useCallback(() => {
        console.log('fetchig')
        return [
            "https://avatars.mds.yandex.net/i?id=8cb608a4347ac3303f920ca182aa3b90-5887129-images-thumbs&n=13&exp=1",
            "https://avatars.mds.yandex.net/i?id=f336fbfa4b5852c8d731420d08da64e4-4114158-images-thumbs&n=13&exp=1"
        ]
    }, [slide])

    function logging () {
        console.log('log')
    }

    useEffect(() => {
        document.title = `Slide: ${slide}`
    }, [slide])

    useEffect(() => {
    }, [autoplay])

    function changeSlide(i) {
        setSlide(slide => slide + i)
    }

    function toggleAutoplay() {
        setAutiplay(autoplay => !autoplay)
    }

    // при useMemo() кэшируется ЗНАЧЕНИЕ
    const total = useMemo(() => {
        return countTotal(slide)
    }, [slide])

    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : 'black'
    }), [slide])
    
    useEffect(() => {
        console.log('styles!')
    }, [style])

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />

                <Slide getSomeImg={getSomeImg}/>

                <div className="text-center mt-5">Active slide {slide} <br/> 
                {autoplay ? 'auto' : null}
                </div>
                <div style={style} className="text-center mt-5">Total slides: {total}</div>

                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}
                        >
                        -1
                        </button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}
                        >+1
                        </button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}
                        >toggle autoplay
                        </button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImg}) => {
    const [images, setImages] = useState([])
    useEffect(() => {
        setImages(getSomeImg())
    }, [getSomeImg])

    return (
        <>
            {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
        </>
    )
}


function App() {
    const [slider, setSlider] = useState(true)
  return (
        <>
            <button onClick={() => setSlider(false)}>Click</button>
            {slider ? <Slider/> : null}
        </>
  );
}

export default App;
