import { BlockUIContainer, Overlay, MessageContainer } from "./BlockUIStyle";

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
            <h1>{title}</h1>
            {loader}
            {children}
          </div>
        </MessageContainer>
      </BlockUIContainer>
    );
  }
};

export default BlockUI;
