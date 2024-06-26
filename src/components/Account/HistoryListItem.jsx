import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { normalizeNumber } from "../../utils/normalizeNumber";

const HistoryListItem = ({ data }) => {
  const myName = useSelector((state) => state.user.userInfo.name);
  let amount;
  let anotherName;
  let balance;
  if (myName == data.senderName) {
    amount = data.amount * -1;
    balance = data.senderBalance;
    anotherName = data.recieverName;
  } else {
    amount = data.amount;
    balance = data.receiverBalance;
    anotherName = data.senderName;
  }

  const renderAmount = (amount) => {
    if (amount > 0) {
      return (
        <ItemAmount color="#FF4848">+{normalizeNumber(amount)}</ItemAmount>
      );
    } else if (amount < 0) {
      return <ItemAmount color="#5A74FF">{normalizeNumber(amount)}</ItemAmount>;
    } else {
      return <ItemAmount>{normalizeNumber(amount)}</ItemAmount>;
    }
  };

  const renderMessage = (messageCode) => {
    switch (messageCode) {
      case 1:
        return "이체";
      case 2:
        return "용돈 조르기";
      case 3:
        return "미션 완료";
      case 4:
        return "대출금";
      default:
        return "알 수 없는 코드";
    }
  };

  return (
    <Container>
      <Wrapper>
        <ItemContent>{renderMessage(data.messageCode)}</ItemContent>
        <ItemName>
          {amount > 0 ? "From. " : "To. "}
          {anotherName}
        </ItemName>
      </Wrapper>
      <AmountContainer>
        {renderAmount(amount)}
        <Balance>남은 돈: {normalizeNumber(balance)}원</Balance>
      </AmountContainer>
    </Container>
  );
};

export default HistoryListItem;

const Container = styled.li`
  ${tw`flex justify-between items-center mb-5 border-b border-gray-200`}
`;

const Wrapper = styled.div`
  ${tw`flex flex-col items-start gap-2`}
  font-size: 20px;
`;

const ItemContent = styled.div``;

const ItemName = styled.div`
  ${tw`text-gray-500`}
  font-size: 15px;
`;

const AmountContainer = styled.div`
  ${tw`flex flex-col items-end gap-2`}
`;

const ItemAmount = styled.div`
  ${tw`font-semibold`}
  font-size:20px;
  color: ${({ color }) => (color ? color : "inherit")};
`;

const Balance = styled.div`
  ${tw`text-gray-500`}
  font-size: 15px;
`;
