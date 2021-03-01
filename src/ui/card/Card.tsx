import { CardStyle } from "./CardStyle";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import arrowDown from "../../assets/icons/arrow_down.svg";
import { useAccordionStyle } from "./CardStyle";

interface CardProps {
  children?: React.ReactNode;
  expandable?: boolean;
  cardTitle?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Card = ({
  children,
  expandable,
  cardTitle,
  disabled,
  className,
}: CardProps) => {
  const classes = useAccordionStyle();

  return (
    <>
      {expandable ? (
        <Accordion
          className={className}
          classes={{ root: classes.root, expanded: classes.expanded }}
          disabled={disabled}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<img src={arrowDown} alt="אייקון חץ פתיחת כרטיסיה" />}
          >
            {cardTitle}
          </AccordionSummary>
          <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
      ) : (
        <CardStyle className={className}>{children}</CardStyle>
      )}
    </>
  );
};

export default Card;
