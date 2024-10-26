import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { toast } from "react-toastify";

const HomeSearchBar = () => {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState();

  const onSearch = () => {
    console.log(searchCity);
    if (searchCity=="" || searchCity==undefined || searchCity==null ){
      toast.error("please enter city name");
      return 
    }
    navigate(`/searchpg/${searchCity}`);
  };

  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
        placeholder="Search city..."
        type="text"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />
      <button className="button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default HomeSearchBar;
