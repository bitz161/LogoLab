import React from "react";
import "./pricingPlans.styles.scss";
import Button from "../Buttons/buttons.component";
import { upgradeSubscription } from "../../utilities/firebase/firebase";

const PricingPlans = () => {
  const handleSubscribeClick = () => {
    upgradeSubscription();
  };

  return (
    <div className="pricingPlansContainer">
      <section>
        <h4>Plans & Pricing</h4>
      </section>
      <section className="plansContainer">
        <div>
          <h4>Free Tier</h4>
          <h3>Free</h3>
          <hr />
          <ul>
            <li>Pending!!</li>
          </ul>
        </div>
        <div>
          <h4>Premium Tier</h4>
          <h3>$10/Month</h3>
          <hr />
          <ul className="list-disc">
            <li>Create Logo</li>
            <li>Post and Comment to Community</li>
            <li>Access All Images</li>
          </ul>
          <Button buttonContent="Subscribe" onClick={handleSubscribeClick} />
        </div>
      </section>
    </div>
  );
};

export default PricingPlans;
