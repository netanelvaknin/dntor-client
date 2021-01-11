import { BlockUIContainer, Overlay, MessageContainer } from "./BlockUIStyle";
import { Loader } from "../../animations/index";

interface BlockUIProps {
  blocking: boolean | undefined;
  title?: string;
  children?: React.ReactNode;
}

export const BlockUI = ({ blocking, title = "", children }: BlockUIProps) => {
  if (!blocking) {
    return <></>;
  } else {
    return (
      <BlockUIContainer>
        <Overlay />
        <MessageContainer>
          <div className="block-ui-message">
            <Loader />
            {children}
          </div>
        </MessageContainer>
      </BlockUIContainer>
    );
  }
};

export default BlockUI;
