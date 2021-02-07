import { BlockUIContainer, Overlay, MessageContainer, Title } from "./BlockUIStyle";

interface BlockUIProps {
  blocking: boolean | undefined;
  loader?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
}

export const BlockUI = ({ blocking, title = "", children, loader }: BlockUIProps) => {
  if (!blocking) {
    return <></>;
  } else {
    return (
      <BlockUIContainer>
        <Overlay />
        <MessageContainer>
          <div className="block-ui-message">
            <Title>{title}</Title>
            {loader}
            {children}
          </div>
        </MessageContainer>
      </BlockUIContainer>
    );
  }
};

export default BlockUI;
