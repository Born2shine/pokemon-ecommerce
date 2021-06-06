import styled from "styled-components";
import { GRAY } from "../constants";
import { HRStyle } from "./Hr";

const CardStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  img {
    width: 100px;
    background-color: ${GRAY};
  }
  div {
    padding: 1rem;
  }
`;

const CardPriceStyle = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const RemoveStyle = styled.a`
  color: black;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const Card = ({ name, img, type, price, quantity, onRemove, increaseByOne, decreaseByOne }) => (
  <>
    <CardStyle>
      <img src={img} alt={name} />
      <div>
        <strong>{name}</strong>
        <p>{type}</p>
        <RemoveStyle onClick={onRemove}>Remove</RemoveStyle>
      </div>
      <CardPriceStyle>
        <p>
          <button type="submit" onClick={decreaseByOne}>-</button>  {quantity} <button type="submit" onClick={increaseByOne}>+</button>
        </p>
        <p>{price}</p>
      </CardPriceStyle>
    </CardStyle>
    <HRStyle />
  </>
);