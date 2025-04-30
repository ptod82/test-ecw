import styled from "styled-components";

export const LegendWrapper = styled.div`
  background-color: rgb(229, 229, 229);
  max-width: 200px;
  border: 1px solid #999;
  border-radius: 10px;
  padding: 20px;
  font-size: 14px;
`;

export const LegendTitle = styled.b`
  display: block;
  margin-bottom: 10px;
`;

export const LegendColors = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ColorBlockGroup = styled.div``;

export const LegendText = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Square = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  background-color: #fcd9c4;
`;

export const Light = styled(Square)`
  background-color: #f4ac80;
`;

export const Medium = styled(Square)`
  background-color: #cc7540;
`;

export const Dark = styled(Square)`
  background-color: #ff6100;
`;

export const TypeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Myrp = styled.div`
  background-color: purple;
  color: white;
  border-radius: 40px;
  font-size: smaller;
  width: 20px;
  height: 20px;
  justify-content: center;
  display: inline-flex;
  align-items: center;
  border: 1px solid white;
  margin-top: 4px;
  margin-right: 5px;
`;

export const Fer = styled.div`
  background-color: red;
  color: white;
  border-radius: 40px;
  font-size: smaller;
  width: 20px;
  height: 20px;
  justify-content: center;
  display: inline-flex;
  align-items: center;
  border: 1px solid white;
  margin-top: 4px;
  margin-right: 5px;
`;

export const FooterNote = styled.span`
  font-size: smaller;
  font-style: italic;
  line-height: 1.2;
  display: block;
  margin-top: 10px;
`;
