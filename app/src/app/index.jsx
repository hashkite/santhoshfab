import { Routing } from '../routing';
import { withProviders } from './providers';
import './styles/main.scss';

const App = () => {
  return (
    <div className="page">
      <Routing />
      {/* test */}
    </div>
  );
};

export default withProviders(App);
