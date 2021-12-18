import { Helmet } from 'react-helmet';
import Search from './component/Search';

const App = () => {
  return (
    <div>
      <Helmet>
        <html lang="ko" />
        <title>REACT MOVIE APP</title>
      </Helmet>
      <Search />
    </div>
  );
};

export default App;
