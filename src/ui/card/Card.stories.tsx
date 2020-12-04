import { Card } from "./Card";
import { Box } from "@material-ui/core";
import styled from "styled-components";

const CardStyle = styled(Card)`
  max-width: 480px;
`;

export default {
  title: "UI/Cards",
};

export const Cards = () => (
  <>
    <Box mt={10} ml={10} mb={10}>
      <CardStyle>כרטיסיה רגילה</CardStyle>
    </Box>

    <Box mt={10} ml={10} mb={10}>
      <Card expandable cardTitle="כותרת לכרטיסיה נפתחת">
        כרטיסיה נפתחת
      </Card>
    </Box>
  </>
);
