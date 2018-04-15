import { colors } from '../../../../utils';

export const gameStyle = {
  piocheContainer: {
    position: 'fixed',
    bottom: '240px', //space + cardHeight
    left: '20px',
  },

  my_infos: {
    backgroundColor: colors.darkMainColor,
    color: colors.whiteColor,
    position: 'fixed',
    bottom: 0,
    right: 0,
    padding: '40px',
    borderRadius: '10px 0 0 0',
  },

  card: {
    width: '140px',
    margin: '5px',

    left: {
      position: 'relative',
      left: '-70px',
      transform: 'rotate(90deg)',
    },
    me: {
      width: '160px',
      position: 'relative',
      bottom: '-15vh',
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
