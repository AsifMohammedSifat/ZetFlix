"use client";
import React, { useEffect, useState } from "react";
import PlusIcon from "./ui-SVG/PlusIcon";
import SignIcon from "./ui-SVG/SignIcon";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { addToWatchList, checkIsUserSeenTheMovie } from "@/app/actions";

const WatchList = ({ movieId, movie }) => {
  const { auth } = useAuth();
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      if (auth?.id && movie?.id) {
        const status = await checkIsUserSeenTheMovie(auth.id, movie.id);
        console.log(status);
        setIsAdded(status); 
      }
    };

    fetchStatus();
  }, [auth?.id, movie?.id]); 

  const handleAddToDB = async () => {
    if (!auth?.name) {
      router.push(`/login?redirect=/movie/${movieId}`);
    } else {
      const movieInfo = {
        title: movie?.title,
        userId: auth?.id,
        movieId: movie?.id,
        image: movie.poster_path,
        releaseDate: new Date(movie.release_date),
      };

      // opitmistically update UI before making API call
      setIsAdded(true);

      try {
        await addToWatchList(movieInfo);
        // after adding, check again if the movie was added successfully
        const status = await checkIsUserSeenTheMovie(auth?.id, movie?.id);
        setIsAdded(status); // update the state based on the response
      } catch (error) {
        console.error("Error adding to watchlist:", error);
        setIsAdded(false); // revert UI if error occurs
      }
    }
  };

  return (
    <div className="mb-2">
      <div className="flex flex-wrap gap-2">
        {!isAdded ? (
          <div onClick={handleAddToDB} className="text-center">
            <button className="flex items-center gap-2 bg-black/40 px-1 py-2 rounded-lg">
              <PlusIcon />
              Add to Watch List
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
              <SignIcon />
              Added to Watch List
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchList;





//this code had an issue
// "use client";
// import React, { useEffect, useState } from "react";
// import PlusIcon from "./ui-SVG/PlusIcon";
// import SignIcon from "./ui-SVG/SignIcon";
// import { useAuth } from "@/hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { addToWatchList, checkIsUserSeenTheMovie } from "@/app/actions";

// const WatchList = ({ movieId, movie }) => {
//   const { auth } = useAuth();
//   const router = useRouter();
//   const [isAdded, setIsAdded] = useState(false);

//   useEffect(() => {
//     const fetchStatus = async () => {
//       if (auth?.id && movie?.id) {
//         const status = await checkIsUserSeenTheMovie(auth.id, movie.id);
//         console.log(status);
//         setIsAdded(status); 
//       }
//     };

//     fetchStatus();
//   }, [auth?.id, movie?.id]); // Trigger when auth or movieId changes

//   const handleAddToDB = async () => {
//     if (!auth?.name) {
//       router.push(`/login?redirect=/movie/${movieId}`);
//     } else {
//       const movieInfo = {
//         title: movie?.title,
//         userId: auth?.id,
//         movieId: movie?.id,
//         image: movie.poster_path,
//         releaseDate: new Date(movie.release_date),
//       };

//       try {
//         await addToWatchList(movieInfo);
//         const status = await checkIsUserSeenTheMovie(auth?.id, movie?.id);
//         setIsAdded(status.exists); // Update the state based on the response
//       } catch (error) {
//         console.error("Error adding to watchlist:", error);
//       }
//     }
//   };

//   return (
//     <div className="mb-2">
//       <div className="flex flex-wrap gap-2">
//         {!isAdded ? (
//           <div onClick={handleAddToDB} className="text-center">
//             <button className="flex items-center gap-2 bg-black/40 px-1 py-2 rounded-lg">
//               <PlusIcon />
//               Add to Watch List
//             </button>
//           </div>
//         ) : (
//           <div className="text-center">
//             <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
//               <SignIcon />
//               Added to Watch List
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WatchList;
