import { Styles } from 'material-ui';
const { Colors } = Styles;

export default {
    getPalette: function() {
        return {
            primary1Color: '#ec6518',
            primary2Color: Colors.orange700,
            primary3Color: Colors.orange100,
            accent1Color: Colors.blueGrey700,
            accent2Color: Colors.blueGrey700,
            accent3Color: Colors.blueGrey700,
            textColor: Colors.darkBlack,
            canvasColor: Colors.white,
            borderColor: Colors.grey300
            //disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
        };
    }
};
