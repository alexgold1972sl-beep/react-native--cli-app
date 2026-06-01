import React, {useState, useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';
import BiometricLock from './src/components/BiometricLock';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  if (isLocked) {
    return <BiometricLock onUnlock={() => setIsLocked(false)} />;
  }

  return <AppNavigator />;
}