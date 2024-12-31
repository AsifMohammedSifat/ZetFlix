import Compare from "@/components/Compare";

const ComparePage = async () => {
  let movieData;
  try {
    const popularMoviesUrl = `${process.env.API_URL}/api/movie`;
    const data = await fetch(popularMoviesUrl);
    movieData = await data.json();
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    popularMoviesPromise = Promise.resolve(null);
  }

  return <Compare response={movieData.results}/>;
};

export default ComparePage;
