import { Card } from "./Card";

export default {
  title: "UI/Card",
};

export const SimpleCard = () => <Card>טקסט</Card>;
export const ExpandableCard = () => (
  <Card expandable cardTitle="כותרת לכרטיסיה נפתחת">
    טקסט
  </Card>
);
