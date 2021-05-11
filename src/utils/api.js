import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const url = "https://api.themoviedb.org/3/";
export const fetchTrending = async (pageNum) => {
  try {
    const { data } = await axios.get(`${url}trending/all/week`, {
      params: {
        api_key: API_KEY,
        page: pageNum,
      },
    });

    const imageUrl = "https://image.tmdb.org/t/p/w500";
    const modifiedData = data["results"].map((result) => ({
      id: result["id"],
      backPoster:
        result["backdrop_path"] !== null
          ? imageUrl + result["backdrop_path"]
          : "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg",
      popularity: result["popularity"],
      title: result["title"] || result["name"],
      poster:
        result["poster_path"] !== null
          ? imageUrl + result["poster_path"]
          : "https://www.movienewz.com/img/films/poster-holder.jpg",
      overview: result["overview"],
      rating: result["vote_average"],
      date: result["release_date"] || result["first_air_date"],
      type: result["media_type"],
    }));
    return [
      { page: data["page"] },
      ...modifiedData,
      { total_pages: data["total_pages"] },
    ];
  } catch (error) {
    console.log(error);
  }
};

export const fetchGenres = async (type) => {
  try {
    const { data } = await axios.get(`${url}genre/${type}/list`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    const modifiedData = data["genres"].map((genre) => ({
      id: genre["id"],
      name: genre["name"],
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDiscover = async (pageNum, type, id) => {
  try {
    const { data } = await axios.get(`${url}discover/${type}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        sort_by: "popularity.desc",
        include_adult: "false",
        include_video: "false",
        page: pageNum,
        with_genres: id || "",
      },
    });
    const imageUrl = "https://image.tmdb.org/t/p/w500";
    const modifiedData = data["results"].map((result) => ({
      id: result["id"],
      backPoster:
        result["backdrop_path"] !== null
          ? imageUrl + result["backdrop_path"]
          : "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg",
      popularity: result["popularity"],
      title: result["title"] || result["name"],
      poster:
        result["poster_path"] !== null
          ? imageUrl + result["poster_path"]
          : "https://www.movienewz.com/img/films/poster-holder.jpg",
      overview: result["overview"],
      rating: result["vote_average"],
      date: result["release_date"] || result["first_air_date"],
      type: result["media_type"] || type,
    }));
    return [
      { page: data["page"] },
      ...modifiedData,
      { total_pages: data["total_pages"] },
    ];
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearch = async (pageNum, type, query) => {
  try {
    const { data } = await axios.get(`${url}search/${type}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query: query,
        page: pageNum,
        include_adult: false,
      },
    });
    const imageUrl = "https://image.tmdb.org/t/p/w500";
    const modifiedData = data["results"].map((result) => ({
      id: result["id"],
      backPoster:
        result["backdrop_path"] !== null
          ? imageUrl + result["backdrop_path"]
          : "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg",
      popularity: result["popularity"],
      title: result["title"] || result["name"],
      poster:
        result["poster_path"] !== null
          ? imageUrl + result["poster_path"]
          : "https://www.movienewz.com/img/films/poster-holder.jpg",
      overview: result["overview"],
      rating: result["vote_average"],
      date: result["release_date"] || result["first_air_date"],
      type: result["media_type"] || type,
    }));
    return [
      { page: data["page"] },
      ...modifiedData,
      { total_pages: data["total_pages"] },
    ];
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetails = async (id, type) => {
  try {
    const { data } = await axios.get(`${url}${type}/${id}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCredits = async (id, type) => {
  try {
    const { data } = await axios.get(`${url}${type}/${id}/credits`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    const modifiedData = data["cast"].map((c) => ({
      id: c["cast_id"] || c["id"],
      character: c["character"],
      name: c["name"],
      img:
        c["profile_path"] !== null
          ? "https://image.tmdb.org/t/p/w200" + c["profile_path"]
          : "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg",
    }));
    const director = data["crew"].find((c) => c.job === "Director") || "";
    return [...modifiedData, director.name];
  } catch (error) {
    console.log(error);
  }
};

export const fetchSimilar = async (id, type) => {
  try {
    const { data } = await axios.get(`${url}${type}/${id}/similar`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    const imageUrl = "https://image.tmdb.org/t/p/w500";
    const modifiedData = data["results"].map((result) => ({
      id: result["id"],
      backPoster:
        result["backdrop_path"] !== null
          ? imageUrl + result["backdrop_path"]
          : "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg",
      popularity: result["popularity"],
      title: result["title"] || result["name"],
      poster:
        result["poster_path"] !== null
          ? imageUrl + result["poster_path"]
          : "https://www.movienewz.com/img/films/poster-holder.jpg",
      overview: result["overview"],
      rating: result["vote_average"],
      date: result["release_date"] || result["first_air_date"],
      type: result["media_type"] || type,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchVideo = async (id, type) => {
  try {
    const { data } = await axios.get(`${url}${type}/${id}/videos`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return data["results"][0].key;
  } catch (error) {
    console.log(error);
  }
};
