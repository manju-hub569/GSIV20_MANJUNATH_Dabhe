import React,{useEffect,useState} from 'react';
import Card from './card';
import axios from 'axios';
import './css/style.css';

function App() {
    const imgrl = 'https://image.tmdb.org/t/p/w500';
    const [Data, setData] = useState([]);
    const [toggle, setTogle] = useState(false);
    const [overview, setOverview] = useState([]);
    const [path, setPath] = useState([]);
    const [rdate, setDate] = useState([]);
    const [title, setTitle] = useState([]);
    const [searchTerm, setSearch] = useState('');

    useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2556de5070aefa7c6bde82d54c547d70`)
    .then(res =>{
        setData(res.data.results);
        console.log(res.data.results)
    })
    .catch((e)=>{
        console.log(e)
    });
    },[]);

    const getdata = (overview,poster_path,release_date,title) => {
        setOverview(overview);
        setPath(poster_path);
        setDate(release_date);
        setTitle(title);
        setTogle(true);
    }
    const close = () => {
        setTogle(false);
    }

    return (
        <>
        <div style = {{height:'40px',display:'flex',alignItems:'center',justifyContent:'space-around',paddingLeft:'5px'}}>
            POPULAR MOVIES
            <input type = 'text' name = 'text' value = {searchTerm}
             onChange = {(e) => setSearch(e.target.value)}
             placeholder = 'Search Movies'
              />
        </div>
        <div style = {{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>
            {Data.filter((val) => {
                if(searchTerm === '') {
                    return val
                } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                }
            }).map((val,id) => {
                return <Card value = {val} imsrc = {imgrl} key = {id} getdata = {getdata} />
            })}
        </div>
        {
            toggle?(<div className = 'mdetail'>
                <div className = 'home' onClick = {close}>
                    X
                </div>
                <div className = 'info'>
                    <div className = 'info2'>
                        <div className = 'pht'>
                            <img src = {imgrl+path} alt = {'manju'} height = '200px' width = '200px' />
                        </div>
                        <div className = 'pht'>
                            <div>{title}</div>
                            <div>{rdate}</div>
                            <div>{overview}</div>
                        </div>
                    </div>
                </div>
            </div>):null
        }
        </>
    )
}

export default App