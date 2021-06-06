import { useState } from "react";
import styled from "styled-components"
import { GRAY } from "../ShoppingCart/constants";
import { Card } from "./components/Card";
import { UserData } from "./components/UserData";

import { getCartItems } from "../common/pokemonStorage";

const LayoutStyle = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  max-width: 1024px;
  background-color: ${GRAY};
  margin: auto;
`;

const PanelStyle = styled.div`
  margin: 1rem;
  background-color: white;
  padding: 1rem;
`;

const ScrollStyle = styled.div`
  overflow-y: scroll;
  max-height: 500px;
`;

export function OrderCompleted() {
  const [cart] = useState(getCartItems());

  if (cart.length === 0) {
    return (
      <LayoutStyle>
        <PanelStyle>
          <h2>Your Order has been placed</h2>{" "}
        </PanelStyle>
      </LayoutStyle>
    );
  }
  setTimeout(() => {
    localStorage.clear();
  }, 8000);
  
  return (
    <LayoutStyle>
      <PanelStyle>
        <h2>Order Completed ({cart.length} article)</h2>
        <ScrollStyle>
          {cart.map((item) => (
            <Card
              key={item.name}
              {...item}
            />
          ))}
        </ScrollStyle>
      </PanelStyle>
      <PanelStyle>
        <UserData total={cart.reduce((acc, current) => acc + (current.price * current.quantity), 0)} />
      </PanelStyle>
    </LayoutStyle>
  );
}
