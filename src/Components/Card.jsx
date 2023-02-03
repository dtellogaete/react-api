
import Card from 'react-bootstrap/Card';

const DataCard = (props) => {

    const {title, value} = props;

    return (
        <Card style={{ width: 'auto' }} className="p-3 text-center tCard">     
            <Card.Body>
                <h3>{title}</h3>
                <h4>{value} </h4>                
            </Card.Body>
        </Card>
    );
}

export default DataCard;