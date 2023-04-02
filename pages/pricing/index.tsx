import { LayoutHome } from "@layouts/home";
import { ReactElement } from "react";

const Pricing = () => {
  return (
    <>
      <div>Pricing</div>
    </>
  );
};

Pricing.getLayout = function getLayout(page: ReactElement) {
  return <LayoutHome>{page}</LayoutHome>;
};


export default Pricing;
