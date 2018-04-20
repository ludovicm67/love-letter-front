import { colors } from '../../../../utils';

export const gameStyle = {
  position: 'relative',
  height: '100vh',

  piocheContainer: {
    position: 'fixed',
    bottom: '240px', //space + cardHeight
    left: '20px',
  },

  selection: {
    position: 'absolute',
    left: '40%',
    top: ' 35%',
    transform: 'translate(0, -50%)',
    zIndex: 10,
  },

  eliminated: {
    position: 'absolute',
    left: '40%',
    top: ' 35%',
    transform: 'translate(0, -50%)',
    zIndex: 10,
    fontSize: '1.5em',
    color: colors.whiteColor
  },

  my_infos: {
    backgroundColor: colors.darkMainColor,
    color: colors.whiteColor,
    position: 'fixed',
    bottom: 0,
    right: 0,
    padding: '40px',
    paddingBottom: '60px',
    borderRadius: '10px 0 0 0',

    round: {
      fontSize: '1.5em',
      position: 'absolute',
      bottom: '1em',
    },
  },

  card: {
    width: '140px',
    margin: '5px',

    showHand: {
      width: '140px',
      boxShadow: `10px 10px 10px ${colors.secondColor}`,
      position: 'absolute',
      left: '40%',
      top: ' 40%',
      transform: 'translate(0, -50%)',
      zIndex: 10,
    },
    light: {
      borderRadius: '15px',
      boxShadow: `10px 10px 10px ${colors.whiteColor}`,
      cursor: 'pointer',
    },

    left: {
      position: 'relative',
      left: '-70px',
      transform: 'rotate(90deg)',
    },
    me: {
      width: '160px',
      position: 'relative',
      bottom: '-15vh',
      played : {
        position : 'absolute',
        margin: '5vh',
        bottom: '-55vh',
        width: '160px',
      },
    },
    right: {
      position: 'relative',
      left: '70px',
      transform: 'rotate(270deg)',
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
    },
    score: {},

    row: {
      position: 'absolute',
      top: '20%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      left: {
        // alignSelf: 'flex-end'
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
        text: {},
      },
      top: {
        display: 'flex',
        flexDirection: 'row',
        text: {
          position: 'absolute',
          left: '20vw',
        },
      },
    },
  },
};
