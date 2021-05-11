import { useEffect, useState } from "react";
import ShowDetails from "../components/ShowDetails";
import { fetchDetails } from "../utils/api";

const MovieDetails = ({ match }) => {
  const params = match.params;
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setDetails(await fetchDetails(params.id, "movie"));
    };
    fetchAPI();
  }, [params.id]);
  return (
    <>
      <ShowDetails id={params.id} details={details} type="movie" />
    </>
  );
};

export default MovieDetails;
