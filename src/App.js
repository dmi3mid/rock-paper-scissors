import React, {useEffect} from 'react';

import useTelegram from './hooks/useTelegram';

import Field from './components/Field/Field';

import './App.css';

function App() {
  const {tg} = useTelegram();
  useEffect(() => {
    tg.ready();
  }, [tg]);
  return (
    <div className="App">
      <Field/>
    </div>
  );
}

export default App;
