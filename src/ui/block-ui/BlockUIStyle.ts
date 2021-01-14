import styled from 'styled-components/macro';

export const BlockUIContainer = styled.div`
  position: fixed;
  z-index: 1010;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  min-height: 2em;
  cursor: wait;
  overflow: hidden;

  &:focus {
    outline: none;
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  opacity: 1;
  filter: alpha(opacity=50);
  background-color: rgb(255, 255, 255);
`;

export const MessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  text-align: center;
  transform: translateY(-50%);
  z-index: 10001;
`;