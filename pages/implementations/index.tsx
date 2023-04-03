import { LayoutHome } from "@layouts/home";
import { ReactElement } from "react";

const Implementations = () => {
  return (
    <>
      <div>Implementations</div>
    </>
  );
};

Implementations.getLayout = function getLayout(page: ReactElement) {
  return <LayoutHome>{page}</LayoutHome>;
};


export default Implementations;
