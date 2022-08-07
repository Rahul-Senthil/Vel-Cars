import React from "react";
import { useState, createContext, createRef } from "react";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [activeUser, setActiveUser] = useState();
  const [wishlist, setWishlist] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  //Filter data
  const [carModels, setCarModels] = useState([]);
  const [carFuels, setCarFuels] = useState([
    "Diesel",
    "Petrol",
    "Gas",
    "Electric",
    "Hybrid",
  ]);
  const [carPrices, setCarPrices] = useState([
    {
      value: "0 - 2,00,000",
      name: "Below 2 Lakhs",
    },
    {
      value: "2,00,000 - 4,00,000",
      name: "2 - 4 Lakhs",
    },
    {
      value: "4,00,000 - 6,00,000",
      name: "4 - 6 Lakhs",
    },
    {
      value: "6,00,000 - 8,00,000",
      name: "6 - 8 Lakhs",
    },
    {
      value: "8,00,000 - 10,00,000",
      name: "8 - 10 Lakhs",
    },
    {
      value: "10,00,000 - 100,00,000",
      name: "10 Lakhs & Above",
    },
  ]);
  const [carKms, setCarKms] = useState([
    {
      value: "0 - 25000",
      name: "Below 25000 Km",
    },
    {
      value: "25000 - 50000",
      name: "25000 Km - 50000 Km",
    },
    {
      value: "50000 - 75000",
      name: "50000 Km - 75000 Km",
    },
    {
      value: "75000 - 100000",
      name: "75000 Km - 100000 Km",
    },
    {
      value: "100000 - 1000000",
      name: "Above 100000 Km",
    },
  ]);
  const [carTransmissions, setCarTransmissions] = useState([
    "Manual",
    "Automatic",
  ]);
  const [carIsInsured, setCarIsInsured] = useState("Insured");

  //filters selected
  const [modelFilter, setModelFilter] = useState([]);
  const [fuelFilter, setFuelFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState(null);
  const [kmFilter, setKmFilter] = useState(null);
  const [transmissionFilter, setTransmissionFilter] = useState(null);
  const [yearFilter, setYearFilter] = useState({ from: null, to: null });
  const [isInsuredFilter, setIsInsuredFilter] = useState(false);

  //isChecked - maintains true or false
  const [isModelFilterChecked, setIsModelFilterChecked] = useState([]);
  const [isFuelFilterChecked, setIsFuelFilterChecked] = useState([]);
  const [isPriceFilterClicked, setIsPriceFilterClicked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isKmFilterClicked, setIsKmFilterClicked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isTransmissionFilterClicked, setIsTransmissionFilterClicked] =
    useState([false, false]);
  const [isIsInsuredFilterChecked, setIsIsInsuredFilterChecked] =
    useState(false);

  //toggle states
  // const [isModelFilterToggled, setIsModelFilterToggled] = useState(false);
  // const [isFuelFilterToggled, setIsFuelFilterToggled] = useState(false);
  // const [isPriceFilterToggled, setIsPriceFilterToggled] = useState(false);
  // const [isKmFilterToggled, setIsKmFilterToggled] = useState(false);
  // const [isTransmissionFilterToggled, setIsTransmissionFilterToggled] =
  //   useState(false);
  // const [isYearFilterToggled, setIsYearFilterToggled] = useState(false);
  // const [isIsInsuredFilterToggled, setIsInsuredFilterToggled] = useState(false);

  //functions
  const handleModel = (filter) => {
    console.log(isModelFilterChecked);
    const index = modelFilter.indexOf(filter);
    const i = carModels.indexOf(filter);
    let temp = [...isModelFilterChecked];
    temp[i] = !temp[i];
    setIsModelFilterChecked([...temp]);
    if (index === -1) {
      setModelFilter([...modelFilter, filter]);
    } else {
      modelFilter.splice(index, 1);
      setModelFilter([...modelFilter]);
    }
  };

  const handleFuel = (filter) => {
    console.log(isFuelFilterChecked);
    const index = fuelFilter.indexOf(filter);
    const i = carFuels.indexOf(filter);
    let temp = [...isFuelFilterChecked];
    temp[i] = !temp[i];
    setIsFuelFilterChecked([...temp]);
    if (index === -1) {
      setFuelFilter([...fuelFilter, filter]);
    } else {
      fuelFilter.splice(index, 1);
      setFuelFilter([...fuelFilter]);
    }
  };

  const handlePrice = (filter) => {
    const i = carPrices.findIndex((c) => {
      return c.value === filter;
    });
    let temp = [...isPriceFilterClicked];
    temp[i] = !temp[i];
    for (let index = 0; index < temp.length; index++) {
      if (i !== index) {
        temp[index] = false;
      }
    }
    setIsPriceFilterClicked([...temp]);
    if (priceFilter === filter) {
      setPriceFilter(null);
    } else {
      setPriceFilter(filter);
    }
  };

  const handleKm = (filter) => {
    const i = carKms.findIndex((c) => {
      return c.value === filter;
    });
    let temp = [...isKmFilterClicked];
    temp[i] = !temp[i];
    for (let index = 0; index < temp.length; index++) {
      if (i !== index) {
        temp[index] = false;
      }
    }
    setIsKmFilterClicked([...temp]);
    if (kmFilter === filter) {
      setKmFilter(null);
    } else {
      setKmFilter(filter);
    }
  };

  const handleTransmission = (filter) => {
    const i = carTransmissions.indexOf(filter);
    let temp = [...isTransmissionFilterClicked];
    temp[i] = !temp[i];
    for (let index = 0; index < temp.length; index++) {
      if (i !== index) {
        temp[index] = false;
      }
    }
    setIsTransmissionFilterClicked([...temp]);
    if (transmissionFilter === filter) {
      setTransmissionFilter(null);
    } else {
      setTransmissionFilter(filter);
    }
  };

  const yearFromRef = createRef();
  const yearToRef = createRef();

  const handleYear = () => {
    let from = yearFromRef.current.value;
    let to = yearToRef.current.value;
    from = from ? from : "2000";
    to = to ? to : String(new Date().getFullYear());
    console.log(from);
    console.log(to);
    setYearFilter({ from: from, to: to });
  };

  const handleYearToNull = () => {
    setYearFilter({ from: null, to: null });
    yearFromRef.current.value = "";
    yearToRef.current.value = "";
  };

  const handleIsInsured = (filter) => {
    console.log(filter);
    setIsIsInsuredFilterChecked(!isIsInsuredFilterChecked);
    setIsInsuredFilter(!isInsuredFilter);
  };

  const handleClearAllFilters = () => {
    console.log("oio");
    setModelFilter([]);
    setIsModelFilterChecked([]);
    setFuelFilter([]);
    setIsFuelFilterChecked([]);
    setPriceFilter(null);
    setIsPriceFilterClicked([]);
    setKmFilter(null);
    setIsKmFilterClicked([]);
    setTransmissionFilter(null);
    setIsTransmissionFilterClicked([]);
    setIsInsuredFilter(false);
    setIsIsInsuredFilterChecked(false);
    setYearFilter({ from: null, to: null });
    yearFromRef.current.value = "";
    yearToRef.current.value = "";
    // setIsModelFilterToggled(false);
    // setIsFuelFilterToggled(false);
    // setIsPriceFilterToggled(false);
    // setIsKmFilterToggled(false);
    // setIsTransmissionFilterToggled(false);
    // setIsYearFilterToggled(false);
    // setIsInsuredFilterToggled(false);
  };

  // const handleClearAllToggles = () => {
  //   console.log("hiii");
  //   setIsModelFilterToggled(false);
  //   setIsFuelFilterToggled(false);
  //   setIsPriceFilterToggled(false);
  //   setIsKmFilterToggled(false);
  //   setIsTransmissionFilterToggled(false);
  //   setIsYearFilterToggled(false);
  //   setIsInsuredFilterToggled(false);
  // };

  return (
    <ProductContext.Provider
      value={{
        allProductsState: [allProducts, setAllProducts],

        activeUserState: [activeUser, setActiveUser],

        wishlistState: [wishlist, setWishlist],

        carModelsState: [carModels, setCarModels],
        modelFilterState: [modelFilter, setModelFilter],
        isModelFilterCheckedState: [
          isModelFilterChecked,
          setIsModelFilterChecked,
        ],
        handleModel: handleModel,

        carFuelsState: [carFuels, setCarFuels],
        fuelFilterState: [fuelFilter, setFuelFilter],
        isFuelFilterCheckedState: [isFuelFilterChecked, setIsFuelFilterChecked],
        handleFuel: handleFuel,

        carPricesState: [carPrices, setCarPrices],
        priceFilterState: [priceFilter, setPriceFilter],
        isPriceFilterClickedState: [
          isPriceFilterClicked,
          setIsPriceFilterClicked,
        ],
        handlePrice: handlePrice,

        carKmsState: [carKms, setCarKms],
        kmFilterState: [kmFilter, setKmFilter],
        isKmFilterClickedState: [isKmFilterClicked, setIsKmFilterClicked],
        handleKm: handleKm,

        carTransmissionsState: [carTransmissions, setCarTransmissions],
        transmissionFilterState: [transmissionFilter, setTransmissionFilter],
        isTransmissionFilterClickedState: [
          isTransmissionFilterClicked,
          setIsTransmissionFilterClicked,
        ],
        handleTransmission: handleTransmission,

        yearFilterState: [yearFilter, setYearFilter],
        yearFromRef: yearFromRef,
        yearToRef: yearToRef,
        handleYear: handleYear,
        handleYearToNull: handleYearToNull,

        carIsInsuredState: [carIsInsured, setCarIsInsured],
        isInsuredFilterState: [isInsuredFilter, setIsInsuredFilter],
        isIsInsuredFilterCheckedState: [
          isIsInsuredFilterChecked,
          setIsIsInsuredFilterChecked,
        ],
        handleIsInsured: handleIsInsured,

        handleClearAllFilters: handleClearAllFilters,
        // handleClearAllToggles: handleClearAllToggles,

        filteredProductsState: [filteredProducts, setFilteredProducts],

        // isModelFilterToggledState: [
        //   isModelFilterToggled,
        //   setIsModelFilterToggled,
        // ],
        // isFuelFilterToggledState: [isFuelFilterToggled, setIsFuelFilterToggled],
        // isPriceFilterToggledState: [
        //   isPriceFilterToggled,
        //   setIsPriceFilterToggled,
        // ],
        // isKmFilterToggledState: [isKmFilterToggled, setIsKmFilterToggled],
        // isTransmissionFilterToggledState: [
        //   isTransmissionFilterToggled,
        //   setIsTransmissionFilterToggled,
        // ],
        // isYearFilterToggledState: [isYearFilterToggled, setIsYearFilterToggled],
        // isIsInsuredFilterToggledState: [
        //   isIsInsuredFilterToggled,
        //   setIsInsuredFilterToggled,
        // ],
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
