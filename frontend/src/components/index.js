import styled from "styled-components";

export const Header = styled.header`
  background-color: #ffffff;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;
`;

export const Body = styled.div`
  align-items: center;
  background-color: #ffffff;
  color: #163250;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 70px);
`;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const LogoImage = styled.img`
  height: 15vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #61dafb;
  margin-top: 10px;
`;

export const Button = styled.button`
  width: 40px;
  height: 19px;
  margin: 8.5px 17.5px 1px 146.5px;
  padding: 4.5px 7.5px 5px 8px;
  border-radius: 9.5px;
  background-color: #3cd36a;
`;

export const CreateButton = styled.button`
  width: 40px;
  height: 19px;
  margin: 8.5px 17.5px 1px 146.5px;
  padding: 4.5px 7.5px 5px 8px;
  border-radius: 9.5px;
  background-color: #3cd36a;
`;