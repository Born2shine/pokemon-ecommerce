import styled from "styled-components";
import { getUser } from "../../common/userStorage"
import { HRStyle } from "./Card";

const TotalItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UserData = ({ total }) => {
  const user = getUser();
  return (
    <div>
    <h2>Personal Information</h2>
    <TotalItemStyle>
      <span>Fullname</span>
      <span>{user && `${user.firstname} ${user.surname}`}</span>
    </TotalItemStyle>
    <HRStyle />
    <h2>Total</h2>
    <TotalItemStyle>
      <span>Subtotal</span>
      <span>{(total * 0.8).toFixed(2)}</span>
    </TotalItemStyle>
    <HRStyle />
    <TotalItemStyle>
      <strong>Total (VAT included)</strong>
      <strong>{total}</strong>
    </TotalItemStyle>
    <HRStyle />
  </div>
  )
};
