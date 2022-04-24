import React from "react";
import useWindowWidth from "../getWindowWidth";
import Search from "./Search";
function LowWidthSearch({ style }) {
  const { width } = useWindowWidth();

  return width < 841 ? <Search style={style} /> : null;
}

export default LowWidthSearch;
