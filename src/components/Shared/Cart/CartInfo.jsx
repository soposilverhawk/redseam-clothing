import React, { useState } from "react";
import closeIcon from "../../../assets/close-icon.png";

function CartInfo(variant="aside") {
  return (
    <aside>
      {/* aside cart header */}
      <div>
        <h3>
          Shopping cart (<span>0</span>)
        </h3>
        <button aria-label="Close cart">
          <img src={closeIcon} />
        </button>
      </div>
      {/* aside cart content */}
      
    </aside>
  );
}

export default CartInfo;
