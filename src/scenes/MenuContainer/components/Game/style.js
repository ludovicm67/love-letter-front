import { colors } from '../../../../utils';

export const gameStyle = {
  position: 'relative',
  height: '100vh',

  piocheContainer: {
    position: 'fixed',
    bottom: '240px', //space + cardHeight
    left: '20px',

    //laptop
    '@media (max-width: 1200px)': {
      bottom: '200px',
    },
    //tablet
    '@media (max-width: 992px)': {
      bottom: '130px',
    },
    //phone
    '@media (max-width: 768px)': {
      bottom: '50px',
      left: '10px',
    },

    text: {
      fontSize: '2em',
      position: 'relative',
      zIndex: '10',
      color: colors.whiteColor,
    },
  },

  selection: {
    position: 'absolute',
    left: '40%',
    top: ' 35%',
    transform: 'translate(0, -50%)',
    zIndex: 10,
    backgroundColor: colors.lightMainColor,
    boxShadow: `0 0 10px 10px ${colors.whiteColor}`,
    padding: '10px',

    //phone
    '@media (max-width: 768px)': {
      left: '20%',
    },

    select: {
      border: 'none',
      borderRadius: '4px',
      backgroundColor: colors.whiteColor,
      fontSize: '1em',
      marginBottom: '5px',
      height: '1.8em',
      padding: '0 5px',
    },

    button: {
      backgroundColor: colors.darkMainColor,
      border: 'none',
      fontSize: '1em',
      cursor: 'pointer',
      padding: '0.5em 1em',
      fontWeight: 700,
      marginTop: '0.3em',
    },
  },

  event: {
    position: 'absolute',
    left: '40%',
    top: ' 35%',
    maxWidth: '300px',
    transform: 'translate(0, -50%)',
    zIndex: 10,
    fontSize: '1.5em',
    color: colors.whiteColor,
    padding: '10px',
    backgroundColor: colors.secondColor,
    boxShadow: `0 0 10px 10px ${colors.secondColor}`,

    //phone
    '@media (max-width: 768px)': {
      left: '20%',
      fontSize: '1em',
      maxWidth: '200px',
    },
  },

  my_infos: {
    backgroundColor: colors.darkMainColor,
    color: colors.whiteColor,
    position: 'fixed',
    bottom: 0,
    right: 0,
    padding: '40px 40px 60px 40px',
    borderRadius: '10px 0 0 0',

    //tablet
    '@media (max-width: 992px)': {
      padding: '15px 15px 30px 15px',
      fontSize: '0.8em',
    },
    //phone
    '@media (max-width: 768px)': {
      padding: '5px',
      left: 0,
      borderRadius: 0,
    },

    round: {
      fontSize: '1.5em',
      position: 'absolute',
      bottom: '1em',

      //tablet
      '@media (max-width: 992px)': {
        fontSize: '1em',
        bottom: '10px',
      },
      //phone
      '@media (max-width: 768px)': {
        display: 'inline',
        paddingLeft: '10px',
        lineHeight: '3px',
      },
    },

    name: {
      //phone
      '@media (max-width: 768px)': {
        fontSize: '1em',
        fontWeight: '800',
        display: 'inline',
      },
    },

    score: {
      //phone
      '@media (max-width: 768px)': {
        display: 'inline',
      },
    },

    me_playing: {
      //phone
      '@media (max-width: 768px)': {
        display: 'inline',
        paddingLeft: '10px',
      },
    },

    immunity: {
      //phone
      '@media (max-width: 768px)': {
        display: 'inline',
      },
    },
  },

  played_card: {
    position: 'absolute',
    display: 'flex',
    zIndex: 0,

    cards: {
      width: '100px',
      position: 'relative',
      marginLeft: '-30px',
      //phone
      '@media (max-width: 768px)': {
        marginLeft: '-55px',
        width: '70px',
      },
    },

    me: {
      left: '40%',
      //phone
      '@media (max-width: 768px)': {
        left: '-30vw',
        bottom: '-5vh',
      },
    },
    top: {
      top: '10vh',
      transform: 'rotate(180deg)',

      //phone
      '@media (max-width: 768px)': {
        top: 0,
      },
    },
    right: {
      right: '10vw',
      bottom: '5vh',
      transform: 'rotate(270deg)',
      //phone
      '@media (max-width: 768px)': {
        right: '20vw',
      },
    },
    left: {
      left: '10vw',
      bottom: '5vh',
      transform: 'rotate(90deg)',
      //phone
      '@media (max-width: 768px)': {
        left: '20vw',
      },
    },
  },

  card: {
    width: '140px',
    margin: '5px',
    //phone
    '@media (max-width: 768px)': {
      width: '100px',
    },

    showHand: {
      width: '140px',
      backgroundColor: colors.secondColor,
      boxShadow: `0 0 5px 5px ${colors.secondColor}`,
      borderRadius: '15px',
      position: 'absolute',
      left: '40%',
      top: ' 40%',
      transform: 'translate(0, -50%)',
      zIndex: 10,

      //phone
      '@media (max-width: 768px)': {
        width: '100px',
      },
    },
    light: {
      borderRadius: '15px',
      boxShadow: `10px 10px 10px ${colors.whiteColor}`,
      cursor: 'pointer',
    },

    left: {
      position: 'relative',
      left: '10px',
      transform: 'rotate(90deg)',

      //laptop
      '@media (max-width: 1200px)': {
        left: '-70px',
      },
      //tablet
      '@media (max-width: 992px)': {
        left: '-120px',
      },
    },
    me: {
      width: '160px',
      position: 'relative',
      bottom: '-15vh',
      zIndex: 5,

      //phone
      '@media (max-width: 768px)': {
        width: '90px',
      },

      played: {
        position: 'absolute',
        margin: '5vh',
        bottom: '-55vh',
        width: '160px',
      },
    },
    right: {
      position: 'relative',
      left: '-10px',
      transform: 'rotate(270deg)',

      //laptop
      '@media (max-width: 1200px)': {
        left: '70px',
      },
      //phone
      '@media (max-width: 768px)': {
        left: '120px',
      },
    },

    top: {
      position: 'relative',
      top: '-140px',

      //laptop
      '@media (max-width: 1200px)': {
        top: '-160px',
      },
      //phone
      '@media (max-width: 768px)': {
        top: '-200px',
      },
    },

    pioche: {
      position: 'absolute',
    },
  },
  player: {
    name: {
      padding: '10px',
      fontSize: '2em',
      fontWeight: 400,

      //phone
      '@media (max-width: 768px)': {
        fontSize: '1em',
        fontWeight: '800',
        display: 'inline',
      },
    },
    score: {
      //phone
      '@media (max-width: 768px)': {
        width: '10px',
        display: 'inline',
      },

      text: {
        //phone
        '@media (max-width: 768px)': {
          display: 'none',
        },
      },
    },

    row: {
      position: 'absolute',
      top: '20%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      left: {
        text: {},
      },
      right: {
        text: {},
      },
    },
    column: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '70vh',
      width: '100%',
      alignItems: 'center',

      me: {
        display: 'flex',
        flexDirection: 'row',
        //phone
        '@media (max-width: 768px)': {
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          zIndex: 10,
        },

        text: {},
      },
      top: {
        display: 'flex',
        flexDirection: 'row',

        text: {
          position: 'absolute',
          left: '20vw',

          //laptop
          '@media (max-width: 1200px)': {
            top: '-40px',
          },
        },
      },
    },
  },
};
