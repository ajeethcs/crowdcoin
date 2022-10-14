import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Link from "next/link";

function CampaignList(props) {
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    console.log(props.address);
  }, []);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className="card">
      <Link href={`/campaigns/${props.address}`} key={props.address}>
        <Card className="cardBody">
          <Card.Body className="card">
            <Card.Title className="cardTitle">
              {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
            </Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}

export default CampaignList;
