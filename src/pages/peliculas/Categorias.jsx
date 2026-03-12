import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardPelicula from "../../components/CardPelicula";

const APIPelPopularesCine = 'https://api.themoviedb.org/3/discover/movie?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE&with_genres=';
const APIPelPopularesTv = 'https://api.themoviedb.org/3/discover/tv?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE&with_genres=';

const Categorias = () => {
  const [datos, setDatos] = useState([]);
  const params = useParams()
  let tipo = "";
  let titulo = "";
  let API = "";

  if (params.tipo == "cine") {
    API = APIPelPopularesCine + params.id;
    titulo = "Populares en el Cine";
    tipo = "cine";
  } else {
    API = APIPelPopularesTv + params.id;
    titulo = "Populares en TV";
    tipo = "tv";
  }


  const getDatos = async () => {

    try {
      const response = await fetch(API);
      const data = await response.json();
      //console.log(data);
      setDatos(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDatos();
  }, [params.id]);

  return (
    <div className="container text-white ">
      <h3 className="text-center py-3">{titulo}</h3>
      <div className="row">
        {datos && datos.map((item, index) => (
          <div className="col-6 col-md-4 col-lg-3 mb-4" key={item.id}>
            <CardPelicula pelicula={item} tipo={tipo} />
          </div>

        ))}
      </div>
    </div>
  )
}

export default Categorias;