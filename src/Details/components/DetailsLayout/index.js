import styled from "styled-components";

const DetailsLayout = styled.div`
  box-sizing: border-box;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 600px 1fr 100px;
  grid-template-areas:
    "image image meta meta"
    "thumbnails thumbnails meta meta"
    "crossselling crossselling crossselling crossselling";
  position: relative
`;
const ButtonSwitcher = styled.div`
  position: absolute;
  top: 30%;
  background: #d6d5d5;
  border-radius: 50%;
  padding: 1rem;
  cursor: pointer;
  &:hover{
    background: #ece8e7;
  }
`;
const Prev = styled(ButtonSwitcher)`
  left: .5rem;
  transform: translate(-30%, -.5rem);
`;
const Next = styled(ButtonSwitcher)`
  right: -1rem;
  transform: translate(-30%, -1rem);
`;

export { DetailsLayout, Prev, Next };
