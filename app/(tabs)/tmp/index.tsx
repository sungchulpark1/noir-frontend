 // const [ctaMessageInd, setCtaMessageInd] = useState(0);

  // const [canProceed, setCanProceed] = useState(false);
  
  // const hintTextOpacity = useRef(new Animated.Value(1)).current;
  // const [hintText, setHintText] = useState('Loading.');

  // useEffect(() => {
  //   if (canProceed) return;

  //   const fadeHintTextOut = (onComplete: () => void) => {
  //     Animated.timing(hintTextOpacity, {
  //       toValue: 0,
  //       duration: 600,
  //       useNativeDriver: true,
  //     }).start(() => onComplete());
  //   };

  //   const fadeHintTextIn = (onComplete: () => void) => {
  //     Animated.timing(hintTextOpacity, {
  //       toValue: 1,
  //       duration: 600,
  //       useNativeDriver: true,
  //     }).start(() => onComplete());
  //   };

    // fadeTextIn();

    // const interval = setInterval(() => {
    //   fadeTextOut(() => {
    //     const next = (ctaMessageInd + 1) % ctaMessages.length;
    //     setCtaMessageInd(next);
    //     fadeTextIn();

    //     if (next === 2) {
    //       fadeHintTextOut(() => {
    //         setHintText('Tap To Continue');
    //         fadeHintTextIn(() => {
    //           setCanProceed(true);
    //         });
    //       });
    //     }
    //   });
    // }, 2000);

    //  const loadingInterval = setInterval(() => {
    //   if (canProceed) return;

    //   setHintText(prev => {
    //     if (prev === 'Tap To Continue') return prev;
        
    //     const dots = '.'.repeat((prev.match(/\./g) || []).length % 3 + 1);
    //     return 'Loading' + dots;
    //   });
    // }, 800);

    // return () => { 
      // clearInterval(interval);
  //     clearInterval(loadingInterval);
  //   };
  // }, [ctaMessageInd, textOpacity, hintTextOpacity, canProceed, setCanProceed]);