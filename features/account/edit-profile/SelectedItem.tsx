import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the interface for the ProductDetails
interface ProductDetails {
  display_type: string;
  ordering: string;
  second_ordering: string;
  descp2: string;
  brand_id: string;
  brand_name: string;
  alt: string;
  image_url: string;
  title: string;
  product_id: string;
  url_product_name: string;
  product_name: string;
  alt2: string;
  prod_sec_content: string;
}

const SearchableBrands = ({ setselectedbrandId }: any) => {
  const [brands, setBrands] = useState<ProductDetails[]>([]); // State for the list of brands
  const [search, setSearch] = useState<string>("");  // State for the search input
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);  // State for selected brand IDs
  const [selectedBrands, setSelectedBrands] = useState<ProductDetails[]>([]);
  const [showBrands, setShowBrands] = useState<boolean>(false);

  // Fetch the brands from the API
  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getSliderListpop1`
      );
      const result = response?.data;
      let fetchNewBrands = result?.brands || [];
      setBrands(fetchNewBrands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // Fetch brands on component mount
  useEffect(() => {
    fetchBrands();
  }, []);

  // Handle checkbox changes (select/deselect)
  const handleCheckboxChange = (brandId: string, productId: string) => {
    setSelectedBrandIds((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)  // Deselect
        : [...prevSelected, productId]  // Select
    );
    setselectedbrandId((prevSelected: any) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id: any) => id !== productId)  // Deselect
        : [...prevSelected, productId]  // Select
    );
  };

  const handleCheckbox = (brand: ProductDetails) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.find((b) => b.product_id === brand.product_id)
        ? prevSelected.filter((b) => b.product_id !== brand.product_id)  // Deselect
        : [...prevSelected, brand]  // Select
    );
    setShowBrands(false);
    setSearch("")
  };

  // Filter the brands based on the search query or show all if search is empty
  const filteredBrands = search
    ? brands.filter((brand) =>
        brand.product_name.toLowerCase().includes(search.toLowerCase())
      )
    : brands; // Show all brands when search is empty

  return (
    <div className="w-full">
      <div className="relative">
        {/* Input box */}
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowBrands(true)}
          className="py-2 pl-1 mt-1 w-full text-gray-700 rounded-sm border-b border-gray-200 shadow-sm outline-none placeholder:text-gray-600"
        />

        {/* Conditionally show filtered brands list */}
      
         <ul className="  w-full  flex gap-2 flex-wrap   overflow-y-auto mt-1 space-y-2">
         {filteredBrands.map((brand, index) => (
           <li
             key={`${brand.brand_id}-${index}`} // Use combination of brand_id and index
             className="flex items-center px-2 hover:bg-gray-100"
           >
             <input
               type="checkbox"
               checked={selectedBrandIds.includes(brand.product_id)}
               onChange={() => {
                 handleCheckboxChange(brand.brand_id, brand.product_id);
                 handleCheckbox(brand);
               }}
               className="mr-2"
             />
             <span>{brand.product_name}</span>
           </li>
         ))}
       </ul>
        
      </div>

      {/* Selected brand IDs */}
      {/* {selectedBrands.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Selected Skill Names:</h2>
          <ul className="list-disc pl-5 space-y-1">
            {selectedBrands.map((brand, index) => (
              <li key={index}>{brand.product_name}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default SearchableBrands;
