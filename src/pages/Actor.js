import ActorDetail from '../components/ActorDetail';
import { useParams } from 'react-router-dom';

function Actor() {
    const { id } = useParams();
    return (
        <div id='page-content'>
            <ActorDetail id={id} />
        </div>
    );
}

export default Actor;
