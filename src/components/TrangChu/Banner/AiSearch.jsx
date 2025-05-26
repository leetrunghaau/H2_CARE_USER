import { AutoComplete, Input } from "antd";
import { useState } from "react";
import { aiSuggest } from "../../../services/apiDoctor";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
const { Search } = Input;
import "./Banner.css";
const AISearch = () => {
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();


  // debounce giúp giảm số lần gọi API khi user gõ liên tục
  let debounceTimeout;
  const debounceSearch = (value) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => handleSearch(value), 300);
  };

  const handleSearch = async (value) => {
    if (!value) {
      setOptions([]);
      return;
    }
    try {
        let query = `query=${encodeURIComponent(value)}`
      const res = await aiSuggest(query)

      setOptions(
        res.suggestions.map((item) => ({
          value: item,
          label: item,
        }))
      );
    } catch (error) {
      console.error("Search error:", error);
      setOptions([]);
    }
  };

  const onSelect = (value) => {
    console.log("User chọn:", value);
        // Ví dụ điều hướng sang trang kết quả tìm kiếm
    navigate(`/search?query=${encodeURIComponent(value)}`);
  };

   // Xử lý khi user nhập xong và nhấn Enter
  const onSearchEnter = (value) => {
    if (!value) return;
    console.log("User nhấn enter với giá trị:", value);
    navigate(`/search?query=${encodeURIComponent(value)}`);
  };

  return (
    <AutoComplete
      options={options}
      onSelect={onSelect}
      onSearch={debounceSearch}
      style={{ width: "100%" }}
    >
      {/* <Input.Search size="large" enterButton onSearch={onSearchEnter} /> */}
      <Search
            placeholder="Triệu chứng, bác sĩ, bệnh viện..."
            enterButton={<SearchOutlined />}
            size="large"
            className="hero-search"
            onSearch={(e) => onSearchEnter(e)}  
          />
    </AutoComplete>
  );
};

export default AISearch;
