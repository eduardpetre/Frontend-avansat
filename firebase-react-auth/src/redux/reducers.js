const initialState = {
    phoneBattery: Math.floor(Math.random() * 101),
    watchBattery: Math.floor(Math.random() * 101),
    podsBattery: Math.floor(Math.random() * 101),
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PHONE_BATTERY':
        return { ...state, phoneBattery: action.payload };
      case 'SET_WATCH_BATTERY':
        return { ...state, watchBattery: action.payload };
      case 'SET_PODS_BATTERY':
        return { ...state, podsBattery: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;