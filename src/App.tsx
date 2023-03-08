import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CzechKorunaApp from './components/CzechKorunaApp';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CzechKorunaApp />
    </QueryClientProvider>
  );
}

export default App;
